import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Converter } from './converter';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api';
  private response: any;

  public deleteData(): Promise<any> {
    const url: string = `${this.apiUrl}/removeAllDbData`;
    const body: object = {}
    return this.http.post(url, body).toPromise().then(response => this.response).catch(this.parseError);
  }

  public loadData(): Promise<any> {
    const url: string = `${this.apiUrl}/createDummyAccounts`;
    const body: object = {}
    return this.http.post(url, body).toPromise().then(response => this.response).catch(this.parseError);
  }

  public converter(currency1: string, currency2: string, value: number, callback): Promise<Converter> {
    const url: string = `${this.apiUrl}/converter`;
    let params = new HttpParams();
    params = params.append('curr1', currency1);
    params = params.append('curr2', currency2);
    params = params.append('amm1' , value.toString());

    return this.http.get(url, {params: params}).toPromise().then(response => callback(response)).catch(this.parseError);
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
    console.log(this.response);
    return this.http.post(url, body).toPromise().then(response => callback(response)).catch(err => error(err));
  }

  public confirm(urlCode: string, code: string, callback, error) {
    const url: string = `${this.apiUrl}/confirm/${urlCode}/${code}`;
    const body = {}

    return this.http.post(url, body).toPromise().then(response => callback(response)).catch(err => error(err));

  }

  private parseError(error: any): Promise<any> {
    console.error('An error has occured', error);
    return Promise.reject(error.message || error);
  }
}
