import { Component, OnInit, Input, ElementRef, ViewChild, } from '@angular/core';

declare var $:any;

@Component({
  selector: 'tr [app-utilities-member-row]',
  templateUrl: './utilities-member-row.component.html',
  styleUrls: ['./utilities-member-row.component.css']
})
export class UtilitiesMemberRowComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
  }

  @ViewChild('price') price: ElementRef;
  @ViewChild('paid') paid: ElementRef;

  @Input()
    member:any

    valueGroupsUtilities(): number {
      const field = this.price.nativeElement;
      var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
      //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
      //črkev male,velike,številke
      if (!regex.test(field.value)) {
          field.style.setProperty("border-color", "red", "important");
          $('.tt1').toast('show')
          return 0;
      } else {
          field.style.borderColor = "#ced4da";
          $('.tt1').toast('hide')
          return 1;
      }
    }
  
    valueGroupsUtilities2(): number {
      const field = this.paid.nativeElement;
      var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
      //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
      //črkev male,velike,številke
      if (!regex.test(field.value)) {
          field.style.setProperty("border-color", "red", "important");
          $('.tt1').toast('show')
          return 0;
      } else {
          field.style.borderColor = "#ced4da";
          $('.tt1').toast('hide')
          return 1;
      }
    }

    disableButtonMember(): void {
      var price = this.valueGroupsUtilities();
      var paid = this.valueGroupsUtilities2();

      if (price == 0 || paid == 0 ) {
          //DO NOTHING
      } else {
          //POST REQUEST - TO BE ADDED
      }
    }
}

