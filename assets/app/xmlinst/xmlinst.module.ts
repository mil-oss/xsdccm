import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { XmlRoutes }  from "./xml.routes";
import { XmlPipe } from './xml.pipe';
import { JsonPipe } from './json.pipe';
import { InstancesComponent } from './instances/instances.component';
import { InstanceComponent } from './instances/instance/instance.component';
import { XmlService } from './xml.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule, 
    BrowserModule,
    FormsModule,
    XmlRoutes
  ],
  declarations: [
    InstancesComponent,
    InstanceComponent,
    XmlPipe,
    JsonPipe
  ],
  providers: [
    XmlService
  ]
})
export class XmlinstModule { }
