import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public userLoggedIn: string = localStorage.getItem('token');
  public userId: string = localStorage.getItem('id');
  private apiUrl = 'http://localhost:8080/api';

  setLoggedIn(token: string, id: string) {
    this.userLoggedIn = token;
    this.userId = id;
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
  }

  getLoggedIn(): boolean {
    if (this.userLoggedIn !== null && this.isJwsTokenValid(this.userLoggedIn)) return true;
    else return false;
  }

  logout(): void {
    this.userLoggedIn = null;
    this.userId = null;
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  isJwsTokenValid(token: string): boolean {
    const currentSeconds = new Date().getTime() / 1000;
    const decodedToken = jwt_decode(token);
    return (decodedToken['exp'] >= currentSeconds) && (decodedToken['iat'] <= currentSeconds);
  }

  public register(firstname: string, lastname: string, email1: string, email2: string, password1: string, password2: string, callback, error) {
    const url: string = `${this.apiUrl}/register`;

    const body = {
      'nameup': firstname,
      'surnameup': lastname,
      'email1up': email1,
      'email2up': email2,
      'password1up': password1,
      'password2up': password2,
    }

    return this.http.post(url, body).toPromise().then(response => callback(response)).catch(err => error(err));
  }

  public login(email: string, password: string, callback, error) {
    const url: string = `${this.apiUrl}/login`;

    const body = {
      'email': email,
      'password': password,
    }
    return this.http.post(url, body).toPromise().then(response => callback(response)).catch(err => error(err));
  }

  public confirm(urlCode: string, code: string, callback, error) {
    const url: string = `${this.apiUrl}/confirm/${urlCode}/${code}`;
    const body = {}

    return this.http.post(url, body).toPromise().then(response => callback(response)).catch(err => error(err));

  }
}
