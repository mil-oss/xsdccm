import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth.component';
import { AuthRouting } from './auth.routing';
import { JwtInterceptor } from './jwt.interceptor';
import { AuthService } from "./auth.service";
import { AlertService } from "./alerts/alert.service";
import { AlertComponent } from "./alerts/alert.component";
import { UserService } from "./user.service";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AuthRouting
    ],
    declarations: [
        AuthComponent,
        AlertComponent,
        LoginComponent,
        RegisterComponent,
        AdminComponent,
        ProfileComponent
    ],
    providers: [
        AlertService,
        AuthService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }
    ]
})

export class AuthModule { }