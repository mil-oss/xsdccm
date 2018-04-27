import "rxjs/Rx";
declare var Saxon: any;
import * as crypto from 'crypto';
import { EventEmitter, Injectable } from "@angular/core";
import { Headers, Http, Response, ResponseContentType } from "@angular/http";
import { Observable } from "rxjs";
import { ErrorService } from "./../errors/error.service";
import { SimpletypesComponent } from './simpletypes/simpletypes.component';
import { ComplextypesComponent } from './complextypes/complextypes.component';
import { ElementsComponent } from './elements/elements.component';
import { SimpletypeComponent } from './simpletypes/simpletype/simpletype.component';
import { ComplextypeComponent } from './complextypes/complextype/complextype.component';
import { ElementComponent } from './elements/element/element.component';
import {
  XsdAppinfo,
  XsdEnumeration,
  XsdSimpleType,
  XsdComplexType,
  XsdElement,
  XsdSchema,
  Element,
  SimpleType,
  ComplexType
} from "./xsd.model";

@Injectable()
export class XsdService {
  xsd: XsdSchema;
  rawview: boolean = false;
  rawmode: boolean = false;
  seldocvalid: boolean = false;
  seldocverified: boolean = false;
  validate: boolean = false;
  simpletypes: XsdSimpleType[] = [];
  complextypes: XsdComplexType[] = [];
  elements: XsdElement[] = [];
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
  viewmode: string = "xml";
  //iepdroot: string = "https://seva.specchain.org/";
  //iepdhost: string = "https://seva.specchain.org/iepd/";
  iepdroot: string = "https://sevaxsd.specchain.org/";
  iepdhost: string = "https://sevaxsd.specchain.org/file/";
  xmldata: any = {
  };
  jsondata: any = {
  };
  xsds: any = {
    refXsd: {
      name: "SEvA Reference XSD",
      value: "refXsd",
      file: "ref.xsd",
      root: "SoftwareEvidenceArchive"
    },
    iepXsd: {
      name: "SEvA Implementation XSD",
      value: "iepdXsd",
      file: "iep.xsd",
      root: "SoftwareEvidenceArchive",
      json: this.jsondata["iep_xsd.json"]
    }
  };

  constructor(private http: Http, private errorService: ErrorService) {
    this.iepdResource("ref.xsd")
    this.iepdResource("iep.xsd")
    this.iepdResource("test_data.xml")
    this.iepdResource("test_instance.xml")
    this.iepdResource("iep_xsd.xsl")
    this.iepdResource("xml_instance.xsl")
    this.iepdResource("xsd_json.xsl")
    this.iepdResource("xml_json.xsl")
    this.iepdResource("go-gen.xsl")
    this.iepdResource("go-test-gen.xsl")
    this.iepdJsonResource("ref_xsd.json")
    this.xsds.refXsd.json=this.jsondata["iep_xsd.json"]
    this.iepdJsonResource("iep_xsd.json")
    this.xsds.iepXsd.json=this.jsondata["iep_xsd.json"]
    this.iepdJsonResource("test_instance.json")
    this.iepdJsonResource("provenance_report.json")
  }

  iepdResource(name: string) {
    var resp = {}
    this.http.get(this.iepdhost + name).subscribe(
      (response) => {
        this.xmldata[name] = response["_body"]
      })
  }

  iepdJsonResource(name: string) {
    var resp = {}
    this.http.get(this.iepdhost + name).subscribe(
      (response) => {
        this.jsondata[name] = JSON.parse(response["_body"])
      })
  }

