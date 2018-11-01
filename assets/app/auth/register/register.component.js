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
import { Router } from '@angular/router';
import { AlertService } from './../alerts/alert.service';
import { UserService } from './../user.service';
let RegisterComponent = class RegisterComponent {
    constructor(router, userService, alertService) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
        this.longform = false;
    }
    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(data => {
            this.alertService.success('Registration Successful', true);
            this.router.navigate(['/auth/login']);
        }, error => {
            console.log(error);
            this.alertService.error(error.error);
            this.loading = false;
        });
    }
};
RegisterComponent = __decorate([
    Component({
        moduleId: module.id.toString(),
        templateUrl: 'register.component.html'
    }),
    __metadata("design:paramtypes", [Router,
        UserService,
        AlertService])
], RegisterComponent);
export { RegisterComponent };
