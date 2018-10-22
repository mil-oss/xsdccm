
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
  stypes: XsdSimpleType[][];
  ctypes: XsdComplexType[][];
  elements: XsdElement[][];
  nodeSelected: string;
  iepdxsd: any;

  constructor(public xsdService: XsdService, public router: Router) {
    this.getXsdJson();
  }

  ngOnInit() {
    this.xsdService.xsdmode = true;
    this.xsdService.selected = "spdx-doc";
  }

  getXsdJson() {
    console.log(this.xsdService.selected);
    this.xsdService.selectedxsd = this.xsdService.Configs[this.xsdService.selected];
    if (typeof this.xsdService.selected !== "undefined") {
      this.xsdService.iepdJsonResource(this.xsdService.selected, "iepxsdjson");
      this.xsdService.getComponents(this.xsdService.jsondata[this.xsdService.selected]["iepxsdjson"]);
     /*  if (!this.stypes[this.xsdService.selected]) {
        this.stypes[this.xsdService.selected] = []
        this.ctypes[this.xsdService.selected] = []
        this.elements[this.xsdService.selected] = []
      } */
      this.stypes[this.xsdService.selected] = this.xsdService.simpletypes[this.xsdService.selected];
      this.ctypes[this.xsdService.selected] = this.xsdService.complextypes[this.xsdService.selected];
      this.elements[this.xsdService.selected] = this.xsdService.elements[this.xsdService.selected];
    };
  };
}

