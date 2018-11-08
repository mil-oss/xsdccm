import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './../home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';

const authRoutes: Routes = [
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