import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './../auth/models/user.model';
import { Resource } from './../auth/models/resource.model';

@Injectable()
export class UserService {

    selectedUser:any={};

    constructor(private http: HttpClient) { }

    getAll() {
        console.log('getAll');
        return this.http.get<any>('/auth/users');
    }

    create(userinfo: any) {
        return this.http.post('/auth/adduser', userinfo);
    }

    update(user: User) {
        return this.http.put('/auth/updateuser/' + user.email, user);
    }

    delete(user: User) {
        return this.http.delete('/auth/deleteuser/' + user.email);
    }

    verify(user: User, resource: Resource) {
        return this.http.get('/auth/verify/' + user.email);
    }
}