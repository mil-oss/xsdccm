package main

// ValidationData ... post data for validation
type ValidationData struct {
	Package   string `json:"package,omitempty"`
	XMLName   string `json:"xmlname,omitempty"`
	XMLPath   string `json:"xmlpath,omitempty"`
	XMLString string `json:"xmlstr"`
	XSDName   string `json:"xsdname,omitempty"`
	XSDPath   string `json:"xsdpath,omitempty"`
	XSDString string `json:"xsdstr,omitempty"`
	Valid     bool   `json:"valid,omitempty"`
}

// VerifyData ... post data for verification
type VerifyData struct {
	ID     string `json:"id"`
	Digest string `json:"digest"`
}

// TransformData ... post data for transformation
type TransformData struct {
	XMLName    string   `json:"xmlname,omitempty"`
	XMLPath    string   `json:"xmlpath,omitempty"`
	XMLString  string   `json:"xmlstr"`
	XSLName    string   `json:"xslname,omitempty"`
	XSLPath    string   `json:"xslpath,omitempty"`
	XSLString  string   `json:"xslstr,omitempty"`
	ResultPath string   `json:"resultpath,omitempty"`
	Params     []string `json:"params,omitempty"`
}

// Success ... http erro response
type Success struct {
	Status  bool   `json:"status,omitempty"`
	Content string `json:"content,omitempty"`
}

// ValErr ... Validation Error
type ValErr struct {
	Code     int    `json:"code,omitempty"`
	Message  string `json:"message,omitempty"`
	Level    int    `json:"level,omitempty"`
	Line     int    `json:"line,omitempty"`
	NodeName string `json:"nodename,omitempty"`
}

// ValErrs ... list of Errors
type ValErrs []ValErr
