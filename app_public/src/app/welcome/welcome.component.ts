import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  @Input()
  message: string;
  welcomeMessage: string;

  constructor() { }

  ngOnInit(): void {
  }

}
