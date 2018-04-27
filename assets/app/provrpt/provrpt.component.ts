import { Component, OnInit } from "@angular/core";
import { XsdService } from "./../xsdccm/xsd.service";

@Component({
  selector: "app-home",
  templateUrl: "./provrpt.component.html",
  styleUrls: ["./provrpt.component.css"]
})
export class ProvrptComponent {

  constructor(public xsdService: XsdService) {

  }

  fName(path:string){
    return path.split('\\').pop().split('/').pop();
  }

  getRes(filename:string){
    return this.xsdService.iepdhost+this.fName(filename);
  }

  ngOnInit() {

  }
}
