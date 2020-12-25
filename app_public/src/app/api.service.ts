import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Converter } from './converter';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private authorization: AuthenticationService) { }

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

  public getUser(callback, error): Promise<any> {
    if (this.authorization.getLoggedIn()) {
      const url: string = `${this.apiUrl}/getUser`;  
      const options = {
        headers: new HttpHeaders().set('Authorization', this.authorization.generateCompleteJwt())
      }

      return this.http.get(url, options).toPromise().then(response => callback(response)).catch(err => error(err));
    }
    else {
      error('Not logged in');
    }
  }

  private parseError(error: any): Promise<any> {
    console.error('An error has occured', error);
    return Promise.reject(error.message || error);
  }
}
