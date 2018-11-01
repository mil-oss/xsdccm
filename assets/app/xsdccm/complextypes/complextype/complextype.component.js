var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { XsdService } from "./../../xsd.service";
import { Component } from "@angular/core";
let ComplextypeComponent = class ComplextypeComponent {
    constructor(xsdService, router, route) {
        this.xsdService = xsdService;
        this.router = router;
        this.route = route;
        this.ctsequence = [];
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
            }
            else {
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
            for (var s in this.xsdService.nodeSelected.sequence) {
                this.ctsequence.push(this.xsdService.nodeSelected.sequence[s]);
            }
            //console.log(this.ctsequence);
            return true;
        }
        else {
            return false;
        }
    }
    editct() {
        return this.xsdService.editMode;
    }
    doedit() {
        this.editDoc = this.ctype.documentation;
        this.editLabel = this.ctype.appinfo.ComplexType.name;
        this.editComment = this.ctype.appinfo.ComplexType.comment;
        this.xsdService.editMode = true;
    }
    submit() {
        this.ctype.documentation = this.editDoc;
        this.ctype.appinfo.ComplexType.name = this.editLabel;
        this.ctype.appinfo.ComplexType.comment = this.editComment;
        this.xsdService.editMode = false;
    }
    cancel() {
        this.ctype = this.xsdService.nodeSelected;
        this.doedit();
        this.xsdService.editMode = false;
    }
};
ComplextypeComponent = __decorate([
    Component({
        selector: 'app-complextype',
        templateUrl: './complextype.component.html',
        styleUrls: ['./../../xsd.component.css']
    }),
    __metadata("design:paramtypes", [XsdService, Router, ActivatedRoute])
], ComplextypeComponent);
export { ComplextypeComponent };
