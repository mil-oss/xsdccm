package xsdprov

import (
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"sync/atomic"
	"time"
)

type key int

const (
	requestIDKey key = 0
)

var (
	listenAddr string
	healthy    int32
	xsdstruct  interface{}
)

//StartWeb .. simple web server
func StartWeb(path string, tmppath string) {
	temppath = tmppath
	flag.StringVar(&listenAddr, "listen-addr", ":8080", "server listen address")
	flag.Parse()
	logger := log.New(os.Stdout, "http: ", log.LstdFlags)
	logger.Println("Starting HTTP Server. .. " + path)
	router := http.NewServeMux()
	router.Handle("/", index())
	router.Handle("/update", update(path))
	router.Handle("/dload", dload())
	router.Handle("/validate", validate())
	router.Handle("/transform", transform())
	router.Handle("/verify", verify())
	router.Handle("/xmldoc", getXML())
	router.Handle("/jsondoc", getJSON())
	router.Handle("/textdoc", getText())
	fs := http.FileServer(http.Dir(temppath))
	http.Handle("/directory", http.StripPrefix("/", fs))
	nextRequestID := func() string {
		return fmt.Sprintf("%d", time.Now().UnixNano())
	}
	server := &http.Server{
		Addr:         listenAddr,
		Handler:      tracing(nextRequestID)(logging(logger)(router)),
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
func index() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
			return
		}
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "SEvA 1.0")
		fmt.Fprintln(w, temppath)
	})
}

func update(path string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if atomic.LoadInt32(&healthy) == 1 {
			prov := BuildIep()
			pr, err := json.Marshal(prov)
			check(err)
			w.WriteHeader(http.StatusOK)
			fmt.Fprintln(w, string(pr))
		}
		w.WriteHeader(http.StatusServiceUnavailable)
	})
}
func getXML() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if atomic.LoadInt32(&healthy) == 1 {
			log.Println("getXML")
		}
		w.WriteHeader(http.StatusServiceUnavailable)
	})
}
func getJSON() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if atomic.LoadInt32(&healthy) == 1 {
			log.Println("getJSON")
		}
		w.WriteHeader(http.StatusServiceUnavailable)
	})
}
func getText() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if atomic.LoadInt32(&healthy) == 1 {
			log.Println("getText")
		}
		w.WriteHeader(http.StatusServiceUnavailable)
	})
}
func verify() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if atomic.LoadInt32(&healthy) == 1 {
			Verify(w, r)
		}
		w.WriteHeader(http.StatusServiceUnavailable)
	})
}
func validate() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if atomic.LoadInt32(&healthy) == 1 {
			ValidateXML(w, r)
		}
		w.WriteHeader(http.StatusServiceUnavailable)
	})
}
func transform() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if atomic.LoadInt32(&healthy) == 1 {
			TransformXML(w, r)
		}
		w.WriteHeader(http.StatusServiceUnavailable)
	})
}
func dload() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if atomic.LoadInt32(&healthy) == 1 {
			DownloadFile(temppath+"/SevA.zip", w)
			w.WriteHeader(http.StatusOK)
			index()
		}
		w.WriteHeader(http.StatusServiceUnavailable)
	})
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
			w.Header().Set("X-Request-Id", requestID)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

//HandleSuccess ... handle success response
func HandleSuccess(w *http.ResponseWriter, result interface{}) {
	writer := *w
	marshalled, err := json.Marshal(result)
	if err != nil {
		HandleError(w, 500, "Internal Server Error", "Error marshalling response JSON", err)
		return
	}
	//log.Println(fmt.Sprintf("%s", marshalled))
	//writer.Header().Add("Content-Type", "application/json")
	//writer.WriteHeader(200)
	writer.Write(marshalled)
}

//HandleError ... handle error response
func HandleError(w *http.ResponseWriter, code int, responseText string, logMessage string, err error) {
	errorMessage := ""
	writer := *w
	if err != nil {
		errorMessage = err.Error()
	}
	log.Println(logMessage, errorMessage)
	writer.WriteHeader(code)
	writer.Write([]byte(responseText))
}

//HandleValidationErrors ... handle error response
func HandleValidationErrors(w *http.ResponseWriter, logMessage string, errors []error) {
	errs := []ValErr{}
	for _, errorMessage := range errors {
		errs = append(errs, ValErr{Message: errorMessage.Error()})
	}
	allerrs, err := json.Marshal(errs)
	if err != nil {
		panic(err)
	}
	writer := *w
	writer.Write([]byte(allerrs))
}
