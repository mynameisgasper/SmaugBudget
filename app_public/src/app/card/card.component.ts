import { Component, OnInit, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faBug, faUniversity, faCoins, faPiggyBank, faEnvelope, faExclamationTriangle, faRadiation, faBullseye, faCheckCircle, faCalendar, faPaperclip } from '@fortawesome/free-solid-svg-icons';

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
    else if (icon == 'faEnvelope') return faEnvelope;
    else if (icon == 'faExclamationTriangle') return faExclamationTriangle;
    else if (icon == 'faRadiation') return faRadiation;
    else if (icon == 'faBullseye') return faBullseye;
    else if (icon == 'faCheckCircle') return faCheckCircle;
    else if (icon == 'faPaperclip') return faPaperclip;
    else if (icon == 'faCalendar') return faCalendar;
    else return faBug;
  }

  constructor() { }

  ngOnInit(): void {
    this.ic = this.translateIcon(this.icon);
  }

}
