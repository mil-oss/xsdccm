import { Component, OnInit } from '@angular/core';
import { XsdService } from '../../xsdccm/xsd.service';
import { XmlService } from '../xml.service';

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.css']
})
export class InstancesComponent implements OnInit {
  datetime: Date;

  constructor(public xmlService: XmlService, public xsdService: XsdService) { }

  ngOnInit() {

  }

  selectInstance(selxsd: any, i: any) {
    this.xsdService.selectedcfg = selxsd;
    this.xsdService.selectedxsd = selxsd["project"];
    this.xmlService.selectedxmldoc = i;
    this.xmlService.selectedxml = i["name"];
    this.xmlService.seldocvalid = false;
    this.xsdService.validate = true;
    //console.log("selectInstance " + i.name);
    if (this.xsdService.xmlResource(this.xsdService.selectedxsd, this.xmlService.selectedxml)) {
      if (this.xsdService.validate) {
        this.xsdService.validateXml(this.xsdService.xmldata[this.xsdService.selectedxsd][this.xmlService.selectedxml], 'iepxsd').subscribe(
          (vx => { return vx }))
      }
      return this.xsdService.xmldata[this.xsdService.selectedxsd][this.xmlService.selectedxml]
    } else {
      this.xsdService.iepdXMLResource(this.xsdService.selectedxsd, this.xmlService.selectedxml).subscribe(
        (docd => {
          if (this.xsdService.validate) {
            this.xsdService.validateXml(docd, 'iepxsd').subscribe(
              (vx => { return vx }))
          }
          return docd
        })
      )
    }
  }

  selectTestData(selxsd: any, d: any) {
    this.xsdService.selectedcfg = selxsd;
    this.xsdService.selectedxsd = selxsd["project"];
    this.xsdService.seldocvalid = false;
    this.xsdService.validate = false;

    this.xmlService.selectedxmldoc = d;
    this.xmlService.selectedxml = d["name"];

    if (this.xsdService.xmlResource(this.xsdService.selectedxsd, this.xmlService.selectedxml)) {
      return this.xsdService.xmldata[this.xsdService.selectedxsd][this.xmlService.selectedxml]
    } else {
      this.xsdService.iepdXMLResource(this.xsdService.selectedxsd, this.xmlService.selectedxml).subscribe(
        (docd => { return docd })
      )
    }
  }

  selectXsd(selxsd: any, s: any) {
    this.xsdService.selectedcfg = selxsd;
    this.xsdService.selectedxsd = selxsd["project"];
    this.xsdService.seldocvalid = false;
    this.xsdService.validate = true;
    this.xmlService.selectedxmldoc = s;
    this.xmlService.selectedxml = s["name"];
    if (this.xsdService.xmlResource(this.xsdService.selectedxsd, this.xmlService.selectedxml)) {
      if (this.xsdService.validate) {
        this.xsdService.validateXml(this.xsdService.xmldata[this.xsdService.selectedxsd][this.xmlService.selectedxml], 'xmlschemaxsd').subscribe(
          (vx => { return vx }))
      }
      return this.xsdService.xmldata[this.xsdService.selectedxsd][this.xmlService.selectedxml]
    } else {
      this.xsdService.iepdXMLResource(this.xsdService.selectedxsd, this.xmlService.selectedxml).subscribe(
        (docd => {
          if (this.xsdService.validate) {
            this.xsdService.validateXml(docd, 'xmlschemaxsd').subscribe(
              (vx => { return vx }))
          }
          return docd
        })
      )
    }
  }

  selectXsl(selxsd: any, s: any) {
    this.xsdService.selectedcfg = selxsd;
    this.xsdService.selectedxsd = selxsd["project"];
    this.xsdService.seldocvalid = false;
    this.xsdService.validate = true;

    this.xmlService.selectedxmldoc = s;
    this.xmlService.selectedxml = s["name"];

    if (this.xsdService.xmlResource(this.xsdService.selectedxsd, this.xmlService.selectedxml)) {
      if (this.xsdService.validate) {
        this.xsdService.validateXml(this.xsdService.xmldata[this.xsdService.selectedxsd][this.xmlService.selectedxml], 'xsltxsd').subscribe(
          (vx => { return vx }))
      }
      return this.xsdService.xmldata[this.xsdService.selectedxsd][this.xmlService.selectedxml]
    } else {
      this.xsdService.iepdXMLResource(this.xsdService.selectedxsd, this.xmlService.selectedxml).subscribe(
        (docd => {
          if (this.xsdService.validate) {
            this.xsdService.validateXml(docd, 'xsltxsd').subscribe(
              (vx => { return vx }))
          }
          return docd
        })
      )
    }
  }

  /*  validateInstance(xmlstr: string, xsdname: string) {
     console.log("validateInstance")
     if (this.xsdService.xmldata[this.xsdService.selectedxsd][xsdname]) {
       this.xsdService.validateXml(xmlstr, this.xsdService.xmldata[this.xsdService.selectedxsd][xsdname]).subscribe(
         (v => {
           console.log(this.xsdService.seldocvalid)
           return v
         })
       )
     } else {
       this.xsdService.iepdXMLResource(this.xsdService.selectedxsd, xsdname).subscribe(
         (xsdd => {
           this.xsdService.validateXml(xmlstr, xsdd).subscribe(
             (v => {
               console.log(this.xsdService.seldocvalid)
               return v
             })
           )
         })
       )
     }
   } */

  xView() {
    this.xmlService.viewmode = "xml";
  }

}
