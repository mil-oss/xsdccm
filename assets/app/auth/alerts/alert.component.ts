import { Component, OnInit } from '@angular/core';

import { AlertService } from './alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    alertmsg: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(alertmessage => {
            if (typeof alertmessage !== "undefined") {
                console.log(alertmessage);
                this.alertmsg = alertmessage;
            }
        });
    }
}