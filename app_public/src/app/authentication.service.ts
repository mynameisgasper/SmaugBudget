import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api';

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
