
import { XsdService } from "./../xsd.service";
import { Component, OnInit } from "@angular/core";
import { Router,ActivatedRoute, Params } from '@angular/router';
import { XsdElement } from "../xsd.model";
@Component({
  selector: "app-elements",
  templateUrl: "./elements.component.html",
  styleUrls: ["./../xsd.component.css"]
})
export class ElementsComponent implements OnInit {

  elements: XsdElement[];

  constructor(public xsdService: XsdService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
  }


  elvaluefilter() {
    var txt = this.xsdService.txtFilter;
    var result = [];
    var mlist = this.xsdService.elements[this.xsdService.selectedxsd];
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

  selectEl(node:XsdElement) {
    this.xsdService.selElement(node.name);
    this.router.navigate(['xsd/element', node.name]);
  };

}
