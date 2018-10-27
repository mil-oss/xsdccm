import { Component, NgModule } from "@angular/core";
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


@NgModule({
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
export class AppModule {}
