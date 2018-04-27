import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService} from './../alerts/alert.service';
import { UserService} from './../user.service';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any={};
    loading:boolean = false;
    longform:boolean= false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration Successful', true);
                    this.router.navigate(['/auth/login']);
                },
                error => {
                    console.log(error);
                    this.alertService.error(error.error);
                    this.loading = false;
                });
    }
}
