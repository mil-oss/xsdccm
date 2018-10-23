import { Component, OnInit } from '@angular/core';
import { XsdService } from "./../../xsd.service";
import { XsdSimpleType } from "./../../xsd.model";
import { XsdEnumeration } from "./../../xsd.model";
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'app-simpletype',
  templateUrl: './simpletype.component.html',
  styleUrls: ['./../../xsd.component.css']
})
export class SimpletypeComponent implements OnInit {

  stypes: XsdSimpleType[];
  stype: XsdSimpleType;
  enums: XsdEnumeration[];
  editDoc: string;
  editComment: string;
  editLabel: string;
  editVar: string;

  constructor(private xsdService: XsdService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      //console.log(p.name);
      if (this.xsdService.xsd) {
        this.stype = this.xsdService.selSimpleType(p.name);
        if (this.stype[this.xsdService.selected].enumerations) {
          this.enums = [];
          for (var s in this.xsdService.nodeSelected.enumerations) {
            this.enums.push(this.xsdService.nodeSelected.enumerations[s]);
          }
        }
      } else {
          this.stype = this.xsdService.selSimpleType(p.name);
          if (this.stype.enumerations) {
            this.enums = [];
            for (var s in this.xsdService.nodeSelected.enumerations) {
              this.enums.push(this.xsdService.nodeSelected.enumerations[s]);
            }
          }
        }
      });
  }

  selectedStype() {
    if (this.xsdService.nodeSelected) {
      if (this.xsdService.nodeSelected.xsdnode === 'simpleType') {
        this.stype = this.xsdService.nodeSelected;
        this.enums = [];
        for (var s in this.xsdService.nodeSelected.enumerations) {
          this.enums.push(this.xsdService.nodeSelected.enumerations[s]);
        }
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  editst() {
    return this.xsdService.editMode;
  }

  cancel() {
    this.stype = this.xsdService.nodeSelected;
    this.doedit();
    this.xsdService.editMode = false;
  }

  doedit() {
    this.editDoc = this.stype.documentation;
    this.editLabel = this.stype.appinfo.SimpleType.name;
    this.editVar = this.stype.appinfo.SimpleType.mapvar;
    this.editComment = this.stype.appinfo.SimpleType.comment;
    this.xsdService.editMode = true;
  }
  
  submit() {
    this.stype.documentation=this.editDoc;
    this.stype.appinfo.SimpleType.name=this.editLabel;
    this.stype.appinfo.SimpleType.mapvar=this.editVar;
    this.stype.appinfo.SimpleType.comment=this.editComment;
    this.xsdService.editMode = false;
  }

  getJSON(s: any) {
    return JSON.stringify(s);
  }

}
