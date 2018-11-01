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
import { XsdService } from "./../xsdccm/xsd.service";
let LicensesComponent = class LicensesComponent {
    constructor(xsdService) {
        this.xsdService = xsdService;
    }
    fName(path) {
        return path.split('\\').pop().split('/').pop();
    }
    getRes(filename) {
        //return this.xsdService.licensehost+this.fName(filename);
    }
    ngOnInit() {
    }
};
LicensesComponent = __decorate([
    Component({
        selector: "licenses-home",
        templateUrl: "./licenses.component.html",
        styleUrls: ["./licenses.component.css"]
    }),
    __metadata("design:paramtypes", [XsdService])
], LicensesComponent);
export { LicensesComponent };
