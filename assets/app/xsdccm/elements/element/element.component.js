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
let ElementComponent = class ElementComponent {
    constructor(xsdService, router, route) {
        this.xsdService = xsdService;
        this.router = router;
        this.route = route;
    }
    ngOnInit() {
        this.route.params.subscribe(p => {
            this.elmnt = this.xsdService.selElement(p.name);
        });
    }
    editel() {
        return this.xsdService.editMode;
    }
    doedit() {
        this.editDoc = this.elmnt.documentation;
        this.editLabel = this.elmnt.appinfo.Element.name;
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
        this.elmnt.appinfo.Element.comment = this.editComment;
        this.xsdService.editMode = false;
    }
    elementSelected() {
        if (this.xsdService.nodeSelected && this.xsdService.nodeSelected.xsdnode === 'element') {
            this.elmnt = this.xsdService.nodeSelected;
            this.editDoc = this.elmnt.documentation;
            this.editLabel = this.elmnt.appinfo.Element.name;
            this.editComment = this.elmnt.appinfo.Element.comment;
            //this.selatts = [];
            return true;
        }
        else {
            return false;
        }
    }
};
ElementComponent = __decorate([
    Component({
        selector: "app-element",
        templateUrl: "./element.component.html",
        styleUrls: ['./../../xsd.component.css']
    }),
    __metadata("design:paramtypes", [XsdService, Router, ActivatedRoute])
], ElementComponent);
export { ElementComponent };
