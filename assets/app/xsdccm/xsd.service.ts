import { Injectable } from "@angular/core"
import { Observable } from "rxjs/Observable"
import { map } from 'rxjs/operators';
import { Headers, Http, Response, ResponseContentType } from "@angular/http"
import { ErrorService } from "../errors/error.service"
import * as crypto from 'crypto'

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
} from "./xsd.model"

const Config = {
  "project": "SPDX XML",
  "title": "SPDX XML Schema Confguration Management",
  "host": "https://spdx-ccm.specchain.org/",
  "remotehost":"https://spdx-xml.specchain.org/",
  "port": ":8080",
  "configfile": "config/spdx-xml-cfg.json",
  "configurl": "https://spdx-xml.specchain.org/config"
}
const httpOptions = {
  headers: new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*'
  })
}
@Injectable()
export class XsdService {
  seldocvalid: boolean = false
  seldocverified: boolean = false
  editMode: boolean = false
  validate: boolean = false
  verify: boolean = false
  validating: boolean = false
  Configs: any[][] = []
  Resources: any[][] = []
  valerrors: any[][] = []
  xmldata: any[][] = []
  jsondata: any[][] = []
  xsd: XsdSchema[] = []
  simpletypes: XsdSimpleType[][] = []
  complextypes: XsdComplexType[][] = []
  elements: XsdElement[][] = []
  activeTabs: string[] = []
  nodeattributes: string[] = []
  selectedcfg: any
  nodeSelected: any
  loading: boolean = false
  tabview: string
  txtFilter: string
  selectedxsd: string
  iepdhost: string
  cfg: any = Config

  constructor(private http: Http, private errorService: ErrorService) {
    this.configResources()
    //console.log(this.Configs)
    //console.log(this.Resources)
  }

  configResources() {
    this.http.get(Config.configurl).subscribe(
      (response) => {
        var p = JSON.parse(response["_body"])
        this.Configs.push(p)
        this.Configs[p.project] = p
        this.Resources[p.project] = []
        for (var r in p.resources) {
          this.Resources[p.project][p.resources[r].name] = p.host + 'file/' + p.resources[r].name
        }
        for (var i in p.implementations) {
          this.http.get(p.implementations[i].srcurl).subscribe(
            (response) => {
              var imp = JSON.parse(response["_body"])
              this.Configs.push(imp)
              this.Configs[imp.project] = imp
              this.Resources[imp.project] = []
              for (var r in imp.resources) {
                this.Resources[imp.project][imp.resources[r].name] = imp.host + 'file/' + imp.resources[r].name
              }
            })
        }
      })
  }

  xmlResource(xsdsel: string, resname: string) {
    if (!this.xmldata[xsdsel]) {
      this.xmldata[xsdsel] = []
    }
    if (this.xmldata[xsdsel][resname]) {
      return this.xmldata[xsdsel][resname]
    } else {
      return false
    }
  }

  iepdXMLResource(xsdsel: string, resname: string) {
    //console.log("iepdXMLResource " + xsdsel + " - " + resname)
    //console.log("url: " + this.Resources[xsdsel][resname])
    return this.http.get(this.Resources[xsdsel][resname]).pipe(
      map(
      (response: Response) => {
        this.xmldata[xsdsel][resname] = response["_body"]
        return this.xmldata[xsdsel][resname]
      })
    )
  }

  jsonResource(xsdsel: string, resname: string) {
    if (!this.jsondata[xsdsel]) {
      this.jsondata[xsdsel] = []
    }
    if (this.jsondata[xsdsel][resname]) {
      return this.jsondata[xsdsel][resname]
    } else {
      return false
    }
  }

  iepdJsonResource(xsdsel: string, resname: string) {
    //console.log("iepdJsonResource " + xsdsel + " - " + resname)
    return this.http.get(this.Resources[xsdsel][resname]).pipe(
      map(
      (response: Response) => {
        if (!this.jsondata[xsdsel]) {
          this.jsondata[xsdsel] = []
        }
        this.jsondata[xsdsel][resname] = JSON.parse(response["_body"])
        return this.jsondata[xsdsel][resname]
      })
      )
  }

