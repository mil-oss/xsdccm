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
import { Router } from "@angular/router";
import { XsdService } from "./../xsdccm/xsd.service";
let HeaderComponent = class HeaderComponent {
    constructor(xsdService, router) {
        this.xsdService = xsdService;
        this.router = router;
        this.tabSelected = "home";
    }
    ngOnInit() {
    }
    isLoggedIn() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        else {
            return false;
        }
    }
    selTab(n) {
        this.tabSelected = n;
    }
    ;
    isSel(n) {
        if (this.tabSelected === n) {
            return true;
        }
        else {
            return false;
        }
    }
    ;
    isAdmin() {
        if (localStorage.getItem('currentUser')) {
            var t = localStorage.getItem('currentUser');
            var d = this.parseJwt(t);
            if (d.email === "james@neushul.net") {
                return true;
            }
        }
        return false;
    }
    parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    ;
};
HeaderComponent = __decorate([
    Component({
        selector: "app-header",
        templateUrl: "./header.component.html",
        styleUrls: ["./header.component.css"]
    }),
    __metadata("design:paramtypes", [XsdService, Router])
], HeaderComponent);
export { HeaderComponent };
