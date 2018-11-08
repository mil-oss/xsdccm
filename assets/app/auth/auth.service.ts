import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

    public user:any;

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<any>('/auth/authenticate', { email: email, password: password })
            .map(authuser => {
                // login successful if there's a jwt token in the response
                if (authuser && authuser.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', authuser.token);
                    this.user=authuser;
                }
            })
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}