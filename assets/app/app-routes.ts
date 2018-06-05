import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { XsdComponent } from "./xsdccm/xsd.component";
import { XsdviewComponent } from "./xsdccm/xsdview/xsdview.component";
import { InstancesComponent } from "./xmlinst/instances/instances.component";
import { ProvrptComponent } from "./provrpt/provrpt.component";
import { LicensesComponent } from "./licenses/licenses.component";


const APP_ROUTES: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "provrpt", component: ProvrptComponent },
  { path: "licenses", component: LicensesComponent },
  { path: "datamodel", component: XsdviewComponent },
  { path: "xsd", component: XsdComponent },
  { path: "xmldata", component: InstancesComponent },
  { path: "file", component: HomeComponent }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);