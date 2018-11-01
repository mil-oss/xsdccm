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
let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.selectedUser = {};
    }
    getAll() {
        console.log('getAll');
        return this.http.get('/auth/users');
    }
    create(userinfo) {
        return this.http.post('/auth/adduser', userinfo);
    }
    update(user) {
        return this.http.put('/auth/updateuser/' + user.email, user);
    }
    delete(user) {
        return this.http.delete('/auth/deleteuser/' + user.email);
    }
    verify(user, resource) {
        return this.http.get('/auth/verify/' + user.email);
    }
};
UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpClient])
], UserService);
export { UserService };
