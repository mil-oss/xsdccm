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
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
    }
    login(email, password) {
        return this.http.post('/auth/authenticate', { email: email, password: password })
            .map(authuser => {
            // login successful if there's a jwt token in the response
            if (authuser && authuser.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', authuser.token);
                this.user = authuser;
            }
        });
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpClient])
], AuthService);
export { AuthService };
