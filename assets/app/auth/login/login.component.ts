import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { AlertService } from './../alerts/alert.service';
var bcrypt = require("bcryptjs");

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                user => {
                    this.alertService.success("Authenticated",true);
                    this.router.navigate([this.returnUrl]);
                    this.loading = false;
                },
                error => {
                    console.log(error);
                    this.alertService.error(error.error.message);
                    this.loading = false;
                }
            );
    }
}
