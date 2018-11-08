import { Component, OnInit } from "@angular/core";
import { XsdService } from "./../xsdccm/xsd.service";

@Component({
  selector: "licenses-home",
  templateUrl: "./licenses.component.html",
  styleUrls: ["./licenses.component.css"]
})
export class LicensesComponent {

  constructor(public xsdService: XsdService) {

  }

  fName(path:string){
    return path.split('\\').pop().split('/').pop();
  }

  getRes(filename:string){
    return this.xsdService.licensehost+this.fName(filename);
  }

  ngOnInit() {

  }
}
