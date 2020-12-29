import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyTranslator'
})
export class CurrencyTranslatorPipe implements PipeTransform {

  transform(code: string): unknown {
    switch (code) {
      case 'AUD': return 'Australian dollar';
      case 'BGN': return 'Bulgarian lev';
      case 'BRL': return 'Brazilian real';
      case 'CAD': return 'Canadian dollar';
      case 'CHF': return 'Swiss franc';
      case 'CNY': return 'Chinese yuan';
      case 'CZK': return 'Czech koruna';
      case 'EUR': return 'Euro';
      case 'GBP': return 'British Pound sterling';
      case 'HKD': return 'Hong Kong dollar';
      case 'HRK': return 'Croatian kuna';
      case 'HUF': return 'Hungarian forint';
      case 'ILS': return 'Israeli new shekel';
      case 'INR': return 'Indian rupee';
      case 'ISK': return 'Icelandic króna';
      case 'JPY': return 'Japanese yen';
      case 'KRW': return 'South Korean won';
      case 'MXN': return 'Mexican peso';
      case 'MYR': return 'Malaysian ringgit';
      case 'NOK': return 'Norwegian krone';
      case 'NZD': return 'New Zealand dollar';
      case 'PHP': return 'Philippine peso';
      case 'PLN': return 'Polish złoty';
      case 'RON': return 'Romanian leu';
      case 'RUB': return 'Russian ruble';
      case 'SEK': return 'Swedish krona';
      case 'SGD': return 'Singapore dollar';
      case 'THB': return 'Thai baht';
      case 'TRY': return 'Turkish lira';
      case 'USD': return 'United States dollar';
      default: return 'Unkonwn';
    }
  }
}
