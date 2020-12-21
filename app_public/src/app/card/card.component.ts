import { Component, OnInit, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faUniversity, faCoins, faPiggyBank, faBug } from '@fortawesome/free-solid-svg-icons';

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

  ic: IconDefinition

  translateIcon(icon: string): IconDefinition {
    if (icon == 'faUniversity') return faUniversity;
    else if (icon == 'faCoins') return faCoins;
    else if (icon == 'faPiggyBank') return faPiggyBank;
    else return faBug;
  }

  constructor() { }

  ngOnInit(): void {
    this.ic = this.translateIcon(this.icon);
  }

}
