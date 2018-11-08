import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { Router } from '@angular/router';
import { User } from './../../auth/models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  allusers: any;
  txtFilter: string;
  selectedUser: {};
  selUser: string;

  constructor(public userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().subscribe(
      users => {
        this.allusers = users;
        //console.log(this.allusers);
      },
      error => {
        console.log(error);
      }
    );
  }

  uvaluefilter() {
    var txt = this.txtFilter;
    var result = [];
    var ulist = this.allusers;
    if (txt === "" || typeof txt === "undefined") {
      return ulist;
    } else {
      for (var key in ulist) {
        var add = false;
        if (typeof ulist[key] !== "undefined") {
          var usr = ulist[key];
          for (var a in usr) {
            if (usr[a].length > 0) {
              if (usr[a].toLowerCase().indexOf(txt.toLowerCase()) > -1) {
                add=true;
              }
            }
          }
          if(add){
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

}
