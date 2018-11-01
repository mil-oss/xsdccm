var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { XsdRoutes } from "./xsd-routes";
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
let XsdModule = class XsdModule {
};
XsdModule = __decorate([
    NgModule({
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
], XsdModule);
export { XsdModule };
