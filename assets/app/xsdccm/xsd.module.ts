import { Component, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { XsdRoutes }  from "./xsd-routes";
import { HttpModule } from "@angular/http";
import { XsdComponent } from "./xsd.component";
import { ElementComponent } from "./elements/element/element.component";
import { ElementsComponent } from "./elements/elements.component";
import { SimpletypeComponent } from "./simpletypes/simpletype/simpletype.component";
import { SimpletypesComponent } from "./simpletypes/simpletypes.component";
import { ComplextypeComponent } from "./complextypes/complextype/complextype.component";
import { ComplextypesComponent } from "./complextypes/complextypes.component";
import { XsdService } from "./xsd.service";
import { XsdviewComponent } from './xsdview/xsdview.component';

@NgModule({
  imports: [
    HttpModule, 
    BrowserModule,
    FormsModule,
    XsdRoutes
  ],
  declarations: [
    ElementComponent,
    ElementsComponent,
    SimpletypeComponent,
    SimpletypesComponent,
    ComplextypeComponent,
    ComplextypesComponent,
    XsdComponent,
    XsdviewComponent,
  ],
  providers: [
    XsdService
  ]
})
export class XsdModule {}
