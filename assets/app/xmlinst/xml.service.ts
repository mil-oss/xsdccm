import "rxjs/Rx";
declare var Saxon: any;
import * as crypto from 'crypto';
import { EventEmitter, Injectable } from "@angular/core";
import { Headers, Http, Response, ResponseContentType } from "@angular/http";
import { Observable } from "rxjs";
import { ErrorService } from "./../errors/error.service";
import { XsdService } from "./../xsdccm/xsd.service";

const httpOptions = {
  headers: new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};


@Injectable()
export class XmlService {
  rawview: boolean = false;
  rawmode: boolean = false;
  seldocvalid: boolean = false;
  seldocverified: boolean = false;
  validate: boolean = false;
  xmldata: any = {
    Schema: {
      refXsd: {
        name: "SEvA Reference XSD",
        value: "refXsd",
        root: "SoftwareEvidenceArchive"
      },
      iepdXsd: {
        name: "SEvA Implementation XSD",
        value: "iepdXsd",
        root: "SoftwareEvidenceArchive"
      }
    },
    Instances: {
    },
    Transforms: {
      "iep_xsd.xsl": { name: "iep_xsd.xsl" },
      "xml_instance.xsl": { name: "xml_instance.xsl" },
      "xsd_json.xsl": { name: "xsd_json.xsl" },
      "xml_json.xsl": { name: "xml_json.xsl" },
      "go-gen.xsl": { name: "go-gen.xsl" },
      "go-test-gen.xsl": { name: "go-test-gen.xsl" }
    },
    Tests: {
    }
  };
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
  selectedxml: any;
  xsdmode: boolean = true;
  valerrors: any[] = [];
  viewmode: string = "xml";

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
  //valdata:{xmlname: string, xmlstring: string, xsdname: string}
  validateXml(valdata) {
    this.http.post(this.xsdService.iepdroot.concat('validate'), valdata, httpOptions).subscribe(
      (response) => {
        var vresp = JSON.parse(response['_body']);
        if (vresp.status) {
          this.seldocvalid = vresp.status;
        } else {
          this.seldocvalid = false;
          this.valerrors = vresp;
          console.log(this.valerrors)
        }
      });
  };
  verifyStr(name: string, str: string) {
    var digest = crypto.createHash('sha256').update(str, 'utf8').digest('hex');
    this.http.post(this.xsdService.iepdroot.concat('verify'), { id: name, digest: digest }).subscribe(
      (response) => {
        var vresp = JSON.parse(response['_body']);
        this.seldocverified = vresp.status;
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
  downloadResource(url: string, name: string, callback) {
    const headers = new Headers({ responseType: ResponseContentType.Text });
    this.http.get(url, { headers: headers, responseType: ResponseContentType.Text }).subscribe(
      (response) => {
        callback(name, response.text());
      }
    );
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
