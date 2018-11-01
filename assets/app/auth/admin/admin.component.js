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
import { UserService } from './../user.service';
import { Router } from '@angular/router';
let AdminComponent = class AdminComponent {
    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    ngOnInit() {
        this.getUsers();
    }
    getUsers() {
        this.userService.getAll().subscribe(users => {
            this.allusers = users;
            //console.log(this.allusers);
        }, error => {
            console.log(error);
        });
    }
    uvaluefilter() {
        var txt = this.txtFilter;
        var result = [];
        var ulist = this.allusers;
        if (txt === "" || typeof txt === "undefined") {
            return ulist;
        }
        else {
            for (var key in ulist) {
                var add = false;
                if (typeof ulist[key] !== "undefined") {
                    var usr = ulist[key];
                    for (var a in usr) {
                        if (usr[a].length > 0) {
                            if (usr[a].toLowerCase().indexOf(txt.toLowerCase()) > -1) {
                                add = true;
                            }
                        }
                    }
                    if (add) {
                        result.push(ulist[key]);
                    }
                }
            }
            return result;
        }
    }
    selectUser(u) {
        this.selUser = u.email;
        this.userService.selectedUser = u;
        // console.log(this.userService.selectedUser);
    }
    uSelected(u) {
        return u.email === this.selUser;
    }
};
AdminComponent = __decorate([
    Component({
        selector: 'app-admin',
        templateUrl: './admin.component.html',
        styleUrls: ['./admin.component.css']
    }),
    __metadata("design:paramtypes", [UserService, Router])
], AdminComponent);
export { AdminComponent };
