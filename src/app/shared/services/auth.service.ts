import { Injectable } from '@angular/core';
import { Iregistration } from '../model/registration';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL1: string = environment.AUTH_URL;
  LogInSub$: Subject<boolean> = new Subject();
  constructor(private _http: HttpClient) {}

  // registreation
  registretion(regiObj: Iregistration): Observable<any> {
    return this._http.post<any>(`${this.BASE_URL1}/register`, regiObj);
  }
  //  login
  LogIn(loginObj: Iregistration): Observable<any> {
    return this._http.post<any>(`${this.BASE_URL1}/login`, loginObj);
  }
  // savetoken
  savetoken(token: string) {
    return localStorage.setItem('token', token);
  }
  // SaveUserrole
  saveuserRole(userRole: string) {
    return localStorage.setItem('userRole', userRole);
  }

  //get token

  getToken() {
    return localStorage.getItem('token');
  }

  getuserRole() {
    return localStorage.getItem('userRole');
  }
  // removetoken
  removetoken() {
    localStorage.removeItem('token');
  }
  // removeuserRole

  removeuserRole() {
    localStorage.removeItem('userRole');
  }
}
  
