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
let ProfileComponent = class ProfileComponent {
    constructor(userService) {
        this.userService = userService;
        this.selUser = this.userService.selectedUser;
        this.userfields = [
            "username",
            "password",
            "userId",
            "email",
            "firstName",
            "lastName",
            "phone",
            "organization",
            "parentOrganization",
            "sponsorOrganization",
            "sponsorName",
            "sponsorId",
            "sponsorEmail",
            "sponsorPhone",
            "nationality",
            "mil_service",
            "remote_addr",
            "publicKey",
            "privateKey",
            "ssl_client_fingerprint",
            "ssl_client_raw_cert",
            "ssl_client_serial",
            "ssl_client_s_dn",
            "ssl_client_i_dn",
            "ssl_client_v_start",
            "ssl_client_v_end",
            "ssl_session_id",
            "ssl_client_verify",
            "ssl_session_reuse"
        ];
        this.usermap = {
            username: "User Name",
            userId: "User Id",
            email: "Email",
            firstName: "First Name",
            lastName: "Last Name",
            phone: "Phone",
            organization: "Organization",
            parentOrganization: "Parent Org",
            sponsorOrganization: "Sponsor Org",
            sponsorName: "Sponsor Name",
            sponsorId: "Sponsor Id",
            sponsorEmail: "Sponsor Email",
            sponsorPhone: "Sponsor Phone",
            nationality: "Nationality",
            mil_service: "Mil Service",
            remote_addr: "Remote Addr",
            publicKey: "Public Key",
            privateKey: "Private Key",
            ssl_client_fingerprint: "SSL Client Fprint",
            ssl_client_raw_cert: "SSL Client Cert",
            ssl_client_serial: "SSL Client Serial",
            ssl_client_s_dn: "SSL Client S DN",
            ssl_client_i_dn: "SSL Client I DN",
            ssl_client_v_start: "SSL Client V Start",
            ssl_client_v_end: "SSL Client V End",
            ssl_session_id: "SSL Session Id",
            ssl_client_verify: "SSL Client Verify",
            ssl_session_reuse: "SSL Session Reuse"
        };
    }
    ngOnInit() {
    }
    displayStr(s) {
        if (s) {
            if (s.length > 28) {
                return s.substring(0, 28) + "...";
            }
            else {
                return s;
            }
        }
    }
};
ProfileComponent = __decorate([
    Component({
        selector: 'app-profile',
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.css']
    }),
    __metadata("design:paramtypes", [UserService])
], ProfileComponent);
export { ProfileComponent };
