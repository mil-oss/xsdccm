package main

import (
	"io"
	"io/ioutil"
	"log"
	"os"
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
	Rsrcs  = map[string]string{}
	loadon bool
)

func main() {
	loadon = false
	readCfgs()
	xsdweb()
}

func readCfgs() {
	Cfgs = map[string]Cfg{}
	cfg := ReadConfig(cfgpath)
	//temppath := mkTempDir(cfg.Tempdir) + "/"/
	temppath := cfg.Tempdir + "/"
	CopyFile(cfgpath, temppath+cfgpath)
	Cfgs[cfg.Project] = cfg
	for i := range cfg.Projects {
		var proj = cfg.Projects[i]
		wgetRsrc(temppath+proj.Configfile, proj.ConfigURL)
		projcfg := ReadConfig(temppath + proj.Configfile)
		Cfgs[projcfg.Project] = projcfg
		loadResources(projcfg)
		readProjectCfgs(projcfg, temppath)
	}
}

func readProjectCfgs(pcfg Cfg, path string) {
	//wgetRsrc(projtemppath+pcfg.Configfile, pcfg.ConfigURL)
	//xc := ReadConfig(projtemppath + pcfg.Configfile)
	//Cfgs[xc.Project] = xc
	for i := range pcfg.Implementations {
		var imp = pcfg.Implementations[i]
		log.Println("Pull Config from " + imp.Name)
		log.Println("URL " + imp.SrcURL)
		wgetRsrc(path+imp.Src, imp.SrcURL)
		xi := ReadConfig(path + imp.Src)
		Cfgs[imp.Name] = xi
		loadResources(xi)
	}
	//loadResources(projtemppath)
}

func loadResources(c Cfg) {
	for _, r := range c.Resources {
		if strings.HasSuffix(r.FileName, ".xsd") {
			wgetRsrc(c.Temppath+r.Path, c.Host+"file/"+r.Name)
			Rsrcs[c.Project+r.Name] = c.Temppath + r.Path
		}
		if strings.HasSuffix(r.FileName, ".xml") {
			wgetRsrc(c.Temppath+r.Path, c.Host+"file/"+r.Name)
			Rsrcs[c.Project+r.Name] = c.Temppath + r.Path
		}
		if strings.HasSuffix(r.FileName, ".json") {
			wgetRsrc(c.Temppath+r.Path, c.Host+"file/"+r.Name)
			Rsrcs[c.Project+r.Name] = c.Temppath + r.Path
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

// CopyFile  ...
func CopyFile(source string, dest string) (err error) {
	sourcefile, err := os.Open(source)
	if err != nil {
		return err
	}

	defer sourcefile.Close()

	destfile, err := os.Create(dest)
	if err != nil {
		return err
	}

	defer destfile.Close()

	_, err = io.Copy(destfile, sourcefile)
	if err == nil {
		sourceinfo, err := os.Stat(source)
		if err != nil {
			err = os.Chmod(dest, sourceinfo.Mode())
		}

	}

	return
}
