import { Injectable } from '@angular/core';
import { AuthStore } from './auth.store';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AuthQuery } from './auth.query';

@Injectable({ providedIn: 'root' })
export class AuthService {


    constructor(
        private store: AuthStore,
        private query: AuthQuery,
        private http: HttpClient,
        private storage: Storage) { }

    public getUser() {
        return 'Ulugbek';
    }

    isLoggedIn() {
        return true
    }

}