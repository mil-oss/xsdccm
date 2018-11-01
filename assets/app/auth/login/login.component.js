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
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { AlertService } from './../alerts/alert.service';
var bcrypt = require("bcryptjs");
let LoginComponent = class LoginComponent {
    constructor(route, router, authenticationService, alertService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(user => {
            this.alertService.success("Authenticated", true);
            this.router.navigate([this.returnUrl]);
            this.loading = false;
        }, error => {
            console.log(error);
            this.alertService.error(error.error.message);
            this.loading = false;
        });
    }
};
LoginComponent = __decorate([
    Component({
        moduleId: module.id.toString(),
        templateUrl: 'login.component.html'
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        Router,
        AuthService,
        AlertService])
], LoginComponent);
export { LoginComponent };
