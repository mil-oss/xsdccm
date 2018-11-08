import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        //console.log(localStorage.getItem('currentUser'));
        let currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            request = request.clone({
                setHeaders: { 
                    Authorization: 'Bearer ${currentUser}'
                }
            });
        }

        return next.handle(request);
    }
}