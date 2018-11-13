package main

import (
	"io/ioutil"
	"log"
	"strings"
)

var (
	// Cfgs ...
	Cfgs      map[string]Cfg
	cfg       Cfg
	cfgpath   = "config/xsdccm.json"
	xsdstruct interface{}
	temppath  string
	// Rsrcs ...
	Rsrcs = map[string]string{}
)

func main() {
	readCfgs()
	xsdweb()
}

func readCfgs() {
	Cfgs = map[string]Cfg{}
	cfg := ReadConfig(cfgpath)
	temppath := mkTempDir(cfg.Tempdir) + "/"
	log.Println("Pull Config from " + cfg.Project)
	wgetRsrc(temppath+cfg.Configfile, cfg.ConfigURL)
	xc := ReadConfig(temppath + cfg.Configfile)
	Cfgs[xc.Project] = xc
	for i := range xc.Implementations {
		var imp = xc.Implementations[i]
		log.Println("Pull Config from " + imp.Name)
		log.Println("URL " + imp.SrcURL)
		wgetRsrc(temppath+imp.Path, imp.SrcURL)
		xi := ReadConfig(temppath + imp.Path)
		Cfgs[xi.Project] = xi
	}
	loadResources(temppath)
}

func loadResources(temppath string) {
	for _, cfg := range Cfgs {
		for _, r := range cfg.Resources {
			if strings.HasSuffix(r.FileName, ".xsd") {
				wgetRsrc(temppath+r.Path, cfg.Host+"file/"+r.Name)
				Rsrcs[r.Name] = temppath + r.Path
			}
			if strings.HasSuffix(r.FileName, ".xml") {
				wgetRsrc(temppath+r.Path, cfg.Host+"file/"+r.Name)
				Rsrcs[r.Name] = temppath + r.Path
			}
			if strings.HasSuffix(r.FileName, ".json") {
				wgetRsrc(temppath+r.Path, cfg.Host+"file/"+r.Name)
				Rsrcs[r.Name] = temppath + r.Path
			}
		}
	}
}

func mkTempDir(dname string) string {
	tempDirPath, err := ioutil.TempDir("", dname)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Temp dir created:", tempDirPath)
	return tempDirPath
}
