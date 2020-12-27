import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../classes/card';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  card: Card

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
