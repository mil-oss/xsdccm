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
import { XsdService } from '../../../xsdccm/xsd.service';
import { XmlService } from '../../xml.service';
let InstanceComponent = class InstanceComponent {
    constructor(xmlService, xsdService) {
        this.xmlService = xmlService;
        this.xsdService = xsdService;
        this.lt = '<';
        this.ct = '</';
        this.rt = '>';
    }
    ngOnInit() {
    }
    xmlView() {
        this.xmlService.viewmode = "xml";
    }
    jsonView() {
        this.xmlService.viewmode = "json";
        this.xmlService.rawview = true;
    }
    getAttributes(atts) {
        var str = "";
        for (var a in atts) {
            str = str + " " + a + "=\"" + atts[a] + "\"";
        }
        return str;
    }
    tog(val) {
        if (this.xmlService.isOpenTab(val)) {
            return "-";
        }
        else {
            return "+";
        }
    }
};
InstanceComponent = __decorate([
    Component({
        selector: 'app-instance',
        templateUrl: './instance.component.html',
        styleUrls: ['./../instances.component.css', 'instance.component.css']
    }),
    __metadata("design:paramtypes", [XmlService, XsdService])
], InstanceComponent);
export { InstanceComponent };
