import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input()
  type: string;
  @Input()
  name: string;
  @Input()
  text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
