import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputMemberPipe'
})
export class InputMemberPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `inputMember${value}`;
  }

}
