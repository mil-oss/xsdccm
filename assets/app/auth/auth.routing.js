import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { AdminComponent } from './admin/admin.component';
const authRoutes = [
    {
        path: 'auth', component: AuthComponent,
        children: [
            { path: '', component: LoginComponent, canActivate: [AuthGuard] },
            { path: 'login', component: LoginComponent },
            { path: 'logout', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
            // otherwise redirect to home
            { path: '**', redirectTo: '', canActivate: [AuthGuard] }
        ]
    }
];
export const AuthRouting = RouterModule.forRoot(authRoutes);
