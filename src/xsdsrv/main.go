package main

import (
	"log"
)

var (
	// Cfgs ...
	Cfgs      map[string]Cfg
	cfg       Cfg
	cfgpath   = "config/xsdccm.json"
	xsdstruct interface{}
	resources map[string]string
)

func main() {
	readCfgs()
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
	}
}
