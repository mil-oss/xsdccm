package main

import (
	"log"
	"io/ioutil"
)

var (
	// Cfgs ...
	Cfgs      map[string]Cfg
	cfg       Cfg
	cfgpath   = "config/xsdccm.json"
	xsdstruct interface{}
	resources map[string]string
	temppath string
)

func main() {
	readCfgs()
	xsdweb()
}

func readCfgs() {
	Cfgs = map[string]Cfg{}
	cfg := ReadConfig(cfgpath)
	temppath := mkTempDir(cfg.Tempdir)
	log.Println("Pull Config from " + cfg.Project)
	wgetCfg(temppath+cfg.Configfile, cfg.ConfigURL)
	xc := ReadConfig(temppath+cfg.Configfile)
	Cfgs[xc.Project] = xc
	for i := range xc.Implementations {
		var imp = xc.Implementations[i]
		log.Println("Pull Config from " + imp.Name)
		log.Println("URL " + imp.SrcURL)
		wgetCfg(temppath+imp.Path, imp.SrcURL)
		xi := ReadConfig(temppath+imp.Path)
		Cfgs[xi.Project] = xi
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