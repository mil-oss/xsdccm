var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { XsdService } from "../xsdccm/xsd.service";
let DocpageComponent = class DocpageComponent {
    constructor(xsdService) {
        this.xsdService = xsdService;
        this.files = [];
        this.svces = [];
        this.configs = [];
        this.htmlSnippet = "<script>safeCode()</script>";
    }
    fName(path) {
        return path.substr(path.lastIndexOf('/') + 1);
    }
    ngOnInit() {
    }
    getDocs(c) {
        //var r = this.xsdService.iepdXMLResource(c['project'], 'dochtml');
        var xsdsel = c['project'];
        if (!this.xsdService.xmldata[xsdsel]) {
            this.xsdService.xmldata[xsdsel] = [];
        }
        if (this.xsdService.xmldata[xsdsel]['dochtml']) {
            return this.getBody(this.xsdService.xmldata[xsdsel]['dochtml']);
        }
        else {
            this.xsdService.iepdXMLResource(xsdsel, 'dochtml').subscribe((docd => {
                return this.getBody(docd);
            }));
        }
    }
    getBody(d) {
        let parser = new DOMParser();
        let parsedHtml = parser.parseFromString(d, 'text/html');
        if (parsedHtml.querySelectorAll("body")) {
            let elements = parsedHtml.querySelectorAll("body");
            return elements[0].innerHTML;
        }
    }
};
DocpageComponent = __decorate([
    Component({
        selector: "app-docpage",
        templateUrl: "./docpage.component.html",
        styleUrls: ["./docpage.component.css"]
    }),
    __metadata("design:paramtypes", [XsdService])
], DocpageComponent);
export { DocpageComponent };
