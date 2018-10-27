import { Injectable } from "@angular/core";
import { Headers, Http, ResponseContentType} from "@angular/http";
import { ErrorService } from "./../errors/error.service";
import * as crypto from 'crypto';

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

import * as cfgdata from "../../../config/xsdccm.json";

const Config = (<any>cfgdata)
const Configurl = (<any>cfgdata).configurl;
const httpOptions = {
  headers: new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
  })
};
@Injectable()
export class XsdService {
  xsd: XsdSchema[] = [];
  rawview: boolean = false;
  rawmode: boolean = false;
  seldocvalid: boolean = false;
  seldocverified: boolean = false;
  validate: boolean = false;
  simpletypes: XsdSimpleType[][] = [];
  complextypes: XsdComplexType[][] = [];
  elements: XsdElement[][] = [];
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
  iepdhost: string;
  xmldata: any[][] = [];
  jsondata: any[][] = [];
  cfg: any = Config;
  Configs: any[][] = []
  Resources: any[][] = []
  valerrors: any[] = [];

  constructor(private http: Http, private errorService: ErrorService) {
    this.configResources()
    console.log(this.Configs)
    console.log(this.Resources)
  }
  configResources() {
    this.http.get(Configurl).subscribe(
      (response) => {
        var p = JSON.parse(response["_body"])
        this.Configs.push(p)
        this.Configs[p.project] = p
        this.Resources[p.project]=[]
        for (var r in p.resources) {
          this.Resources[p.project][p.resources[r].name] = p.host + 'file/' + p.resources[r].name
        };
        for (var i in p.implementations) {
          this.http.get(p.implementations[i].srcurl).subscribe(
            (response) => {
              var imp = JSON.parse(response["_body"])
              this.Configs.push(imp)
              this.Configs[imp.project] = imp
              this.Resources[imp.project] = []
              for (var r in imp.resources) {
                this.Resources[imp.project][imp.resources[r].name] = imp.host + 'file/' + imp.resources[r].name
              };
            }
          )
        }
      })
  }
  iepdXMLResource(xsdsel: string,resname: string) {
    console.log("iepdXMLResource " + xsdsel + " - " + resname);
    console.log("validate: "+this.validate)
    if (!this.xmldata[xsdsel]) {
      this.xmldata[xsdsel] = []
    }
    if (this.xmldata[xsdsel][resname]) {
      if(this.validate){
        this.validateXml(this.xmldata[xsdsel][resname],"iepxsd")
      }
      return this.xmldata[xsdsel][resname]
    } else {
      this.http.get(this.Resources[xsdsel][resname]).subscribe(
        (response) => {
          this.xmldata[xsdsel][resname] = response["_body"]
          if(this.validate){
            this.validateXml(this.xmldata[xsdsel][resname],"iepxsd")
          }
          return this.xmldata[xsdsel][resname]
        })
    }
  }
  iepdJsonResource(xsdsel: string,resname: string) {
    console.log("iepdJsonResource "+xsdsel+" - "+resname);
    if (!this.jsondata[xsdsel]) {
      this.jsondata[xsdsel] = []
    }
    if (this.jsondata[xsdsel][resname]) {
      //console.log(this.jsondata[xsdsel][resname])
      return this.jsondata[xsdsel][resname]
    } else {
      this.http.get(this.Resources[xsdsel][resname]).subscribe(
        (response) => {
          this.jsondata[xsdsel][resname] = JSON.parse(response["_body"])
          return this.jsondata[xsdsel][resname]
        })
    }
  }
  validateXml(xmlstrng: string, xsdn: string) {
    var valdata = { xmlstr: xmlstrng, xsdname: xsdn };
    this.http.post(this.cfg.host.concat('validate'), valdata).subscribe(
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
  verifyStr(cfg: any, name: string, str: string) {
    var digest = crypto.createHash('sha256').update(str, 'utf8').digest('hex');
    this.http.post(cfg['host'].concat('verify'), { id: name, digest: digest }).subscribe(
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
  getComponents(xsdjsondata: object) {
    this.simpletypes[this.selectedxsd] = [];
    this.complextypes[this.selectedxsd] = [];
    this.elements[this.selectedxsd] = [];
    this.xsd[this.selectedxsd] = new XsdSchema();
    //console.log(xsdjsondata);
    for (var n in xsdjsondata) {
      //console.log(n);
      var c = xsdjsondata[n];
      //console.log(c);
      var appinf = new XsdAppinfo();
      if (c.appinfo) {
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
        this.simpletypes[this.selectedxsd].push(st);
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
        this.complextypes[this.selectedxsd].push(ct);
      }
      if (c.xsdnode === 'element') {
        var et = new XsdElement();
        for (var a in c) {
          if (typeof c[a] === 'string') {
            et[a] = c[a];
          }
        }
        et.appinfo = appinf;
        this.elements[this.selectedxsd].push(et);
      }
    }
    this.xsd[this.selectedxsd] = new XsdSchema();
    this.xsd[this.selectedxsd].complextypes = this.complextypes[this.selectedxsd];
    this.xsd[this.selectedxsd].simpletypes = this.simpletypes[this.selectedxsd];
    this.xsd[this.selectedxsd].elements = this.elements[this.selectedxsd];
    //console.log(this.xsd);
    return this.xsd[this.selectedxsd];
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
  selectProject(name: string) {
    console.log("selectProject " + name);
    this.openTab(name)
    this.selectedxsd = name;
    if (this.Configs[name]["implementations"]) {
      if (!this.jsondata[name]) {
        this.jsondata[name] = []
        return this.iepdJsonResource(name, "refxsdjson");
      } else if (this.jsondata[name]["refxsdjson"]) {
        return
      } else {
        return this.iepdJsonResource(name, "refxsdjson");
      }
    } else {
      if (!this.jsondata[name]) {
        this.jsondata[name] = []
        return this.iepdJsonResource(name, "iepxsdjson");
      } else if (this.jsondata[name]["iepxsdjson"]) {
        return this.jsondata[name]["iepxsdjson"]
      } else {
        return this.iepdJsonResource(name, "iepxsdjson");
      }
    }
  }
  isProjSel(n) {
    if (this.selectedxsd === n) {
      return true;
    }
  };
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
  selElement(nodename: string) {
    this.editMode = false;
    if (this.xsd) {
      for (var n in this.xsd[this.selectedxsd].elements) {
        if (this.xsd[this.selectedxsd].elements[n].name === nodename) {
          //console.log("Sel: " + nodename);
          this.nodeSelected = this.xsd[this.selectedxsd].elements[n];
          this.getNodeAttributes();
          //this.router.navigate([{ outlets: { xsd: [ 'simpletype', nodename ] }}]); 
          return this.xsd[this.selectedxsd].elements[n];
        }
      }
    }
  };
  selSimpleType(nodename: string) {
    this.editMode = false;
    if (this.xsd) {
      for (var n in this.xsd[this.selectedxsd].simpletypes) {
        if (this.xsd[this.selectedxsd].simpletypes[n].name === nodename) {
          //console.log("Sel: " + nodename);
          this.nodeSelected = this.xsd[this.selectedxsd].simpletypes[n];
          this.getNodeAttributes();
          //this.router.navigate([{ outlets: { xsd: [ 'simpletype', nodename ] }}]); 
          return this.xsd[this.selectedxsd].simpletypes[n];
        }
      }
    }
  };
  selComplexType(nodename: string) {
    this.editMode = false;
    if (this.xsd) {
      for (var n in this.xsd[this.selectedxsd].complextypes)
        if (this.xsd[this.selectedxsd].complextypes[n].name === nodename) {
          //console.log("Sel: " + nodename);
          this.nodeSelected = this.xsd[this.selectedxsd].complextypes[n];
          this.getNodeAttributes();
          //this.router.navigate([{ outlets: { xsd: [ 'complextype', nodename ] }}]);  
          return this.xsd[this.selectedxsd].complextypes[n];
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
