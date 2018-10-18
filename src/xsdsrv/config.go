package main

import (
	"encoding/json"
	"io/ioutil"
)

//Confg ...
type Confg struct {
	Project  string `json:"root,omitempty"`
	Title    string `json:"root,omitempty"`
	Host     string `json:"host,omitempty"`
	Port     string `json:"port,omitempty"`
	Services []Svce `json:"applications,omitempty"`
}

//Svce ...
type Svce struct {
	Name string `json:"name,omitempty"`
	URL  string `json:"url,omitempty"`
}

func getConfig() Confg {
	jf, err := ioutil.ReadFile("config/xsdccm.json")
	if err != nil {
		panic(err)
	}
	var c Confg
	jerr := json.Unmarshal([]byte(jf), &c)
	check(jerr)
	return c
}
