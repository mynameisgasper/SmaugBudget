import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Converter } from '../classes/converter';
import { AuthenticationService } from './authentication.service';
import { User } from '../classes/user';
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

  public addEnvelope(category: string, amount: number, color: string, month: number): Promise<any> {
    const url: string = `${this.apiUrl}/addEnvelope`;

    const options = {
      headers: new HttpHeaders().set('Authorization', this.authorization.generateCompleteJwt()),
    }
    const body: object = {
      colorPicker: color,
      categoryAddEnvelope: category,
      inputAmount: amount,
      month: month
    }

    return this.http.post(url, body, options).toPromise().then(response => response).catch(err => this.parseError(err));
  }

  public editEnvelope(id: string, amount: number): Promise<any> {
    const url: string = `${this.apiUrl}/editEnvelope`;

    const options = {
      headers: new HttpHeaders().set('Authorization', this.authorization.generateCompleteJwt()),
    }
    const body: object = {
      id: id,
      inputAmount: amount,
    }

    return this.http.post(url, body, options).toPromise().then(response => response).catch(err => this.parseError(err));
  }

  public deleteEnvelope(id: string): Promise<any> {
    const url: string = `${this.apiUrl}/deleteEnvelope`;

    const options = {
      headers: new HttpHeaders().set('Authorization', this.authorization.generateCompleteJwt()),
    }
    const body: object = {
      envelope_id: id
    }

    return this.http.post(url, body, options).toPromise().then(response => response).catch(err => this.parseError(err));
  }

  public addExpense(amount: number, category: string, name: string, date: number): Promise<any> {
    const url: string = `${this.apiUrl}/addExpense`;

    const options = {
      headers: new HttpHeaders().set('Authorization', this.authorization.generateCompleteJwt()),
    }
    const body: object = {
      inputAmount: amount,
      category: category,
      recipient: name,
      date: date
    }

    return this.http.post(url, body, options).toPromise().then(response => response).catch(err => this.parseError(err));
  }

  public editExpense(id: string, category: string, name: string, amount: number, date: number): Promise<any> {
    const url: string = `${this.apiUrl}/editExpense`;

    const options = {
      headers: new HttpHeaders().set('Authorization', this.authorization.generateCompleteJwt()),
    }
    const body: object = {
      expId: id,
      expCategory: category,
      payee: name,
      amount: amount,
      date: date
    }

    return this.http.post(url, body, options).toPromise().then(response => response).catch(err => this.parseError(err));
  }

  public changeIncome(amount: number, day: number): Promise<any> {
    const url: string = `${this.apiUrl}/changeIncome`;

    const options = {
      headers: new HttpHeaders().set('Authorization', this.authorization.generateCompleteJwt()),
    }
    const body: object = {
      amount: amount,
      date: day
    }

    return this.http.post(url, body, options).toPromise().then(response => response).catch(err => this.parseError(err));
  }

  public getUser(): Promise<User> {
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

  public addMoneyToGoal(amount, title): Promise<any> {
    if (this.authorization.getLoggedIn()) {
      const url: string = `${this.apiUrl}/addToGoalWithCategory`; 
      const body = {
        'title': title,
        'amount': amount,
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

  public deleteGoal(goalId): Promise<any> {
    if (this.authorization.getLoggedIn()) {
      const url: string = `${this.apiUrl}/deleteGoal`; 
      const body = {
        'goal_id': goalId,
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

  public addFriendGroup(groupName: String, groupMembers: Array<String>): Promise<any> {
    if (this.authorization.getLoggedIn()) {
      const url: string = `${this.apiUrl}/addFriendGroup`; 
      const body = {
        name: groupName,
        friends: JSON.stringify(groupMembers)
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