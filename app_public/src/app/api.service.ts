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

  public converter(currency1: string, currency2: string, value: number): Promise<Converter> {
    const url: string = `${this.apiUrl}/converter`;

    const options = {
      headers: new HttpHeaders().set('Authorization', this.authorization.generateCompleteJwt()),
      params: new HttpParams().append('curr1', currency1).append('curr2', currency2).append('amm1' , value.toString())
    }

    return this.http.get(url, options).toPromise().then(response => response).catch(err => this.parseError(err));
  }

  public getUser(): Promise<any> {
    if (this.authorization.getLoggedIn()) {
      const url: string = `${this.apiUrl}/getUser`;  
      const options = {
        headers: new HttpHeaders().set('Authorization', this.authorization.generateCompleteJwt())
      }

      return this.http.get(url, options).toPromise().then(response => response).catch(err => this.parseError(err));
    }
    else {
      this.parseError('Error');
    }
  }

  public addGoal(name, category, amount, date): Promise<any> {
    if (this.authorization.getLoggedIn()) {
      const url: string = `${this.apiUrl}/addGoal`; 
      const body = {
        'name': name,
        'category': category,
        'amount': amount,
        'date': date,
      }
      const options = {
        headers: new HttpHeaders().set('Authorization', this.authorization.generateCompleteJwt())
      }
      return this.http.post(url, body, options).toPromise().then(response => response).catch(err => this.parseError(err));
    }
    else {
      this.parseError('Error');
    }
  }

  private parseError(error: any): Promise<any> {
    console.error('An error has occured', error);
    return Promise.reject(error.message || error);
  }
}
