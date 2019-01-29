import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap'
import { XsdService } from "./../../xsd.service";
import { Component, OnInit } from "@angular/core";
import { XsdComplexType } from "../../xsd.model";
import { XsdElement } from "../../xsd.model";

@Component({
  selector: 'app-complextype',
  templateUrl: './complextype.component.html',
  styleUrls: ['./../../xsd.component.css']
})
export class ComplextypeComponent implements OnInit {
  ctypes: XsdComplexType[];
  ctype: XsdComplexType;
  ctsequence: XsdElement[] = [];
  editDoc: string;
  editComment: string;
  editLabel: string;
  editVar: string;

  constructor(public xsdService: XsdService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      //console.log(p.name);
      if (this.xsdService.xsd) {
        this.ctype = this.xsdService.selComplexType(p.name);
        this.ctsequence = [];
        for (var s in this.xsdService.nodeSelected.sequence) {
          this.ctsequence.push(this.xsdService.nodeSelected.sequence[s]);
        }
      } else {
        this.ctype = this.xsdService.selComplexType(p.name);
        this.ctsequence = [];
        for (var s in this.xsdService.nodeSelected.sequence) {
          this.ctsequence.push(this.xsdService.nodeSelected.sequence[s]);
        }
      }
    });
  }

  selectedCtype() {
    if (this.xsdService.nodeSelected && this.xsdService.nodeSelected.xsdnode === 'complexType') {
      this.ctype = this.xsdService.nodeSelected;
      this.ctsequence = [];
      if (this.ctype.sequence) {
        for (var s in this.ctype.sequence) {
          this.ctsequence.push(this.xsdService.nodeSelected.sequence[s]);
        }
        //console.log(this.ctsequence);
        return true;
      } else {
        return false;
      }
    }
  }

  editct() {
    return this.xsdService.editMode;
  }

  doedit() {
    this.editDoc = this.ctype.documentation;
    this.editLabel = this.ctype.appinfo.ComplexType.typename;
    this.editComment = this.ctype.appinfo.ComplexType.comment;
    this.xsdService.editMode = true;
  }

  submit() {
    this.ctype.documentation = this.editDoc;
    this.ctype.appinfo.ComplexType.typename = this.editLabel;
    this.ctype.appinfo.ComplexType.comment = this.editComment;
    this.xsdService.editMode = false;
  }

  cancel() {
    this.ctype = this.xsdService.nodeSelected;
    this.doedit();
    this.xsdService.editMode = false;
  }

}