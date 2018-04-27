
import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "xsdccm-app",
  templateUrl: "./app.component.html"
})
export class AppComponent {

  constructor(public router: Router) {
    router.navigateByUrl("/");
  }
}