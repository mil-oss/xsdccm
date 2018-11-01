/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "./header.component.css.shim.ngstyle";
import * as i1 from "@angular/core";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
import * as i4 from "./header.component";
import * as i5 from "../xsdccm/xsd.service";
var styles_HeaderComponent = [i0.styles];
var RenderType_HeaderComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_HeaderComponent, data: {} });
export { RenderType_HeaderComponent as RenderType_HeaderComponent };
export function View_HeaderComponent_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 4, "div", [["style", "display:float-left;margin-top:-25px;margin-left:-15px; min-width:600px;"]], null, null, null, null, null)), (_l()(), i1.ɵeld(1, 0, null, null, 1, "a", [["href", "http://www.ionchannel.io/"]], null, null, null, null, null)), (_l()(), i1.ɵeld(2, 0, null, null, 0, "img", [["alt", "IONChannel"], ["height", "40px;"], ["src", "/img/ionchannel.png"]], null, null, null, null, null)), (_l()(), i1.ɵeld(3, 0, null, null, 1, "b", [["style", "margin-left:40px;"]], null, null, null, null, null)), (_l()(), i1.ɵted(4, null, ["", ""])), (_l()(), i1.ɵeld(5, 0, null, null, 37, "header", [["class", "col-md-8 col-md-offset"], ["style", "width:100%; min-width:600px;"]], null, null, null, null, null)), (_l()(), i1.ɵeld(6, 0, null, null, 36, "nav", [["class", "col-md-8 col-md-offset"], ["style", "font-size:12px; font-weight:bold;"]], null, null, null, null, null)), (_l()(), i1.ɵeld(7, 0, null, null, 35, "ul", [["class", "nav nav-tabs"]], null, null, null, null, null)), (_l()(), i1.ɵeld(8, 0, null, null, 6, "li", [], null, null, null, null, null)), i1.ɵdid(9, 278528, null, 0, i2.NgClass, [i1.IterableDiffers, i1.KeyValueDiffers, i1.ElementRef, i1.Renderer2], { ngClass: [0, "ngClass"] }, null), i1.ɵpod(10, { active: 0 }), (_l()(), i1.ɵeld(11, 0, null, null, 3, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (i1.ɵnov(_v, 12).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.selTab("home") !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i1.ɵdid(12, 671744, null, 0, i3.RouterLinkWithHref, [i3.Router, i3.ActivatedRoute, i2.LocationStrategy], { routerLink: [0, "routerLink"] }, null), i1.ɵpad(13, 1), (_l()(), i1.ɵted(-1, null, ["Home"])), (_l()(), i1.ɵeld(15, 0, null, null, 6, "li", [], null, null, null, null, null)), i1.ɵdid(16, 278528, null, 0, i2.NgClass, [i1.IterableDiffers, i1.KeyValueDiffers, i1.ElementRef, i1.Renderer2], { ngClass: [0, "ngClass"] }, null), i1.ɵpod(17, { active: 0 }), (_l()(), i1.ɵeld(18, 0, null, null, 3, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (i1.ɵnov(_v, 19).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.selTab("xsd") !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i1.ɵdid(19, 671744, null, 0, i3.RouterLinkWithHref, [i3.Router, i3.ActivatedRoute, i2.LocationStrategy], { routerLink: [0, "routerLink"] }, null), i1.ɵpad(20, 1), (_l()(), i1.ɵted(-1, null, ["XML Schema"])), (_l()(), i1.ɵeld(22, 0, null, null, 6, "li", [], null, null, null, null, null)), i1.ɵdid(23, 278528, null, 0, i2.NgClass, [i1.IterableDiffers, i1.KeyValueDiffers, i1.ElementRef, i1.Renderer2], { ngClass: [0, "ngClass"] }, null), i1.ɵpod(24, { active: 0 }), (_l()(), i1.ɵeld(25, 0, null, null, 3, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (i1.ɵnov(_v, 26).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.selTab("doc") !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i1.ɵdid(26, 671744, null, 0, i3.RouterLinkWithHref, [i3.Router, i3.ActivatedRoute, i2.LocationStrategy], { routerLink: [0, "routerLink"] }, null), i1.ɵpad(27, 1), (_l()(), i1.ɵted(-1, null, ["Documentation"])), (_l()(), i1.ɵeld(29, 0, null, null, 6, "li", [], null, null, null, null, null)), i1.ɵdid(30, 278528, null, 0, i2.NgClass, [i1.IterableDiffers, i1.KeyValueDiffers, i1.ElementRef, i1.Renderer2], { ngClass: [0, "ngClass"] }, null), i1.ɵpod(31, { active: 0 }), (_l()(), i1.ɵeld(32, 0, null, null, 3, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (i1.ɵnov(_v, 33).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.selTab("xmldata") !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i1.ɵdid(33, 671744, null, 0, i3.RouterLinkWithHref, [i3.Router, i3.ActivatedRoute, i2.LocationStrategy], { routerLink: [0, "routerLink"] }, null), i1.ɵpad(34, 1), (_l()(), i1.ɵted(-1, null, ["Tests"])), (_l()(), i1.ɵeld(36, 0, null, null, 6, "li", [], null, null, null, null, null)), i1.ɵdid(37, 278528, null, 0, i2.NgClass, [i1.IterableDiffers, i1.KeyValueDiffers, i1.ElementRef, i1.Renderer2], { ngClass: [0, "ngClass"] }, null), i1.ɵpod(38, { active: 0 }), (_l()(), i1.ɵeld(39, 0, null, null, 3, "a", [], [[1, "target", 0], [8, "href", 4]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (i1.ɵnov(_v, 40).onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = (_co.selTab("provrpt") !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), i1.ɵdid(40, 671744, null, 0, i3.RouterLinkWithHref, [i3.Router, i3.ActivatedRoute, i2.LocationStrategy], { routerLink: [0, "routerLink"] }, null), i1.ɵpad(41, 1), (_l()(), i1.ɵted(-1, null, ["Provenance Reports"]))], function (_ck, _v) { var _co = _v.component; var currVal_1 = _ck(_v, 10, 0, _co.isSel("home")); _ck(_v, 9, 0, currVal_1); var currVal_4 = _ck(_v, 13, 0, "home"); _ck(_v, 12, 0, currVal_4); var currVal_5 = _ck(_v, 17, 0, _co.isSel("xsd")); _ck(_v, 16, 0, currVal_5); var currVal_8 = _ck(_v, 20, 0, "xsd"); _ck(_v, 19, 0, currVal_8); var currVal_9 = _ck(_v, 24, 0, _co.isSel("doc")); _ck(_v, 23, 0, currVal_9); var currVal_12 = _ck(_v, 27, 0, "doc"); _ck(_v, 26, 0, currVal_12); var currVal_13 = _ck(_v, 31, 0, _co.isSel("xmldata")); _ck(_v, 30, 0, currVal_13); var currVal_16 = _ck(_v, 34, 0, "xmldata"); _ck(_v, 33, 0, currVal_16); var currVal_17 = _ck(_v, 38, 0, _co.isSel("provrpt")); _ck(_v, 37, 0, currVal_17); var currVal_20 = _ck(_v, 41, 0, "provrpt"); _ck(_v, 40, 0, currVal_20); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.xsdService.cfg.title; _ck(_v, 4, 0, currVal_0); var currVal_2 = i1.ɵnov(_v, 12).target; var currVal_3 = i1.ɵnov(_v, 12).href; _ck(_v, 11, 0, currVal_2, currVal_3); var currVal_6 = i1.ɵnov(_v, 19).target; var currVal_7 = i1.ɵnov(_v, 19).href; _ck(_v, 18, 0, currVal_6, currVal_7); var currVal_10 = i1.ɵnov(_v, 26).target; var currVal_11 = i1.ɵnov(_v, 26).href; _ck(_v, 25, 0, currVal_10, currVal_11); var currVal_14 = i1.ɵnov(_v, 33).target; var currVal_15 = i1.ɵnov(_v, 33).href; _ck(_v, 32, 0, currVal_14, currVal_15); var currVal_18 = i1.ɵnov(_v, 40).target; var currVal_19 = i1.ɵnov(_v, 40).href; _ck(_v, 39, 0, currVal_18, currVal_19); }); }
export function View_HeaderComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-header", [], null, null, null, View_HeaderComponent_0, RenderType_HeaderComponent)), i1.ɵdid(1, 114688, null, 0, i4.HeaderComponent, [i5.XsdService, i3.Router], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var HeaderComponentNgFactory = i1.ɵccf("app-header", i4.HeaderComponent, View_HeaderComponent_Host_0, {}, {}, []);
export { HeaderComponentNgFactory as HeaderComponentNgFactory };
