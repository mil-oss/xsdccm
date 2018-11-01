var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutes } from "./app-routes";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { DocpageComponent } from "./docpage/docpage.component";
import { ProvrptComponent } from "./provrpt/provrpt.component";
import { LicensesComponent } from "./licenses/licenses.component";
import { ErrorService } from "./errors/error.service";
import { ErrorComponent } from "./errors/error.component";
import { XsdModule } from "./xsdccm/xsd.module";
import { XmlinstModule } from "./xmlinst/xmlinst.module";
import { SafePipe } from "./safe.pipe";
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        imports: [
            HttpModule,
            BrowserModule,
            FormsModule,
            XsdModule,
            XmlinstModule,
            AppRoutes
        ],
        bootstrap: [AppComponent],
        declarations: [
            AppComponent,
            HeaderComponent,
            HomeComponent,
            DocpageComponent,
            ProvrptComponent,
            LicensesComponent,
            ErrorComponent,
            SafePipe
        ],
        providers: [
            ErrorService
        ]
    })
], AppModule);
export { AppModule };
