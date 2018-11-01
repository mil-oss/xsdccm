var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { XsdService } from "./../../xsd.service";
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
let SimpletypeComponent = class SimpletypeComponent {
    constructor(xsdService, router, route) {
        this.xsdService = xsdService;
        this.router = router;
        this.route = route;
    }
    ngOnInit() {
        this.route.params.subscribe(p => {
            //console.log(p.name);
            if (this.xsdService.xsd) {
                this.stype = this.xsdService.selSimpleType(p.name);
                if (this.stype[this.xsdService.selectedxsd] && this.stype[this.xsdService.selectedxsd].enumerations) {
                    this.enums = [];
                    for (var s in this.xsdService.nodeSelected.enumerations) {
                        this.enums.push(this.xsdService.nodeSelected.enumerations[s]);
                    }
                }
            }
            else {
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
    selectStype(node) {
        this.xsdService.selSimpleType(node.name);
        this.router.navigate(['xsd/simpletype', node.name]);
    }
    ;
    selectedStype() {
        if (this.xsdService.nodeSelected) {
            if (this.xsdService.nodeSelected.xsdnode === 'simpleType') {
                this.stype = this.xsdService.nodeSelected;
                this.enums = [];
                for (var s in this.xsdService.nodeSelected.enumerations) {
                    this.enums.push(this.xsdService.nodeSelected.enumerations[s]);
                }
                return true;
            }
            else {
                return false;
            }
        }
        else {
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
        this.editComment = this.stype.appinfo.SimpleType.comment;
        this.xsdService.editMode = true;
    }
    submit() {
        this.stype.documentation = this.editDoc;
        this.stype.appinfo.SimpleType.name = this.editLabel;
        this.stype.appinfo.SimpleType.comment = this.editComment;
        this.xsdService.editMode = false;
    }
    getJSON(s) {
        return JSON.stringify(s);
    }
};
SimpletypeComponent = __decorate([
    Component({
        selector: 'app-simpletype',
        templateUrl: './simpletype.component.html',
        styleUrls: ['./../../xsd.component.css']
    }),
    __metadata("design:paramtypes", [XsdService, Router, ActivatedRoute])
], SimpletypeComponent);
export { SimpletypeComponent };
