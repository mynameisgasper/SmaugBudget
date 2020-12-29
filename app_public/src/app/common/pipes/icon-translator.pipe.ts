import { Pipe, PipeTransform } from '@angular/core';
import { IconDefinition, faBug, faUniversity, faCoins, faPiggyBank, faEnvelope, faExclamationTriangle, faRadiation, faBullseye, faCheckCircle, faCalendar, faPaperclip } from '@fortawesome/free-solid-svg-icons';

@Pipe({
  name: 'iconTranslator'
})
export class IconTranslatorPipe implements PipeTransform {

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

  transform(name: string): unknown {
    console.log(name);
    return this.translateIcon(name);
  }

}
