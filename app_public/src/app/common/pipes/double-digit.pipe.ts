import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doubleDigit'
})
export class DoubleDigitPipe implements PipeTransform {

  transform(value: number): string {
    return ("0" + value).slice(-2);
  }
}
