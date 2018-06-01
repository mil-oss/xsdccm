import { Component, OnInit } from '@angular/core';
import { XsdService } from '../xsd.service';

@Component({
  selector: 'app-xsdview',
  templateUrl: './xsdview.component.html',
  styleUrls: ['./xsdview.component.css']
})
export class XsdviewComponent implements OnInit {

  refjson: any;
  ixsdjson: any;
  rootel: string;

  constructor(public xsdService: XsdService) { }

  ngOnInit() {
    this.xsdService.xsdmode = false;
    //this.ixsdjson = this.xsdService.jsondata["iep_xsd.json"];
    //this.rootel = this.xsdService.xsds.iepXsd.root;
    this.ixsdjson = this.xsdService.jsondata["ref_xsd.json"];
    this.rootel = this.xsdService.xsds.refXsd.root;
    console.log(this.rootel);
  }

  rootList() {
    var eltype = this.ixsdjson[this.rootel].type;
    var a = this.nodeArray(this.ixsdjson[eltype].sequence);
    return a;
  }

  childList(n) {
    if (n.ref === 'Choice') {
      //console.log(n);
      var a = this.nodeArray(n.sequence);
      return a;
    } else if (n.ref) {
      if (this.ixsdjson[n.ref].type) {
        var eltype = this.ixsdjson[n.ref].type;
        var a = this.nodeArray(this.ixsdjson[eltype].sequence);
        return a;
      } else {
        console.log(n);
      }
    }
  }

  nodeArray(n) {
    var a = [];
    for (var i in n) {
      if (i === 'choice') {
        a.push({ ref: "Choice", sequence: n[i] });
      } else {
        a.push(n[i]);
      }
    }
    return a;
  }

  hasChildren(n) {
    if (n.ref === 'Choice') {
      return true;
    } else if (n.ref) {
      if (this.ixsdjson[n.ref].type) {
        var eltype = this.ixsdjson[n.ref].type;
        if (this.ixsdjson[eltype].sequence) {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
