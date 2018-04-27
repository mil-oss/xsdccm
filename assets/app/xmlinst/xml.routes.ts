import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { InstancesComponent } from "./instances/instances.component";
//import { AuthGuard } from './../auth/auth.guard';

const XML_ROUTES: Routes = [
  {
    //path: 'instances', component: InstancesComponent,canActivate: [AuthGuard],
    path: 'instances', component: InstancesComponent,
    children: [
      //{path: 'instance', component: InstancesComponent,canActivate: [AuthGuard]}
      {path: 'instance', component: InstancesComponent}
    ]
  }
]
export const XmlRoutes: ModuleWithProviders = RouterModule.forChild(XML_ROUTES);
