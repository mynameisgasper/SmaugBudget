import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  id: number;
  @Input()
  color: string;
  @Input()
  icon: string;
  @Input()
  count: number;
  @Input()
  title: string;
  @Input()
  comment: string;

  constructor() { }

  ngOnInit(): void {
  }

}
