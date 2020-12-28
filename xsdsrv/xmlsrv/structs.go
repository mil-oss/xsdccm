package xmlsrv

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
