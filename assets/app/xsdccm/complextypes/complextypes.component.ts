import { XsdService } from "./../xsd.service";
import { Component, OnInit } from "@angular/core";
import { Router,ActivatedRoute, Params } from '@angular/router';
import { XsdComplexType } from "../xsd.model";
@Component({
  selector: "app-complextypes",
  templateUrl: "./complextypes.component.html",
  styleUrls: ["./../xsd.component.css"],
})
export class ComplextypesComponent implements OnInit {
  ctypes: XsdComplexType[];

  constructor(public xsdService: XsdService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
  }


  ctvaluefilter() {
    var txt = this.xsdService.txtFilter;
    var result = [];
    var mlist = this.xsdService.complextypes[this.xsdService.selectedxsd];
    if (txt === "" || typeof txt=== "undefined") {
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
  
    selectCtype(node: XsdComplexType) {
      this.xsdService.selComplexType(node.name);
      this.router.navigate(['xsd/complextype', node.name]);
    };
  
  }

