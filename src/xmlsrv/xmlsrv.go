package xmlsrv

import (
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"time"

	libxml2 "github.com/lestrrat/go-libxml2"
	"github.com/lestrrat/go-libxml2/xsd"
)

// ReadStructXML ...
func ReadStructXML(filepath string, xsdstruct interface{}) interface{} {
	xf, ferr := ioutil.ReadFile(filepath)
	check(ferr)
	var strct = xsdstruct
	err := xml.Unmarshal([]byte(xf), &strct)
	check(err)
	return strct
}

// WriteStructXML ...
func WriteStructXML(filepath string, xsdstruct interface{}) string {
	f, err := os.Create(filepath)
	check(err)
	defer f.Close()
	var strct = xsdstruct
	output, err := xml.MarshalIndent(strct, "  ", "    ")
	check(err)
	var xmlrslt = []byte(xml.Header + string(output))
	ferr := ioutil.WriteFile(filepath, xmlrslt, 0666)
	check(ferr)
	return filepath
}

// ValidFunc ...
type ValidFunc func(valid bool, err []error)

// ValidateXML ... validate XML against XSD
func ValidateXML(xmlstr string, xsdstr string, fn ValidFunc) (bool, []error) {
	log.Println("ValidateXML")
	var xsddoc, derr = xsd.Parse([]byte(xsdstr))
	check(derr)
	doc, err := libxml2.ParseString(xmlstr)
	check(err)
	if err := xsddoc.Validate(doc); err != nil {
		log.Println("Not Valid")
		fn(false, err.(xsd.SchemaValidationError).Errors())
		return false, err.(xsd.SchemaValidationError).Errors()
	}
	log.Println("Valid")
	fn(true, nil)
	return true, nil
}

// TransformXML ... generate a resource using XSLT
func TransformXML(xmlstr string, xslstr string) ([]byte, error) {
	log.Println("transformXML")
	cmd := exec.Cmd{
		Args: []string{"xsltproc", xslstr, xmlstr},
		Env:  os.Environ(),
		Path: "/usr/bin/xsltproc",
	}
	resultstring, err := cmd.Output()
	return resultstring, err
}

// DoTransform ...
func DoTransform(xslpath string, xmlpath string) ([]byte, error) {
	//log.Println("xslpath: " + xslpath)
	//log.Println("xmlpath: " + xmlpath)
	cmd := exec.Cmd{
		Args: []string{"xsltproc", xslpath, xmlpath},
		Env:  os.Environ(),
		Path: "/usr/bin/xsltproc",
	}
	resultstring, err := cmd.Output()
	check(err)
	return resultstring, err
}

// DoTransformParam ...
func DoTransformParam(xslpath string, xmlpath string, testdata string) ([]byte, error) {
	//log.Println("xslpath: " + xslpath)
	//log.Println("xmlpath: " + xmlpath)
	cmd := exec.Cmd{
		Args: []string{"xsltproc", xslpath, xmlpath, "--stringparam", "TestData", testdata},
		Env:  os.Environ(),
		Path: "/usr/bin/xsltproc",
	}
	resultstring, err := cmd.Output()
	check(err)
	return resultstring, err
}

func xmlOut(path string, data []byte) string {
	err := ioutil.WriteFile(path, data, 0644)
	if err != nil {
		return err.Error()
	}
	return path
}
func setHeader(w http.ResponseWriter) {
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.Header().Set("Expires", time.Unix(0, 0).Format(time.RFC1123))
	w.Header().Set("Cache-Control", "no-cache, private, max-age=0")
	w.Header().Set("Pragma", "no-cache")
	w.Header().Set("X-Accel-Expires", "0")
}

func check(e error) error {
	if e != nil {
		fmt.Printf("error: %v\n", e)
	}
	return e
}

func checka(e []error) []error {
	if e != nil {
		fmt.Printf("error: %v\n", e)
	}
	return e
}
