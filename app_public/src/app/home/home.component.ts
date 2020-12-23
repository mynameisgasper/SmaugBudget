import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import {Router} from "@angular/router"
import { ApiService } from '../api.service'

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit {

  constructor(private api: ApiService, private router: Router, @Inject(DOCUMENT) private document: HTMLDocument) { }

  ngOnInit(): void {
  }

  register(firstname: string, lastname: string, email1: string, email2: string, password1: string, password2: string): void {
    if (firstname && lastname && email1 && email1 === email2 && password1 && password1 === password2) {
      this.api.register(firstname, lastname, email1, email2, password1, password2, (response) => {
        
        var elementList = this.document.querySelectorAll('.modal-backdrop');
        for (let i = 0; i < elementList.length; i++) {
          elementList[i].removeAttribute('class');
        }

        var elementList = this.document.querySelectorAll('.modal-open');
        for (let i = 0; i < elementList.length; i++) {
          document.removeChild(elementList[i])
        }

        
        this.router.navigate(['/confirm', response.urlCode]);
      });
    }
  }
}
