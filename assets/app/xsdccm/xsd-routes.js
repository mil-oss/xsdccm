import { RouterModule } from "@angular/router";
import { XsdComponent } from "./xsd.component";
import { ElementComponent } from "./elements/element/element.component";
import { ElementsComponent } from "./elements/elements.component";
import { SimpletypeComponent } from "./simpletypes/simpletype/simpletype.component";
import { SimpletypesComponent } from "./simpletypes/simpletypes.component";
import { ComplextypeComponent } from "./complextypes/complextype/complextype.component";
import { ComplextypesComponent } from "./complextypes/complextypes.component";
//import { AuthGuard } from './../auth/auth.guard';
const XSD_ROUTES = [
    {
        //path: 'xsd', component: XsdComponent,canActivate: [AuthGuard],
        path: 'xsd', component: XsdComponent,
        children: [
            { path: "ctypes", component: ComplextypesComponent },
            { path: "complextype/:name", component: ComplextypeComponent },
            { path: "stypes", component: SimpletypesComponent },
            { path: "simpletype/:name", component: SimpletypeComponent },
            { path: "elements", component: ElementsComponent },
            { path: "element/:name", component: ElementComponent }
        ]
    }
];
export const XsdRoutes = RouterModule.forChild(XSD_ROUTES);
