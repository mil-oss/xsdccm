package main

import (
	"archive/zip"
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"sync/atomic"
	"time"
	"xmlsrv"

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
	requestID  string
	listenAddr string
	healthy    int32
	router     = gin.New()
	valCache   = map[string]bool{}
)

func xsdweb() {
	crs := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		Debug:          true,
	})
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(static.Serve("/", static.LocalFile("public/xsdccm", true)))
	router.Use(static.Serve("/xsdccm", static.LocalFile("public/xsdccm", true)))
	router.Use(static.Serve("/xsdccm/home", static.LocalFile("public/xsdccm", true)))
	router.Use(static.Serve("/xsdccm/xsd", static.LocalFile("public/xsdccm", true)))
	router.Use(static.Serve("/xsdccm/doc", static.LocalFile("public/xsdccm", true)))
	router.Use(static.Serve("/xsdccm/xmldata", static.LocalFile("public/xsdccm", true)))
	router.Use(static.Serve("/xsdccm/provrpt", static.LocalFile("public/xsdccm", true)))
	router.LoadHTMLGlob("public/xsdccm/*.html")
	router.POST("/validate", func(context *gin.Context) {
		validate(context)
	})
	logger := log.New(os.Stdout, "http: ", log.LstdFlags)
	router.NoRoute(func(c *gin.Context) {
		c.Request.URL.Path = "/xsdccm"
		router.HandleContext(c)
	})
	flag.StringVar(&listenAddr, "listen-addr", Cfgs["spdx-xml"].Port, "server listen address")
	flag.Parse()
	logger.Println("Starting HTTP Server. .. ")
	nextRequestID := func() string {
		return fmt.Sprintf("%d", time.Now().UnixNano())
	}
	server := &http.Server{
		Addr:         listenAddr,
		Handler:      tracing(nextRequestID)(logging(logger)(crs.Handler(router))),
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

//Index ...
func Index(c *gin.Context) {
	c.Request.URL.Path = "/xsdccm"
	router.HandleContext(c)
	//c.HTML(200, "index.html", gin.H{})
}
func validate(c *gin.Context) {
	var valdata ValidationData
	err := c.BindJSON(&valdata)
	if err != nil {
		HandleError(c, 500, "Internal Server Error", "Error reading data from body", err)
		return
	}
	log.Println("Validate " + valdata.XMLName + " with " + valdata.XSDName)
	if valCache[valdata.Package+valdata.XSDName] {
		log.Println("Validation Successful")
		valCache = map[string]bool{}
		HandleSuccess(c, Success{Status: true})
	} else {
		log.Println("Cfgs[valdata.Package].Host: ", Cfgs[valdata.Package].Host)
		//xsdstr, err := wgetRsrc("",Cfgs[valdata.Package].Host + "file/" + valdata.XSDName)
		check(err)
		valfunc := func(v bool, ve string) {
			if v {
				log.Println("Validation Successful")
				valCache[valdata.Package+valdata.XSDName] = true
				HandleSuccess(c, Success{Status: true})
			} else {
				HandleValidationErrors(c, "Validation Errors", ve)
			}
		}
		xmlsrv.ValidateXML(valdata.XMLString, Rsrcs[valdata.XSDName], valfunc)
	}
}
func docVerify(c *gin.Context) {
	var verifydata VerifyData
	err := c.BindJSON(&verifydata)
	if err != nil {
		HandleError(c, 500, "Internal Server Error", "Error reading data from body", err)
		return
	}
	verified := verify(verifydata.ID, verifydata.Digest)
	if verified {
		HandleSuccess(c, Success{Status: true})
	} else {
		HandleError(c, 500, "Verification Error", "Verification Error", err)
		return
	}
}
func transform(c *gin.Context) {
	var transdata TransformData
	err := c.BindJSON(&transdata)
	if err != nil {
		HandleError(c, 500, "Internal Server Error", "Error reading data from body", err)
	} else {
		rslt, err := xmlsrv.TransformXML(transdata.XMLString, transdata.XSLString)
		if err != nil {
			HandleError(c, 500, "Internal Server Error", "Transformation error", err)
			return
		}
		HandleSuccess(c, Success{Status: true, Content: fmt.Sprint(rslt)})
	}

}
func verify(docid string, digest string) bool {
	//resdigests = getDigests(resources, temppath, "Sha256")
	//log.Println("Verify")
	log.Println("verifydata.ID " + docid)
	log.Println("verifydata.Digest " + digest)
	/* log.Println("src.Digest " + resdigests[verifydata.ID])
	if resdigests[verifydata.ID] == verifydata.Digest {
		log.Println("Verification Successful")
		return true
	} */
	return false
}
func redirct(c *gin.Context) {
	c.Redirect(307, "/")
}
func getPath(fname string) string {
	var p = Rsrcs[fname]
	if p == "" {
		for _, r := range Rsrcs {
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
func wgetRsrc(fpath string, urlstr string) error {
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

//HandleSuccess ... handle success response
func HandleSuccess(c *gin.Context, result interface{}) {
	marshalled, err := json.Marshal(result)
	if err != nil {
		HandleError(c, 500, "Internal Server Error", "Error marshalling response JSON", err)
		return
	}
	c.String(http.StatusOK, string(marshalled))
	return
}

//HandleError ... handle error response
func HandleError(c *gin.Context, code int, responseText string, logMessage string, err error) {
	errorMessage := ""
	if err != nil {
		errorMessage = err.Error()
		return
	}
	log.Println(logMessage, errorMessage)
	c.String(code, responseText)
}

//HandleValidationErrors ... handle error response
func HandleValidationErrors(c *gin.Context, logMessage string, errors string) {
	c.String(http.StatusOK, errors)
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
