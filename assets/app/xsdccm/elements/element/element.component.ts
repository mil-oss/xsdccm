import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap'
import { XsdService } from "./../../xsd.service";
import { Component, OnInit } from "@angular/core";
import { XsdElement } from "../../xsd.model";

@Component({
  selector: "app-element",
  templateUrl: "./element.component.html",
  styleUrls: ['./../../xsd.component.css']
})

export class ElementComponent implements OnInit {
  elmnts: XsdElement[];
  elmnt: XsdElement;
  editDoc: string;
  editComment: string;
  editLabel: string;

  editVar: string;
  params: string[];
  selname: string;

  constructor(private xsdService: XsdService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
        this.elmnt = this.xsdService.selElement(p.name);
    })
  }

  editel() {
    return this.xsdService.editMode;
  }

  doedit() {
    this.editDoc = this.elmnt.documentation;
    this.editLabel = this.elmnt.appinfo.Element.name;
    this.editVar = this.elmnt.appinfo.Element.mapvar;
    this.editComment = this.elmnt.appinfo.Element.comment;
    this.xsdService.editMode = true;
  }

  cancel() {
    this.elmnt = this.xsdService.nodeSelected;
    this.doedit();
    this.xsdService.editMode = false;
  }

  submit() {
    this.elmnt.documentation = this.editDoc;
    this.elmnt.appinfo.Element.name = this.editLabel;
    this.elmnt.appinfo.Element.mapvar = this.editVar;
    this.elmnt.appinfo.Element.comment = this.editComment;
    this.xsdService.editMode = false;
  }

  elementSelected() {
    if (this.xsdService.nodeSelected && this.xsdService.nodeSelected.xsdnode === 'element') {
      this.elmnt = this.xsdService.nodeSelected;
      this.editDoc = this.elmnt.documentation;
      this.editLabel = this.elmnt.appinfo.Element.name;
      this.editVar = this.elmnt.appinfo.Element.mapvar;
      this.editComment = this.elmnt.appinfo.Element.comment;
      //this.selatts = [];
      return true;
    } else {
      return false;
    }
  }

}