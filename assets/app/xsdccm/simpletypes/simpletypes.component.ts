import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { XsdService } from "./../xsd.service";
import { XsdSimpleType } from "../xsd.model";
@Component({
  selector: "app-simpletypes",
  templateUrl: "./simpletypes.component.html",
  styleUrls: ["./../xsd.component.css"]

})
export class SimpletypesComponent implements OnInit {
  stypes: XsdSimpleType[];
  tabview: string;
  activeTabs: string[];

  constructor(public xsdService: XsdService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.stypes = this.xsdService.simpletypes;
  }

  stvaluefilter() {
    var txt = this.xsdService.txtFilter;
    var result = [];
    var mlist = this.xsdService.simpletypes;
    this.stypes = this.xsdService.simpletypes;
    if (txt === "" || typeof txt === "undefined") {
      return mlist;
    } else {
      for (var key in mlist) {
        if (typeof mlist[key] !== "undefined") {
          if (typeof mlist[key].name !== "undefined") {
            if (mlist[key].name.toLowerCase().indexOf(txt.toLowerCase()) > -1) {
              result.push(mlist[key]);
            }
          }
        }
      }
      return result;
    }
  }
  
  selectStype(node: XsdSimpleType) {
    this.xsdService.selSimpleType(node.name);
    this.router.navigate(['xsd/simpletype', node.name]);
  };

}