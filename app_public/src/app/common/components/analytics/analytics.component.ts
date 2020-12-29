import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  @Input()
  analytics: object

  constructor() { }

  ngOnInit(): void {
  }

}
