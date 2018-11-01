package main

import (
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

var (
	// Cfgs ...
	Cfgs      map[string]Cfg
	cfg       Cfg
	cfgpath   = "config/xsdccm.json"
	xsdstruct interface{}
	resources = map[string]string{}
)

func main() {
	readCfgs()
	loadXsds()
	xsdweb()
}

func readCfgs() {
	Cfgs = map[string]Cfg{}
	cfg := ReadConfig(cfgpath)
	log.Println("Pull Config from " + cfg.Project)
	wgetCfg(cfg.Configfile, cfg.ConfigURL)
	xc := ReadConfig(cfg.Configfile)
	Cfgs[xc.Project] = xc
	for i := range xc.Implementations {
		var imp = xc.Implementations[i]
		log.Println("Pull Config from " + imp.Name)
		log.Println("URL " + imp.SrcURL)
		wgetCfg(imp.Path, imp.SrcURL)
		xi := ReadConfig(imp.Path)
		Cfgs[xi.Project] = xi
		for r := range xi.Resources {
			resources[xc.Project+xi.Resources[r].Name] = xi.Resources[r].Path
		}
	}
}

func loadXsds() {
	for c := range Cfgs {
		var rs = Cfgs[c].Resources
		for r := range rs {
			if strings.HasSuffix(rs[r].FileName, ".xsd") {
				WgetFile(rs[r].Path, Cfgs[c].Host+"file/"+rs[r].Name)
			}
		}
	}
}

// WgetFile ...
func WgetFile(fpath string, urlstr string) error {
	log.Println("Wget Save To: " + fpath)
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
