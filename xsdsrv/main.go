package main

import (
	"log"
	"xmlsrv"
)

var (
	cfgpath  = "config/xsdccm.json"
	cfgs     map[string]xmlsrv.Cfg
	project  string
	temppath string
)

func main() {
	project, cfgs, err := xmlsrv.InitData(cfgpath)
	if err != nil {
		log.Println(err)
	} else {
		log.Println("project. .. ", cfgs[project].Project)
		log.Println("temppath. .. ", cfgs[project].Temppath)
		log.Println("cfggurl. .. ", cfgs[project].ConfigURL)
		xmlsrv.StartWeb(cfgs[project].Port)
	}
	//xmlsrv.StartWeb(cfgpath)
}
