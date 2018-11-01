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
let ProvrptComponent = class ProvrptComponent {
    constructor(xsdService) {
        this.xsdService = xsdService;
        this.provRpts = [];
    }
    getReport(xsdsel) {
        if (this.xsdService.jsonResource(xsdsel, 'provenancereportjson')) {
            return this.xsdService.jsondata[xsdsel]['provenancereportjson'];
        }
        else {
            this.xsdService.iepdJsonResource(xsdsel, 'provenancereportjson').subscribe((docd => {
                return docd;
            }));
        }
    }
    toArray(n) {
        var a = [];
        for (var i in n) {
            a.push(n[i]);
        }
        console.log(a);
        return a;
    }
    fName(path) {
        return path.split('\\').pop().split('/').pop();
    }
    getRes(res, fpath) {
        var n = this.fName(fpath);
        for (var r in res.resources) {
            if (res.resources[r].filename === n) {
                return "file/" + res.resources[r].name;
            }
        }
    }
    ngOnInit() {
    }
};
ProvrptComponent = __decorate([
    Component({
        selector: "app-home",
        templateUrl: "./provrpt.component.html",
        styleUrls: ["./provrpt.component.css"]
    }),
    __metadata("design:paramtypes", [XsdService])
], ProvrptComponent);
export { ProvrptComponent };
