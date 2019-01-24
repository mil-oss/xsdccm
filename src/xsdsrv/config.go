package main

import (
	"encoding/json"
	"io/ioutil"
)

// Cfg ...
type Cfg struct {
	Project         string     `json:"project,omitempty"`
	Title           string     `json:"title,omitempty"`
	Host            string     `json:"host,omitempty"`
	RemoteHost      string     `json:"remotehost,omitempty"`
	Port            string     `json:"port,omitempty"`
	Configfile      string     `json:"configfile,omitempty"`
	ConfigURL       string     `json:"configurl,omitempty"`
	Reflink         string     `json:"reflink,omitempty"`
	Testlink        string     `json:"testlink,omitempty"`
	Dbloc           string     `json:"dbloc,omitempty"`
	Tempdir         string     `json:"tempdir,omitempty"`
	Temppath        string     `json:"temppath,omitempty"`
	Resources       []Resource `json:"resources,omitempty"`
	Directories     []Resource `json:"directories,omitempty"`
	Projects        []Cfg      `json:"projects,omitempty"`
	Implementations []Resource `json:"implementations,omitempty"`
}

// ConfigList ...
type ConfigList []Cfg

// Resource ...
type Resource struct {
	Name        string `json:"name,omitempty"`
	FileName    string `json:"filename,omitempty"`
	Src         string `json:"src,omitempty"`
	SrcURL      string `json:"srcurl,omitempty"`
	Path        string `json:"path,omitempty"`
	Description string `json:"description,omitempty"`
}

//ReadConfig ...
func ReadConfig(cfgpath string) Cfg {
	jf, err := ioutil.ReadFile(cfgpath)
	if err != nil {
		panic(err)
	}
	var c Cfg
	jerr := json.Unmarshal([]byte(jf), &c)
	check(jerr)
	return c
}
