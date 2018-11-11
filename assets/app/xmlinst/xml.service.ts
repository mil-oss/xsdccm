
import { Injectable } from "@angular/core";
import { Headers, Http, ResponseContentType } from "@angular/http";
import { ErrorService } from "./../errors/error.service";
import { XsdService } from "./../xsdccm/xsd.service";


@Injectable()
export class XmlService {
  rawview: boolean = false;
  rawmode: boolean = false;
  seldocvalid: boolean = false;
  seldocverified: boolean = false;
  validate: boolean = false;
  txtFilter: string;
  tabview: string;
  activeTabs: string[] = [];
  nodeSelected: any;
  nodeattributes: any[];
  editMode: boolean = false;
  ijson: any;
  rjson: any;
  selected: string;
  selectedxsd: any;
  selectedxmldoc: any;
  selectedxml: string;
  xsdmode: boolean = true;
  valerrors: any[] = [];
  viewmode: string = "xml";

  xmldata: any = {
    Schema: {
      refxsd: {
        "name": "refxsd",
        "description": "NIEM Conformant Reference XML Schema",
        "jsondata": "refxsdjson"
      },
      iepxsd: {
        "name": "iepxsd",
        "description": "Implementation XML Schema",
        "jsondata": "iepxsdjson"
      }
    },
    Instances: {
      instancexml: {
        "name": "instancexml",
        "description": "Instance generated using XSLT",
        "jsondata": "instancejson"
      },
      instancegolangxml: {
        "name": "instancegolangxml",
        "description": "Instance marshalled using GOLANG",
        "jsondata": "instancejson"
      }
    },
    Transforms: {
      iepxsdxsl: {
        "name": "iepxsdxsl",
        "description": "XSLT to generate Implementation Schema"
      },
      instancexsl: {
        "name": "instancexsl",
        "description": "XSLT to generate an instance using test values"
      },
      gogenxsdxsl: {
        "name": "gogenxsdxsl",
        "description": "XSLT to generate a GOLANG Struct for SPDX License information"
      },
      gotestgenxsl: {
        "name": "gotestgenxsl",
        "description": "XSLT to generate GOLANG Unit Tests for SPDX License information using test data"
      },
      iepxsl: {
        "name": "iepxsl",
        "description": "Common XSLT utility for generating Implementaion XSDs from Reference XSDs"
      },
      xmlinstancexsl: {
        "name": "xmlinstancexsl",
        "description": "Common XSLT utility for generating XML Instances from Implemtation XSDs using test data"
      },
      gogenxsl: {
        "name": "gogenxsl",
        "description": "Common XSLT utility for generating GOLANG structs and Unit Tests from Implemtation XSDs using test data"
      },
      xsdjsonxsl: {
        "name": "xsdjsonxsl",
        "description": "Common XSLT utility for generating a JSON representation of an XML Schema"
      },
      xmljsonxsl: {
        "name": "xmljsonxsl",
        "description": "Common XSLT utility for generating a JSON representation of an XML Instance"
      },
      gendocxsl: {
        "name": "gendocxsl",
        "description": "XSLT to generate Documentation from XML Schema"
      }
    },
    TestData: {
      testdataxml: {
        "name": "testdataxml",
        "description": "Test Data used to generated instances and code tests"
      }
    }
  };
  constructor(private http: Http, private errorService: ErrorService, private xsdService: XsdService) {
  }
  //{name,ism}
  getInstance(jobj) {
    this.xmldata.Instances[jobj.name] = {}
    this.http.get(this.xsdService.iepdhost + "test_instance.xml").subscribe(
      (response) => {
        this.xmldata.Instances[jobj.name] = { name: jobj.name, file: "test_instance.xml", content: response['_body'] };
      });
    this.http.get(this.xsdService.iepdhost + "test_instance.json").subscribe(
      (response) => {
        var jdta = JSON.parse(response['_body']);
        this.xmldata.Instances[jobj.name].json = jdta;
      });
  }
  getTestData(params) {
    this.http.get(this.xsdService.iepdhost + "test_data.xml").subscribe(
      (response) => {
        this.xmldata.Tests[params.name] = { name: params.name, file: "test_data.xml", content: response["_body"] };
      });
  }
  toArray(n) {
    var a = [];
    for (var i in n) {
      a.push(n[i]);
    }
    return a;
  }
  nameList(narray: any[]) {
    let nl: string[] = [];
    for (var n in narray) {
      nl.push(narray[n].name);
    }
    return nl;
  }
  openTab(tab) {
    //console.log(tab);
    this.tabview = tab;
    if (this.isOpenTab(tab)) {
      this.activeTabs.splice(this.activeTabs.indexOf(tab), 1);
    } else {
      this.activeTabs.push(tab);
    }
  };
  isOpenTab(tab) {
    if (this.activeTabs.indexOf(tab) > -1) {
      return true;
    } else {
      return false;
    }
  };
  isSel(n) {
    if (this.nodeSelected === n) {
      return true;
    }
  };
  editNode(n) {
    this.editMode = true;
  };
  saveChange(n) {
    this.editMode = false;
  };
  getNodeAttributes() {
    this.nodeattributes = [];
    for (var a in this.nodeSelected) {
      if (a === 'appinfo') {
        for (var e in this.nodeSelected[a]) {
          for (var at in this.nodeSelected[a][e]) {
            this.nodeattributes[at] = this.nodeSelected[a][e][at];
          }
        }
      } else {
        this.nodeattributes[a] = this.nodeSelected[a];
      }
    }
    // console.log(this.nodeattributes);
  };
}