  toArray(n) {
    var a = [];
    for (var i in n) {
      a.push(n[i]);
    }
    return a;
  }
  getComponents(xsdjsondata: object) {
    this.simpletypes = [];
    this.complextypes = [];
    this.elements = [];
    for (var n in xsdjsondata) {
      var c = xsdjsondata[n];
      var appinf = new XsdAppinfo();
      if (c.appinfo.ComplexType) {
        appinf.ComplexType = new ComplexType();
        for (var a in c.appinfo.ComplexType) {
          appinf.ComplexType[a] = c.appinfo.ComplexType[a];
        }
      }
      if (c.appinfo.SimpleType) {
        appinf.SimpleType = new SimpleType();
        for (var a in c.appinfo.SimpleType) {
          appinf.SimpleType[a] = c.appinfo.SimpleType[a];
        }
      }
      if (c.appinfo.Element) {
        appinf.Element = new Element();
        for (var a in c.appinfo.Element) {
          appinf.Element[a] = c.appinfo.Element[a];
        }
      }
      if (c.xsdnode === 'simpleType') {
        var enums = [];
        for (var e in c.enumerations) {
          var en = new XsdEnumeration;
          for (var a in c.enumerations[e]) {
            en[a] = c.enumerations[e][a];
          }
          enums.push(en);
        }
        var st = new XsdSimpleType();
        for (var a in c) {
          if (typeof c[a] === 'string') {
            st[a] = c[a];
          }
        }
        st.appinfo = appinf;
        if (enums.length > 0) {
          st.enumerations = enums;
        }
        this.simpletypes.push(st);
      }
      if (c.xsdnode === 'complexType') {
        var ct = new XsdComplexType();
        for (var a in c) {
          if (typeof c[a] === 'string') {
            ct[a] = c[a];
          }
        }
        ct.appinfo = appinf;
        if (c.sequence) {
          var els = [];
          for (var e in c.sequence) {
            var el = new XsdElement;
            for (var a in c.sequence[e]) {
              el[a] = c.sequence[e][a];
            }
            els.push(el);
          }
          ct.sequence = els;
        }
        if (c.choice) {
          var els = [];
          for (var e in c.choice) {
            var el = new XsdElement;
            for (var a in c.choice[e]) {
              el[a] = c.choice[e][a];
            }
            els.push(el);
          }
          ct.choice = els;
        }
        this.complextypes.push(ct);
      }
      if (c.xsdnode === 'element') {
        var et = new XsdElement();
        for (var a in c) {
          if (typeof c[a] === 'string') {
            et[a] = c[a];
          }
        }
        et.appinfo = appinf;
        this.elements.push(et);
      }
    }
    this.xsd = new XsdSchema();
    this.xsd.complextypes = this.complextypes;
    this.xsd.simpletypes = this.simpletypes;
    this.xsd.elements = this.elements;
    //console.log(this.xsd);
    return this.xsd;
  }
  nameList(narray: any[]) {
    let nl: string[] = [];
    for (var n in narray) {
      nl.push(narray[n].name);
    }
    return nl;
  }
  downloadDocument(url: string, name: string, callback) {
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
  selElement(nodename) {
    this.editMode = false;
    if (this.xsd) {
      for (var n in this.xsd.elements) {
        if (this.xsd.elements[n].name === nodename) {
          //console.log("Sel: " + nodename);
          this.nodeSelected = this.xsd.elements[n];
          this.getNodeAttributes();
          //this.router.navigate([{ outlets: { xsd: [ 'simpletype', nodename ] }}]); 
          return this.xsd.elements[n];
        }
      }
    }
  };
  selSimpleType(nodename) {
    this.editMode = false;
    if (this.xsd) {
      for (var n in this.xsd.simpletypes) {
        if (this.xsd.simpletypes[n].name === nodename) {
          //console.log("Sel: " + nodename);
          this.nodeSelected = this.xsd.simpletypes[n];
          this.getNodeAttributes();
          //this.router.navigate([{ outlets: { xsd: [ 'simpletype', nodename ] }}]); 
          return this.xsd.simpletypes[n];
        }
      }
    }
  };
  selComplexType(nodename) {
    this.editMode = false;
    if (this.xsd) {
      for (var n in this.xsd.complextypes)
        if (this.xsd.complextypes[n].name === nodename) {
          //console.log("Sel: " + nodename);
          this.nodeSelected = this.xsd.complextypes[n];
          this.getNodeAttributes();
          //this.router.navigate([{ outlets: { xsd: [ 'complextype', nodename ] }}]);  
          return this.xsd.complextypes[n];
        }
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
