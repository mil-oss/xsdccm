/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "./auth.module";
import * as i2 from "../../../node_modules/@angular/router/router.ngfactory";
import * as i3 from "./auth.component.ngfactory";
import * as i4 from "./login/login.component.ngfactory";
import * as i5 from "./register/register.component.ngfactory";
import * as i6 from "./admin/admin.component.ngfactory";
import * as i7 from "@angular/common";
import * as i8 from "@angular/platform-browser";
import * as i9 from "@angular/forms";
import * as i10 from "@angular/common/http";
import * as i11 from "./jwt.interceptor";
import * as i12 from "@angular/router";
import * as i13 from "./alerts/alert.service";
import * as i14 from "./auth.service";
import * as i15 from "./user.service";
import * as i16 from "./auth.component";
import * as i17 from "./login/login.component";
import * as i18 from "./auth.guard";
import * as i19 from "./register/register.component";
import * as i20 from "./admin/admin.component";
import * as i21 from "./admin.guard";
var AuthModuleNgFactory = i0.ɵcmf(i1.AuthModule, [], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, [i2.ɵEmptyOutletComponentNgFactory, i3.AuthComponentNgFactory, i4.LoginComponentNgFactory, i5.RegisterComponentNgFactory, i6.AdminComponentNgFactory]], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(5120, i0.LOCALE_ID, i0.ɵangular_packages_core_core_k, [[3, i0.LOCALE_ID]]), i0.ɵmpd(4608, i7.NgLocalization, i7.NgLocaleLocalization, [i0.LOCALE_ID, [2, i7.ɵangular_packages_common_common_a]]), i0.ɵmpd(5120, i0.APP_ID, i0.ɵangular_packages_core_core_f, []), i0.ɵmpd(5120, i0.IterableDiffers, i0.ɵangular_packages_core_core_i, []), i0.ɵmpd(5120, i0.KeyValueDiffers, i0.ɵangular_packages_core_core_j, []), i0.ɵmpd(4608, i8.DomSanitizer, i8.ɵDomSanitizerImpl, [i7.DOCUMENT]), i0.ɵmpd(6144, i0.Sanitizer, null, [i8.DomSanitizer]), i0.ɵmpd(4608, i8.HAMMER_GESTURE_CONFIG, i8.HammerGestureConfig, []), i0.ɵmpd(5120, i8.EVENT_MANAGER_PLUGINS, function (p0_0, p0_1, p0_2, p1_0, p2_0, p2_1, p2_2, p2_3) { return [new i8.ɵDomEventsPlugin(p0_0, p0_1, p0_2), new i8.ɵKeyEventsPlugin(p1_0), new i8.ɵHammerGesturesPlugin(p2_0, p2_1, p2_2, p2_3)]; }, [i7.DOCUMENT, i0.NgZone, i0.PLATFORM_ID, i7.DOCUMENT, i7.DOCUMENT, i8.HAMMER_GESTURE_CONFIG, i0.ɵConsole, [2, i8.HAMMER_LOADER]]), i0.ɵmpd(4608, i8.EventManager, i8.EventManager, [i8.EVENT_MANAGER_PLUGINS, i0.NgZone]), i0.ɵmpd(135680, i8.ɵDomSharedStylesHost, i8.ɵDomSharedStylesHost, [i7.DOCUMENT]), i0.ɵmpd(4608, i8.ɵDomRendererFactory2, i8.ɵDomRendererFactory2, [i8.EventManager, i8.ɵDomSharedStylesHost]), i0.ɵmpd(6144, i0.RendererFactory2, null, [i8.ɵDomRendererFactory2]), i0.ɵmpd(6144, i8.ɵSharedStylesHost, null, [i8.ɵDomSharedStylesHost]), i0.ɵmpd(4608, i0.Testability, i0.Testability, [i0.NgZone]), i0.ɵmpd(4608, i9.ɵangular_packages_forms_forms_j, i9.ɵangular_packages_forms_forms_j, []), i0.ɵmpd(4608, i10.HttpXsrfTokenExtractor, i10.ɵangular_packages_common_http_http_g, [i7.DOCUMENT, i0.PLATFORM_ID, i10.ɵangular_packages_common_http_http_e]), i0.ɵmpd(4608, i10.ɵangular_packages_common_http_http_h, i10.ɵangular_packages_common_http_http_h, [i10.HttpXsrfTokenExtractor, i10.ɵangular_packages_common_http_http_f]), i0.ɵmpd(5120, i10.HTTP_INTERCEPTORS, function (p0_0) { return [p0_0, new i11.JwtInterceptor()]; }, [i10.ɵangular_packages_common_http_http_h]), i0.ɵmpd(4608, i10.ɵangular_packages_common_http_http_d, i10.ɵangular_packages_common_http_http_d, []), i0.ɵmpd(6144, i10.XhrFactory, null, [i10.ɵangular_packages_common_http_http_d]), i0.ɵmpd(4608, i10.HttpXhrBackend, i10.HttpXhrBackend, [i10.XhrFactory]), i0.ɵmpd(6144, i10.HttpBackend, null, [i10.HttpXhrBackend]), i0.ɵmpd(4608, i10.HttpHandler, i10.ɵHttpInterceptingHandler, [i10.HttpBackend, i0.Injector]), i0.ɵmpd(4608, i10.HttpClient, i10.HttpClient, [i10.HttpHandler]), i0.ɵmpd(5120, i12.ActivatedRoute, i12.ɵangular_packages_router_router_g, [i12.Router]), i0.ɵmpd(4608, i12.NoPreloading, i12.NoPreloading, []), i0.ɵmpd(6144, i12.PreloadingStrategy, null, [i12.NoPreloading]), i0.ɵmpd(135680, i12.RouterPreloader, i12.RouterPreloader, [i12.Router, i0.NgModuleFactoryLoader, i0.Compiler, i0.Injector, i12.PreloadingStrategy]), i0.ɵmpd(4608, i12.PreloadAllModules, i12.PreloadAllModules, []), i0.ɵmpd(5120, i12.ɵangular_packages_router_router_n, i12.ɵangular_packages_router_router_c, [i12.Router, i7.ViewportScroller, i12.ROUTER_CONFIGURATION]), i0.ɵmpd(5120, i12.ROUTER_INITIALIZER, i12.ɵangular_packages_router_router_j, [i12.ɵangular_packages_router_router_h]), i0.ɵmpd(5120, i0.APP_BOOTSTRAP_LISTENER, function (p0_0) { return [p0_0]; }, [i12.ROUTER_INITIALIZER]), i0.ɵmpd(4608, i13.AlertService, i13.AlertService, [i12.Router]), i0.ɵmpd(4608, i14.AuthService, i14.AuthService, [i10.HttpClient]), i0.ɵmpd(4608, i15.UserService, i15.UserService, [i10.HttpClient]), i0.ɵmpd(1073742336, i7.CommonModule, i7.CommonModule, []), i0.ɵmpd(1024, i0.ErrorHandler, i8.ɵangular_packages_platform_browser_platform_browser_a, []), i0.ɵmpd(1024, i0.NgProbeToken, function () { return [i12.ɵangular_packages_router_router_b()]; }, []), i0.ɵmpd(512, i12.ɵangular_packages_router_router_h, i12.ɵangular_packages_router_router_h, [i0.Injector]), i0.ɵmpd(1024, i0.APP_INITIALIZER, function (p0_0, p1_0) { return [i8.ɵangular_packages_platform_browser_platform_browser_j(p0_0), i12.ɵangular_packages_router_router_i(p1_0)]; }, [[2, i0.NgProbeToken], i12.ɵangular_packages_router_router_h]), i0.ɵmpd(512, i0.ApplicationInitStatus, i0.ApplicationInitStatus, [[2, i0.APP_INITIALIZER]]), i0.ɵmpd(131584, i0.ApplicationRef, i0.ApplicationRef, [i0.NgZone, i0.ɵConsole, i0.Injector, i0.ErrorHandler, i0.ComponentFactoryResolver, i0.ApplicationInitStatus]), i0.ɵmpd(1073742336, i0.ApplicationModule, i0.ApplicationModule, [i0.ApplicationRef]), i0.ɵmpd(1073742336, i8.BrowserModule, i8.BrowserModule, [[3, i8.BrowserModule]]), i0.ɵmpd(1073742336, i9.ɵangular_packages_forms_forms_bc, i9.ɵangular_packages_forms_forms_bc, []), i0.ɵmpd(1073742336, i9.FormsModule, i9.FormsModule, []), i0.ɵmpd(1073742336, i10.HttpClientXsrfModule, i10.HttpClientXsrfModule, []), i0.ɵmpd(1073742336, i10.HttpClientModule, i10.HttpClientModule, []), i0.ɵmpd(1024, i12.ɵangular_packages_router_router_a, i12.ɵangular_packages_router_router_e, [[3, i12.Router]]), i0.ɵmpd(512, i12.UrlSerializer, i12.DefaultUrlSerializer, []), i0.ɵmpd(512, i12.ChildrenOutletContexts, i12.ChildrenOutletContexts, []), i0.ɵmpd(256, i12.ROUTER_CONFIGURATION, {}, []), i0.ɵmpd(1024, i7.LocationStrategy, i12.ɵangular_packages_router_router_d, [i7.PlatformLocation, [2, i7.APP_BASE_HREF], i12.ROUTER_CONFIGURATION]), i0.ɵmpd(512, i7.Location, i7.Location, [i7.LocationStrategy]), i0.ɵmpd(512, i0.Compiler, i0.Compiler, []), i0.ɵmpd(512, i0.NgModuleFactoryLoader, i0.SystemJsNgModuleLoader, [i0.Compiler, [2, i0.SystemJsNgModuleLoaderConfig]]), i0.ɵmpd(1024, i12.ROUTES, function () { return [[{ path: "auth", component: i16.AuthComponent, children: [{ path: "", component: i17.LoginComponent, canActivate: [i18.AuthGuard] }, { path: "login", component: i17.LoginComponent }, { path: "logout", component: i17.LoginComponent }, { path: "register", component: i19.RegisterComponent }, { path: "admin", component: i20.AdminComponent, canActivate: [i21.AdminGuard] }, { path: "**", redirectTo: "", canActivate: [i18.AuthGuard] }] }]]; }, []), i0.ɵmpd(1024, i12.Router, i12.ɵangular_packages_router_router_f, [i0.ApplicationRef, i12.UrlSerializer, i12.ChildrenOutletContexts, i7.Location, i0.Injector, i0.NgModuleFactoryLoader, i0.Compiler, i12.ROUTES, i12.ROUTER_CONFIGURATION, [2, i12.UrlHandlingStrategy], [2, i12.RouteReuseStrategy]]), i0.ɵmpd(1073742336, i12.RouterModule, i12.RouterModule, [[2, i12.ɵangular_packages_router_router_a], [2, i12.Router]]), i0.ɵmpd(1073742336, i1.AuthModule, i1.AuthModule, []), i0.ɵmpd(256, i0.ɵAPP_ROOT, true, []), i0.ɵmpd(256, i10.ɵangular_packages_common_http_http_e, "XSRF-TOKEN", []), i0.ɵmpd(256, i10.ɵangular_packages_common_http_http_f, "X-XSRF-TOKEN", [])]); });
export { AuthModuleNgFactory as AuthModuleNgFactory };
