package main

import (
	"xsdprov"
)

func main() {
	xsdprov.Setup("sevaism", "", Resources, Resdirectories, NewSoftwareEvidenceArchive())
}

// Resources ...
var Resources = map[string]string{
	"ref.xsd":                  "iepd/xml/xsd/ref.xsd",
	"iep.xsd":                  "iepd/xml/xsd/iep.xsd",
	"XMLSchema.xsd":            "iepd/xml/xsd/w3c/XMLSchema.xsd",
	"xslt.xsd":                 "iepd/xml/xsd/w3c/xslt.xsd",
	"iep_xsd.xsl":              "iepd/xml/xsl/iep_xsd.xsl",
	"xml_instance.xsl":         "iepd/xml/xsl/xml_instance.xsl",
	"xsd_json.xsl":             "iepd/xml/xsl/xsd_json.xsl",
	"xml_json.xsl":             "iepd/xml/xsl/xml_json.xsl",
	"go-gen.xsl":               "iepd/xml/xsl/go-gen.xsl",
	"go-test-gen.xsl":          "iepd/xml/xsl/go-test-gen.xsl",
	"test_data.xml":            "iepd/xml/instance/test_data.xml",
	"test_instance.xml":        "iepd/xml/instance/test_instance.xml",
	"test_instance-golang.xml": "iepd/xml/instance/test_instance-golang.xml",
	"iep_xsd.json":             "iepd/json/iep_xsd.json",
	"ref_xsd.json":             "iepd/json/ref_xsd.json",
	"test_instance.json":       "iepd/json/test_instance.json",
	"xsd-struct.go":            "iepd/src/sevaism/xsd-struct.go",
	"xsd-test.go":              "iepd/src/sevaism/xsd-test.go",
	"xsd.go":                   "iepd/src/sevaism/xsd.go",
	"provenance_report.json":   "iepd/tests/provenance_report.json",
	"resources.json":           "iepd/json/resources.json",
}

// Resdirectories ...
var Resdirectories = map[string]string{
	"ic-ism":   "iepd/xml/xsd/ic-ism",
	"niem":     "iepd/xml/xsd/niem",
	"w3c":      "iepd/xml/xsd/w3c",
	"xsl":      "iepd/xml/xsl",
	"instance": "iepd/xml/instance",
	"sevaism":  "iepd/src/sevaism",
	"xsdprov":  "iepd/src/xsdprov",
}
