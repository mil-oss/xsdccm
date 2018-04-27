import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }
  tabSelected="home"
  ngOnInit() {

  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    } else {
      return false;
    }
  }
  selTab(n) {
    this.tabSelected = n;
  };

  isSel(n) {
    if (this.tabSelected === n) {
      return true;
    }else{
      return false;
    }
  };

  isAdmin() {
    if (localStorage.getItem('currentUser')) {
      var t = localStorage.getItem('currentUser');
      var d = this.parseJwt(t);
      if (d.email === "james@neushul.net") {
        return true;
      }
    }
    return false;
  }
  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };
}
