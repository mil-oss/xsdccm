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
import { Router } from "@angular/router";
import { XsdService } from './xsd.service';
let XsdComponent = class XsdComponent {
    constructor(xsdService, router) {
        this.xsdService = xsdService;
        this.router = router;
        this.getXsdJson();
    }
    ngOnInit() {
    }
    getXsdJson() {
        this.xsdService.selectedcfg = this.xsdService.Configs[this.xsdService.selectedxsd];
        if (typeof this.xsdService.selectedcfg !== "undefined") {
            if (this.xsdService.jsonResource(this.xsdService.selectedcfg["project"], "iepxsdjson")) {
                if (typeof this.stypes !== 'undefined') {
                    this.stypes[this.xsdService.selectedxsd] = this.xsdService.simpletypes[this.xsdService.selectedxsd];
                    this.ctypes[this.xsdService.selectedxsd] = this.xsdService.complextypes[this.xsdService.selectedxsd];
                    this.elements[this.xsdService.selectedxsd] = this.xsdService.elements[this.xsdService.selectedxsd];
                }
            }
            else {
                this.xsdService.iepdJsonResource(this.xsdService.selectedcfg["project"], "iepxsdjson").subscribe((xsdj => {
                    this.xsdService.getComponents(xsdj);
                    if (typeof this.stypes !== 'undefined') {
                        this.stypes[this.xsdService.selectedxsd] = this.xsdService.simpletypes[this.xsdService.selectedxsd];
                        this.ctypes[this.xsdService.selectedxsd] = this.xsdService.complextypes[this.xsdService.selectedxsd];
                        this.elements[this.xsdService.selectedxsd] = this.xsdService.elements[this.xsdService.selectedxsd];
                    }
                }));
            }
        }
        ;
    }
    ;
};
XsdComponent = __decorate([
    Component({
        selector: 'app-xsd',
        templateUrl: './xsd.component.html',
        styleUrls: ['./xsd.component.css']
    }),
    __metadata("design:paramtypes", [XsdService, Router])
], XsdComponent);
export { XsdComponent };
