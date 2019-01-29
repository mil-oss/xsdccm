import { Component, OnInit } from "@angular/core";
import { XsdService } from "./../xsdccm/xsd.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {

  files: any = []
  svces: any = []
  configs: any = []

  constructor(public xsdService: XsdService) {
  }

  fName(path) {
    return path.substr(path.lastIndexOf('/') + 1)
  }

  ngOnInit() {

  }
}