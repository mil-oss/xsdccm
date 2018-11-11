
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

  }

  getXsdJson() {
    this.xsdService.selectedcfg = this.xsdService.Configs[this.xsdService.selectedxsd];
    if (typeof this.xsdService.selectedcfg !== "undefined") {
      if (this.xsdService.jsonResource(this.xsdService.selectedcfg["project"], "iepxsdjson")) {
        if (typeof this.stypes !=='undefined') {
          this.stypes[this.xsdService.selectedxsd] = this.xsdService.simpletypes[this.xsdService.selectedxsd];
          this.ctypes[this.xsdService.selectedxsd] = this.xsdService.complextypes[this.xsdService.selectedxsd];
          this.elements[this.xsdService.selectedxsd] = this.xsdService.elements[this.xsdService.selectedxsd];
        }
      }else{
      this.xsdService.iepdJsonResource(this.xsdService.selectedcfg["project"], "iepxsdjson").subscribe(
        (xsdj => {
          this.xsdService.getComponents(xsdj)
          if (typeof this.stypes !=='undefined') {
            this.stypes[this.xsdService.selectedxsd] = this.xsdService.simpletypes[this.xsdService.selectedxsd];
            this.ctypes[this.xsdService.selectedxsd] = this.xsdService.complextypes[this.xsdService.selectedxsd];
            this.elements[this.xsdService.selectedxsd] = this.xsdService.elements[this.xsdService.selectedxsd];
          }
        }))
      }
    };
  };
}

