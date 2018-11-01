var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { XsdService } from "./../xsd.service";
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
let ComplextypesComponent = class ComplextypesComponent {
    constructor(xsdService, router, route) {
        this.xsdService = xsdService;
        this.router = router;
        this.route = route;
    }
    ngOnInit() {
    }
    ctvaluefilter() {
        var txt = this.xsdService.txtFilter;
        var result = [];
        var mlist = this.xsdService.complextypes[this.xsdService.selectedxsd];
        if (txt === "" || typeof txt === "undefined") {
            return mlist;
        }
        else {
            for (var key in mlist) {
                if (typeof mlist[key] !== "undefined") {
                    if (typeof mlist[key].name !== "undefined") {
                        if (mlist[key].name.toLowerCase().indexOf(txt.toLowerCase()) > -1) {
                            result.push(mlist[key]);
                        }
                    }
                }
            }
            return result;
        }
    }
    selectCtype(node) {
        this.xsdService.selComplexType(node.name);
        this.router.navigate(['xsd/complextype', node.name]);
    }
    ;
};
ComplextypesComponent = __decorate([
    Component({
        selector: "app-complextypes",
        templateUrl: "./complextypes.component.html",
        styleUrls: ["./../xsd.component.css"],
    }),
    __metadata("design:paramtypes", [XsdService, Router, ActivatedRoute])
], ComplextypesComponent);
export { ComplextypesComponent };
