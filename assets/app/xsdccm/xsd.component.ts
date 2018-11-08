
import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgModel } from '@angular/forms';
import { XsdService } from './xsd.service';
import { SimpletypesComponent } from './simpletypes/simpletypes.component';
import { ComplextypesComponent } from './complextypes/complextypes.component';
import { ElementsComponent } from './elements/elements.component';
import { SimpletypeComponent } from './simpletypes/simpletype/simpletype.component';
import { ComplextypeComponent } from './complextypes/complextype/complextype.component';
import { ElementComponent } from './elements/element/element.component';
import { XsdSchema, XsdSimpleType, XsdComplexType, XsdElement } from "./xsd.model";
@Component({
  selector: 'app-xsd',
  templateUrl: './xsd.component.html',
  styleUrls: ['./xsd.component.css']
})
export class XsdComponent implements OnInit {
  xsdschema: XsdSchema;
  stypes: XsdSimpleType[];
  ctypes: XsdComplexType[];
  elements: XsdElement[];
  nodeSelected: string;
  iepdxsd: any;
  optionList: any[] = this.xsdService.toArray(this.xsdService.xsds);

  constructor(public xsdService: XsdService, public router: Router) {
  }

  ngOnInit() {
    this.xsdService.xsdmode = true;
    this.xsdService.selected = "iepdXsd";
    this.getXsdJson();
  }

  getXsdJson() {
    console.log(this.xsdService.selected);
    this.xsdService.selectedxsd = this.xsdService.xsds[this.xsdService.selected];
    if (typeof this.xsdService.selected !== "undefined") {
      var xsdjson;
      if(this.xsdService.selected=="iepdXsd"){
        xsdjson = this.xsdService.jsondata["iep_xsd.json"];
      }else{
        xsdjson = this.xsdService.jsondata["ref_xsd.json"];
      }
      this.xsdService.getComponents(xsdjson);
      this.stypes = this.xsdService.simpletypes;
      this.ctypes = this.xsdService.complextypes;
      this.elements = this.xsdService.elements;
    };
  }
}
