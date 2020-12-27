import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthNumberPipe'
})
export class TranslateMonthNumberPipe implements PipeTransform {

  getMonthName(month: number): string {
    var monthArray = new Array();
    monthArray[0] = "JAN";
    monthArray[1] = "FEB";
    monthArray[2] = "MAR";
    monthArray[3] = "APR";
    monthArray[4] = "MAY";
    monthArray[5] = "JUN";
    monthArray[6] = "JUL";
    monthArray[7] = "AUG";
    monthArray[8] = "SEP";
    monthArray[9] = "OCT";
    monthArray[10] = 'NOV';
    monthArray[11] = 'DEC';

    return monthArray[month];
  }

  transform(month: any): unknown {
    return this.getMonthName(month);
  }
}
