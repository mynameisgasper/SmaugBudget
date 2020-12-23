import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DOCUMENT } from '@angular/common'
import { ApiService } from '../api.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  url: string;
  code: string;

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, @Inject(DOCUMENT) private document: HTMLDocument) { }

  ngOnInit(): void {
    this.url = this.route.snapshot.paramMap.get('url');
    this.code = this.route.snapshot.paramMap.get('code');

    if (this.url && this.code) {
      this.submit(this.code);
    }
  }

  submit(code: string) {
    this.api.confirm(this.url, code, (response) => {
      this.router.navigate(['']);
    }, (error) => {
      console.log(error);
      var elementList = this.document.querySelectorAll('#alert');
      for (let i = 0; i < elementList.length; i++) {
        elementList[i].removeAttribute('style');
      }
    });
  }
}
