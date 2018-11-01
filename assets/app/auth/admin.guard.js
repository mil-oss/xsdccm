var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
let AdminGuard = class AdminGuard {
    constructor(router, authSvce) {
        this.router = router;
        this.authSvce = authSvce;
    }
    canActivate(route, state) {
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
AdminGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Router, AuthService])
], AdminGuard);
export { AdminGuard };
