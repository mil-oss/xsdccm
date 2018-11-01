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
import { XsdService } from '../xsd.service';
let XsdviewComponent = class XsdviewComponent {
    constructor(xsdService) {
        this.xsdService = xsdService;
    }
    ngOnInit() {
        this.ixsdjson = this.xsdService.jsondata["iep_xsd.json"];
        //this.rootel = this.xsdService.xsd.iepXsd.root;
        //this.ixsdjson = this.xsdService.jsondata["ref_xsd.json"];
        //this.rootel = this.xsdService.xsds.refXsd.root;
        console.log(this.rootel);
    }
    rootList() {
        var eltype = this.ixsdjson[this.rootel].type;
        var a = this.nodeArray(this.ixsdjson[eltype].sequence);
        return a;
    }
    childList(n) {
        if (n.ref === 'Choice') {
            //console.log(n);
            var a = this.nodeArray(n.sequence);
            return a;
        }
        else if (n.ref) {
            if (this.ixsdjson[n.ref].type) {
                var eltype = this.ixsdjson[n.ref].type;
                var a = this.nodeArray(this.ixsdjson[eltype].sequence);
                return a;
            }
            else {
                console.log(n);
            }
        }
    }
    nodeArray(n) {
        var a = [];
        for (var i in n) {
            if (i === 'choice') {
                a.push({ ref: "Choice", sequence: n[i] });
            }
            else {
                a.push(n[i]);
            }
        }
        return a;
    }
    hasChildren(n) {
        if (n.ref === 'Choice') {
            return true;
        }
        else if (n.ref) {
            if (this.ixsdjson[n.ref].type) {
                var eltype = this.ixsdjson[n.ref].type;
                if (this.ixsdjson[eltype].sequence) {
                    return true;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
};
XsdviewComponent = __decorate([
    Component({
        selector: 'app-xsdview',
        templateUrl: './xsdview.component.html',
        styleUrls: ['./xsdview.component.css']
    }),
    __metadata("design:paramtypes", [XsdService])
], XsdviewComponent);
export { XsdviewComponent };
