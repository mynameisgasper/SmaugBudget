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

  private apiUrl = `${window.location.href.substr(0, window.location.href.lastIndexOf('/')).replace('4200', '8080')}/api`;
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

  public getExpense(filter?: string, limit?: number, offset?: number): Promise<Object> {
    if (this.authorization.getLoggedIn()) {
      const url: string = `${this.apiUrl}/getExpenses?filter=${filter}&limit=${limit}&offset=${offset}`;  
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

  public editGoal(goalId, name, category, amount, date): Promise<any> {
    if (this.authorization.getLoggedIn()) {
      const url: string = `${this.apiUrl}/editGoal`; 
      const body = {
        'goal_id': goalId,
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

  public addFriendGroup(groupName: String, groupMembers: Array<String>): Promise<any> {
    console.log(groupMembers);
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

  public deleteBill(billId): Promise<any> {
    if (this.authorization.getLoggedIn()) {
      const url: string = `${this.apiUrl}/deleteBill`; 
      const body = {
        'bill_id': billId,
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

  public addBill(category, payee, amount, date, repeat): Promise<any> {
    if (this.authorization.getLoggedIn()) {
      console.log(category);
      const url: string = `${this.apiUrl}/addBill`; 
      const body = {
        'inputCategory': category,
        'Payee': payee,
        'Amount': amount,
        'inputDateAddBill': date,
        'rad': repeat
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

  public editBill(billId, category, payee, amount, date, repeat): Promise<any> {
    if (this.authorization.getLoggedIn()) {
      console.log(category);
      const url: string = `${this.apiUrl}/editBill`; 
      const body = {
        'billId': billId,
        'inputCategory': category,
        'payee': payee,
        'amount': amount,
        'date': date,
        'repeat': repeat
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

  public updateUser(email, firstName, lastName): Promise<any> {
    if (this.authorization.getLoggedIn()) {
      console.log(email);
      const url: string = `${this.apiUrl}/updateUser`; 
      const body = {
        'email': email,
        'firstName': firstName,
        'lastName': lastName
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

  public setDefaultCurrency(currency): Promise<any> {
    if (this.authorization.getLoggedIn()) {
      
      const url: string = `${this.apiUrl}/updateUser`; 
      const body = {
        'defaultCurrency': currency
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

  public setLanguage(language): Promise<any> {
    if (this.authorization.getLoggedIn()) {
      
      const url: string = `${this.apiUrl}/updateUser`; 
      const body = {
        'language': language
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

  public postFile(fileToUpload: File): Promise<any> {
    if (this.authorization.getLoggedIn()) {
      
      const url: string = `${this.apiUrl}/uploadPfp`; 
      const body = {
        
      }
      const formData: FormData = new FormData();
      formData.append('image', fileToUpload, fileToUpload.name);
      const options = {
        headers: new HttpHeaders().set('Authorization', this.authorization.generateCompleteJwt())
      }
      return this.http.post(url, formData, options).toPromise().then(response => response).catch(err => this.parseError(err));
    }
    else {
      this.parseError('Error');
    }
  }

  public changeColor(category: string, color: string): Promise<any> {
    const url: string = `${this.apiUrl}/changeColorCategory`;

    const options = {
      headers: new HttpHeaders().set('Authorization', this.authorization.generateCompleteJwt()),
    }
    const body: object = {
      colorPicker: color,
      category_id: category
    }

    return this.http.post(url, body, options).toPromise().then(response => response).catch(err => this.parseError(err));
  }

  public getPfp() : Promise<any> {
    const url: string = `${this.apiUrl}/getPfp`;

    const options = {
      headers: new HttpHeaders().set('Authorization', this.authorization.generateCompleteJwt()),
      responseType: 'blob' as 'json',
    }

    return this.http.get(url, options).toPromise().then(response => response).catch(err => this.parseError(err));
  }

  public updatePassword(oldPass: string, newPass1: string, newPass2: string): Promise<any> {
    const url: string = `${this.apiUrl}/changePassword`;

    const options = {
      headers: new HttpHeaders().set('Authorization', this.authorization.generateCompleteJwt()),
    }
    const body: object = {
      oldPassword: oldPass,
      newPassword1: newPass1,
      newPassword2: newPass2
    }

    return this.http.post(url, body, options).toPromise().then(response => response).catch(err => this.parseError(err));
  }

  public deleteCategory(cId: string): Promise<any> {
    const url: string = `${this.apiUrl}/deleteCategory`;

    const options = {
      headers: new HttpHeaders().set('Authorization', this.authorization.generateCompleteJwt()),
    }
    const body: object = {
      category_id: cId
    }

    return this.http.post(url, body, options).toPromise().then(response => response).catch(err => this.parseError(err));
  }

  public deleteGroup(friendGroupId): Promise<any> {
    if (this.authorization.getLoggedIn()) {
      const url: string = `${this.apiUrl}/deleteFriendGroup`; 
      const body = {
        'group_id': friendGroupId,
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

  public calculateBalances(pricePaidArrayStringified, group_id): Promise<any> {
    if (this.authorization.getLoggedIn()) {
      const url: string = `${this.apiUrl}/calculateBalances`; 
      const body = {
        'friends': pricePaidArrayStringified,
        'group_id': group_id
      }
      console.log(body);
      const options = {
        headers: new HttpHeaders().set('Authorization', this.authorization.generateCompleteJwt())
      }
      return this.http.post(url, body, options).toPromise().then(response => response).catch(err => this.parseError(err));
    }
    else {
      this.parseError('Error');
    }
  }

  public deleteUser(): Promise<any> {
    if (this.authorization.getLoggedIn()) {
      const url: string = `${this.apiUrl}/deleteUser`; 
      const body = {
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
