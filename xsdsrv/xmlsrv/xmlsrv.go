package xmlsrv

import (
	"encoding/xml"
	"io/ioutil"
	"log"
	"os"
	"os/exec"

	libxml2 "github.com/lestrrat/go-libxml2"
	"github.com/lestrrat/go-libxml2/xsd"
)

// ReadStructXML ...
func ReadStructXML(filepath string, xsdstruct interface{}) (interface{}, error) {
	xf, err := ioutil.ReadFile(filepath)
	var strct = xsdstruct
	err = xml.Unmarshal([]byte(xf), &strct)
	return strct, err
}

// WriteStructXML ...
func WriteStructXML(filepath string, xsdstruct interface{}) (string, error) {
	f, err := os.Create(filepath)
	defer f.Close()
	var strct = xsdstruct
	output, err := xml.MarshalIndent(strct, "  ", "    ")
	var xmlresult = []byte(xml.Header + string(output))
	err = ioutil.WriteFile(filepath, xmlresult, 0666)
	return filepath, err
}

// ValidFunc ...
type ValidFunc func(valid bool, err []error)

// ValidateXML ... validate XML against XSD
func ValidateXML(xmlstr string, xsdpath string, valfn ValidFunc) error {
	log.Println("ValidateXML - " + xsdpath)
	xsddoc, err := xsd.ParseFromFile(xsdpath)
	defer xsddoc.Free()
	//ioutil.ReadFile(validationdata.XMLPath)
	doc, err := libxml2.ParseString(xmlstr)
	if err := xsddoc.Validate(doc); err != nil {
		log.Println("Not Valid")
		valfn(false, err.(xsd.SchemaValidationError).Errors())
		return err
	}
	log.Println("Valid")
	valfn(true, nil)
	return err
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
	return resultstring, err
}

func xmlOut(path string, data []byte) (string, error) {
	err := ioutil.WriteFile(path, data, 0644)
	if err != nil {
		return err.Error(), err
	}
	return path, err
}
