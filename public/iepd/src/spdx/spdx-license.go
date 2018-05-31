package main

import "encoding/xml"

//NewLicense ...
func NewLicense()*License{
    return &License{
        // Required for the proper namespacingLicense
        AttrXmlnsXsi:"http://www.w3.org/2001/XMLSchema-instance",
        AttrXmlns:"spdx:xsd::1.0",
    }
}
//License ... 
type License struct {
        AttrXmlnsXsi                             string                                   `xml:"xmlns:xsi,attr" json:"AttrXmlnsXsi,omitempty"`
        AttrXmlns                                string                                   `xml:"xmlns,attr" json:"AttrXmlns,omitempty"`
        IsOsiApproved                            string                                   `xml:"IsOsiApproved,omitempty"  json:"IsOsiApproved,omitempty"`
        StandardLicenseHeader                    string                                   `xml:"StandardLicenseHeader,omitempty"  json:"StandardLicenseHeader,omitempty"`
        LicenseText                              string                                   `xml:"LicenseText,omitempty"  json:"LicenseText,omitempty"`
        StandardLicenseTemplate                  string                                   `xml:"StandardLicenseTemplate,omitempty"  json:"StandardLicenseTemplate,omitempty"`
        XMLName                                  xml.Name                                 `xml:"License,omitempty"  json:"License,omitempty"`
}