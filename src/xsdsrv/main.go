package main

import (
	"archive/zip"
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"sync/atomic"
	"time"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/rs/cors"
)

type key int

const (
	requestIDKey key = 0
)

var (
	// Cfgs ...
	Cfgs       map[string]Cfg
	cfg        Cfg
	cfgpath    = "config/xsdccm.json"
	requestID  string
	listenAddr string
	healthy    int32
	xsdstruct  interface{}
	resources  map[string]string
)

func main() {
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
	})
	readCfgs()
	//resources = getreslist()
	router := gin.New()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(static.Serve("/", static.LocalFile("public/xsdccm", true)))
	router.LoadHTMLGlob("public/xsdccm/*.html")
	ng := router.Group("/", Index)
	{
		ng.GET("/")
	}
	flag.StringVar(&listenAddr, "listen-addr", Cfgs["spdx"].Port, "server listen address")
	flag.Parse()
	logger := log.New(os.Stdout, "http: ", log.LstdFlags)
	logger.Println("Starting HTTP Server. .. ")
	nextRequestID := func() string {
		return fmt.Sprintf("%d", time.Now().UnixNano())
	}
	server := &http.Server{
		Addr:         listenAddr,
		Handler:      tracing(nextRequestID)(logging(logger)(c.Handler(router))),
		ErrorLog:     logger,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  15 * time.Second,
	}
	done := make(chan bool)
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	go func() {
		<-quit
		logger.Println("Server is shutting down...")
		atomic.StoreInt32(&healthy, 0)

		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		server.SetKeepAlivesEnabled(false)
		if err := server.Shutdown(ctx); err != nil {
			logger.Fatalf("Could not gracefully shutdown the server: %v\n", err)
		}
		close(done)
	}()
	logger.Println("Server is ready to handle requests at", listenAddr)
	atomic.StoreInt32(&healthy, 1)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		logger.Fatalf("Could not listen on %s: %v\n", listenAddr, err)
	}
	<-done
	logger.Println("Server stopped")
}

func readCfgs() {
	Cfgs = map[string]Cfg{}
	c := ReadConfig(cfgpath)
	log.Println("Pull Config from " + c.Project)
	wgetCfg(c.Configfile, c.ConfigURL)
	xc := ReadConfig(c.Configfile)
	Cfgs[xc.Project] = xc
	for i := range xc.Implementations {
		var imp = xc.Implementations[i]
		log.Println("Pull Config from " + imp.Name)
		log.Println("URL " + imp.SrcURL)
		wgetCfg(imp.Path, imp.SrcURL)
		xi := ReadConfig(imp.Path)
		Cfgs[xi.Project] = xi
	}
}

//Index ...
func Index(c *gin.Context) {
	c.HTML(200, "index.html", gin.H{})
}
func redirct(c *gin.Context) {
	c.Redirect(307, "/")
}
func getreslist() map[string]string {
	res, err := ioutil.ReadFile("public/iepd/json/resources.json")
	check(err)
	var r = map[string]string{}
	merr := json.Unmarshal(res, &r)
	check(merr)
	return r
}
func getPath(fname string) string {
	var p = resources[fname]
	if p == "" {
		for _, r := range resources {
			if filepath.Base(r) == fname {
				return r
			}
		}
	}
	return p
}
func setHeader(w http.ResponseWriter) {
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("X-Request-Id", requestID)
	w.Header().Set("Expires", time.Unix(0, 0).Format(time.RFC1123))
	w.Header().Set("Cache-Control", "no-cache, private, max-age=0")
	w.Header().Set("Pragma", "no-cache")
	w.Header().Set("X-Accel-Expires", "0")
}
func logging(logger *log.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				requestID, ok := r.Context().Value(requestIDKey).(string)
				if !ok {
					requestID = "unknown"
				}
				logger.Println(requestID, r.Method, r.URL.Path, r.RemoteAddr, r.UserAgent())
			}()
			next.ServeHTTP(w, r)
		})
	}
}
func tracing(nextRequestID func() string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			requestID := r.Header.Get("X-Request-Id")
			if requestID == "" {
				requestID = nextRequestID()
			}
			ctx := context.WithValue(r.Context(), requestIDKey, requestID)
			//w.Header().Set("X-Request-Id", requestID)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
func wgetCfg(fpath string, urlstr string) error {
	log.Println("Wget " + urlstr + " Save To: " + fpath)
	// Create output dir
	p := filepath.Dir(fpath)
	os.MkdirAll(p, os.ModePerm)
	newFile, err := os.Create(fpath)
	if err != nil {
		log.Fatal(err)
	}
	defer newFile.Close()
	// HTTP GET
	response, err := http.Get(urlstr)
	if err != nil {
		log.Fatal(err)
	}
	defer response.Body.Close()
	numBytesWritten, err := io.Copy(newFile, response.Body)
	if err != nil {
		log.Fatal(err)
	}
	log.Printf("Downloaded %d byte file.\n", numBytesWritten)
	return err
}
func unzip(src string, dest string) ([]string, error) {
	var filenames []string
	r, err := zip.OpenReader(src)
	if err != nil {
		return filenames, err
	}
	defer r.Close()
	for _, f := range r.File {
		rc, err := f.Open()
		if err != nil {
			return filenames, err
		}
		defer rc.Close()
		// Store filename/path for returning and using later on
		fpath := filepath.Join(dest, f.Name)
		filenames = append(filenames, fpath)
		if f.FileInfo().IsDir() {
			// Make Folder
			os.MkdirAll(fpath, os.ModePerm)
		} else {
			// Make File
			if err = os.MkdirAll(filepath.Dir(fpath), os.ModePerm); err != nil {
				return filenames, err
			}
			outFile, err := os.OpenFile(fpath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, f.Mode())
			if err != nil {
				return filenames, err
			}
			_, err = io.Copy(outFile, rc)

			// Close the file without defer to close before next iteration of loop
			outFile.Close()
			if err != nil {
				return filenames, err
			}
		}
	}
	return filenames, nil
}
func check(e error) error {
	if e != nil {
		fmt.Printf("error: %v\n", e)
	}
	return e
}
