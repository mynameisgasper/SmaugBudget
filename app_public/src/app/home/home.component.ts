import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../api.service'

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  register(firstname: string, lastname: string, email1: string, email2: string, password1: string, password2: string): void {
    if (firstname && lastname && email1 && email1 === email2 && password1 && password1 === password2) {
      console.log(firstname, lastname, email1, email2, password1, password2);
      this.api.register(firstname, lastname, email1, email2, password1, password2, (response) => {
        console.log(response);
      });
    }
  }
}