  validateXml(xmlstrng: string, xsdname: string) {
    //console.log("validateXml")
    this.validating = true
    var valdata = { package: this.selectedxsd, xmlstr: xmlstrng, xsdname: xsdname }
    return this.http.post(this.cfg.host.concat('validate'), valdata).pipe(
      map(
        (response: Response) => {
          // var b=response['_body']
          var vresp = JSON.parse(response['_body'])
          //var vresp = response.json
         // console.log(vresp)
          if (vresp['status']) {
            this.seldocvalid = vresp['status']
            this.validating = false
            return this.seldocvalid
          } else {
            this.validating = false
            this.seldocvalid = false
            this.valerrors = vresp['status']
            console.log(this.valerrors)
            return this.seldocvalid
          }
        })
        )
  }
  verifyStr(cfg: any, name: string, str: string) {
    var digest = crypto.createHash('sha256').update(str, 'utf8').digest('hex')
    return this.http.post(cfg['host'].concat('verify'), { id: name, digest: digest }).pipe(
      map(
      (response) => {
        var vresp = JSON.parse(response['_body'])
        this.seldocverified = vresp.status
      })
      )
  }
  toArray(n) {
    var a = []
    for (var i in n) {
      a.push(n[i])
    }
    return a
  }
  getComponents(xsdjsondata: object) {
    this.simpletypes[this.selectedxsd] = []
    this.complextypes[this.selectedxsd] = []
    this.elements[this.selectedxsd] = []
    this.xsd[this.selectedxsd] = new XsdSchema()
    //console.log(xsdjsondata)
    for (var n in xsdjsondata) {
      //console.log(n)
      var c = xsdjsondata[n]
      //console.log(c)
      var appinf = new XsdAppinfo()
      if (c.appinfo) {
        if (c.appinfo.ComplexType) {
          appinf.ComplexType = new ComplexType()
          for (var a in c.appinfo.ComplexType) {
            appinf.ComplexType[a] = c.appinfo.ComplexType[a]
          }
        }
        if (c.appinfo.SimpleType) {
          appinf.SimpleType = new SimpleType()
          for (var a in c.appinfo.SimpleType) {
            appinf.SimpleType[a] = c.appinfo.SimpleType[a]
          }
        }
        if (c.appinfo.Element) {
          appinf.Element = new Element()
          for (var a in c.appinfo.Element) {
            appinf.Element[a] = c.appinfo.Element[a]
          }
        }
      }
      if (c.xsdnode === 'simpleType') {
        var enums = []
        for (var e in c.enumerations) {
          var en = new XsdEnumeration
          for (var a in c.enumerations[e]) {
            en[a] = c.enumerations[e][a]
          }
          enums.push(en)
        }
        var st = new XsdSimpleType()
        for (var a in c) {
          if (typeof c[a] === 'string') {
            st[a] = c[a]
          }
        }
        st.appinfo = appinf
        if (enums.length > 0) {
          st.enumerations = enums
        }
        this.simpletypes[this.selectedxsd].push(st)
      }
      if (c.xsdnode === 'complexType') {
        var ct = new XsdComplexType()
        for (var a in c) {
          if (typeof c[a] === 'string') {
            ct[a] = c[a]
          }
        }
        ct.appinfo = appinf
        if (c.sequence) {
          var els = []
          for (var e in c.sequence) {
            var el = new XsdElement
            for (var a in c.sequence[e]) {
              el[a] = c.sequence[e][a]
            }
            els.push(el)
          }
          ct.sequence = els
        }
        if (c.choice) {
          var els = []
          for (var e in c.choice) {
            var el = new XsdElement
            for (var a in c.choice[e]) {
              el[a] = c.choice[e][a]
            }
            els.push(el)
          }
          ct.choice = els
        }
        this.complextypes[this.selectedxsd].push(ct)
      }
      if (c.xsdnode === 'element') {
        var et = new XsdElement()
        for (var a in c) {
          if (typeof c[a] === 'string') {
            et[a] = c[a]
          }
        }
        et.appinfo = appinf
        this.elements[this.selectedxsd].push(et)
      }
    }
    this.xsd[this.selectedxsd] = new XsdSchema()
    this.xsd[this.selectedxsd].complextypes = this.complextypes[this.selectedxsd]
    this.xsd[this.selectedxsd].simpletypes = this.simpletypes[this.selectedxsd]
    this.xsd[this.selectedxsd].elements = this.elements[this.selectedxsd]
    //console.log(this.xsd)
    return this.xsd[this.selectedxsd]
  }
  nameList(narray: any[]) {
    let nl: string[] = []
    for (var n in narray) {
      nl.push(narray[n].name)
    }
    return nl
  }
  downloadDocument(url: string, name: string, callback) {
    const headers = new Headers({ responseType: ResponseContentType.Text })
    return this.http.get(url, { headers: headers, responseType: ResponseContentType.Text }).map(
      (response: Response) => {
        return response.text()
      }
    ).catch((error: Response) => {
      this.errorService.handleError(error.json())
      return Observable.throw(error.json())
    })
  }
  selectProject(cfg: any) {
    //console.log("selectProject " + cfg["project"])
    this.openTab(cfg["project"])
    if (this.isOpenTab(cfg["project"])) {
      this.selectedcfg = cfg
      this.selectedxsd = cfg["project"]
      if (this.Configs[this.selectedxsd]["implementations"]) {
        if (!this.jsondata[this.selectedxsd]) {
          this.jsondata[this.selectedxsd] = []
          if (this.jsonResource(this.selectedxsd, "refxsdjson")) {
            this.getComponents(this.jsondata[this.selectedxsd]["refxsdjson"])
            return this.jsondata[this.selectedxsd]["refxsdjson"]
          } else {
            this.iepdJsonResource(this.selectedxsd, "refxsdjson").subscribe(
              (rxj => {
                this.jsondata[this.selectedxsd]["refxsdjson"] = rxj
                this.getComponents(rxj)
                return rxj
              })
            )
          }
        }
      } else {
        if (!this.jsondata[this.selectedxsd]) {
          this.jsondata[this.selectedxsd] = []
        }
        if (this.jsonResource(this.selectedxsd, "iepxsdjson")) {
          this.getComponents(this.jsondata[this.selectedxsd]["iepxsdjson"])
          return this.jsondata[this.selectedxsd]["iepxsdjson"]
        } else {
          this.iepdJsonResource(this.selectedxsd, "iepxsdjson").subscribe(
            (ixj => {
              this.jsondata[this.selectedxsd]["iepxsdjson"] = ixj
              this.getComponents(ixj)
              return ixj
            })
          )
        }
      }
    }
  }
  isProjSel(n) {
    if (this.selectedxsd === n) {
      return true
    }
  }
  openTab(tab) {
    //console.log(tab)
    this.tabview = tab
    if (this.isOpenTab(tab)) {
      this.activeTabs.splice(this.activeTabs.indexOf(tab), 1)
    } else {
      this.activeTabs.push(tab)
    }
  }
  isOpenTab(tab) {
    if (this.activeTabs.indexOf(tab) > -1) {
      return true
    } else {
      return false
    }
  }
  selElement(nodename: string) {
    this.editMode = false
    if (this.xsd) {
      for (var n in this.xsd[this.selectedxsd].elements) {
        if (this.xsd[this.selectedxsd].elements[n].name === nodename) {
          //console.log("Sel: " + nodename)
          this.nodeSelected = this.xsd[this.selectedxsd].elements[n]
          this.getNodeAttributes()
          //this.router.navigate([{ outlets: { xsd: [ 'simpletype', nodename ] }}]) 
          return this.xsd[this.selectedxsd].elements[n]
        }
      }
    }
  }
  selSimpleType(nodename: string) {
    this.editMode = false
    if (this.xsd) {
      for (var n in this.xsd[this.selectedxsd].simpletypes) {
        if (this.xsd[this.selectedxsd].simpletypes[n].name === nodename) {
          //console.log("Sel: " + nodename)
          this.nodeSelected = this.xsd[this.selectedxsd].simpletypes[n]
          this.getNodeAttributes()
          //this.router.navigate([{ outlets: { xsd: [ 'simpletype', nodename ] }}]) 
          return this.xsd[this.selectedxsd].simpletypes[n]
        }
      }
    }
  }
  selComplexType(nodename: string) {
    this.editMode = false
    if (this.xsd) {
      for (var n in this.xsd[this.selectedxsd].complextypes)
        if (this.xsd[this.selectedxsd].complextypes[n].name === nodename) {
          //console.log("Sel: " + nodename)
          this.nodeSelected = this.xsd[this.selectedxsd].complextypes[n]
          this.getNodeAttributes()
          //this.router.navigate([{ outlets: { xsd: [ 'complextype', nodename ] }}])  
          return this.xsd[this.selectedxsd].complextypes[n]
        }
    }
  }
  isSel(n) {
    if (this.nodeSelected === n) {
      return true
    }
  }
  editNode(n) {
    this.editMode = true
  }
  saveChange(n) {
    this.editMode = false
  }
  getNodeAttributes() {
    this.nodeattributes = []
    for (var a in this.nodeSelected) {
      if (a === 'appinfo') {
        for (var e in this.nodeSelected[a]) {
          for (var at in this.nodeSelected[a][e]) {
            this.nodeattributes[at] = this.nodeSelected[a][e][at]
          }
        }
      } else {
        this.nodeattributes[a] = this.nodeSelected[a]
      }
    }
    // console.log(this.nodeattributes)
  }
}
