import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selUser: any = this.userService.selectedUser;
  userfields: string[] = [
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
  ]
  usermap: any = {
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
  }

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  displayStr(s) {
    if (s) {
      if (s.length > 28) {
        return s.substring(0, 28) + "...";
      } else {
        return s;
      }
    }
  }

}
