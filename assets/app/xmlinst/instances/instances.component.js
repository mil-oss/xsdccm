var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { XsdService } from '../../xsdccm/xsd.service';
import { XmlService } from '../xml.service';
let InstancesComponent = class InstancesComponent {
    constructor(xmlService, xsdService) {
        this.xmlService = xmlService;
        this.xsdService = xsdService;
    }
    ngOnInit() {
    }
    selectInstance(selxsd, i) {
        this.xsdService.selectedcfg = selxsd;
        this.xsdService.selectedxsd = selxsd["project"];
        this.xmlService.selectedxmldoc = i;
        this.xmlService.selectedxml = i["name"];
        this.xmlService.seldocvalid = false;
        this.xsdService.validate = true;
        //console.log("selectInstance " + i.name);
        if (this.xsdService.xmlResource(this.xsdService.selectedxsd, this.xmlService.selectedxml)) {
            if (this.xsdService.validate) {
                this.xsdService.validateXml(this.xsdService.xmldata[this.xsdService.selectedxsd][this.xmlService.selectedxml], 'iepxsd').subscribe((vx => { return vx; }));
            }
            return this.xsdService.xmldata[this.xsdService.selectedxsd][this.xmlService.selectedxml];
        }
        else {
            this.xsdService.iepdXMLResource(this.xsdService.selectedxsd, this.xmlService.selectedxml).subscribe((docd => {
                if (this.xsdService.validate) {
                    this.xsdService.validateXml(docd, 'iepxsd').subscribe((vx => { return vx; }));
                }
                return docd;
            }));
        }
    }
    selectTestData(selxsd, d) {
        this.xsdService.selectedcfg = selxsd;
        this.xsdService.selectedxsd = selxsd["project"];
        this.xsdService.seldocvalid = false;
        this.xsdService.validate = false;
        this.xmlService.selectedxmldoc = d;
        this.xmlService.selectedxml = d["name"];
        if (this.xsdService.xmlResource(this.xsdService.selectedxsd, this.xmlService.selectedxml)) {
            return this.xsdService.xmldata[this.xsdService.selectedxsd][this.xmlService.selectedxml];
        }
        else {
            this.xsdService.iepdXMLResource(this.xsdService.selectedxsd, this.xmlService.selectedxml).subscribe((docd => { return docd; }));
        }
    }
    selectXsd(selxsd, s) {
        this.xsdService.selectedcfg = selxsd;
        this.xsdService.selectedxsd = selxsd["project"];
        this.xsdService.seldocvalid = false;
        this.xsdService.validate = true;
        this.xmlService.selectedxmldoc = s;
        this.xmlService.selectedxml = s["name"];
        if (this.xsdService.xmlResource(this.xsdService.selectedxsd, this.xmlService.selectedxml)) {
            if (this.xsdService.validate) {
                this.xsdService.validateXml(this.xsdService.xmldata[this.xsdService.selectedxsd][this.xmlService.selectedxml], 'xmlschemaxsd').subscribe((vx => { return vx; }));
            }
            return this.xsdService.xmldata[this.xsdService.selectedxsd][this.xmlService.selectedxml];
        }
        else {
            this.xsdService.iepdXMLResource(this.xsdService.selectedxsd, this.xmlService.selectedxml).subscribe((docd => {
                if (this.xsdService.validate) {
                    this.xsdService.validateXml(docd, 'xmlschemaxsd').subscribe((vx => { return vx; }));
                }
                return docd;
            }));
        }
    }
    selectXsl(selxsd, s) {
        this.xsdService.selectedcfg = selxsd;
        this.xsdService.selectedxsd = selxsd["project"];
        this.xsdService.seldocvalid = false;
        this.xsdService.validate = true;
        this.xmlService.selectedxmldoc = s;
        this.xmlService.selectedxml = s["name"];
        if (this.xsdService.xmlResource(this.xsdService.selectedxsd, this.xmlService.selectedxml)) {
            if (this.xsdService.validate) {
                this.xsdService.validateXml(this.xsdService.xmldata[this.xsdService.selectedxsd][this.xmlService.selectedxml], 'xsltxsd').subscribe((vx => { return vx; }));
            }
            return this.xsdService.xmldata[this.xsdService.selectedxsd][this.xmlService.selectedxml];
        }
        else {
            this.xsdService.iepdXMLResource(this.xsdService.selectedxsd, this.xmlService.selectedxml).subscribe((docd => {
                if (this.xsdService.validate) {
                    this.xsdService.validateXml(docd, 'xsltxsd').subscribe((vx => { return vx; }));
                }
                return docd;
            }));
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
};
InstancesComponent = __decorate([
    Component({
        selector: 'app-instances',
        templateUrl: './instances.component.html',
        styleUrls: ['./instances.component.css']
    }),
    __metadata("design:paramtypes", [XmlService, XsdService])
], InstancesComponent);
export { InstancesComponent };
