import { Component, OnInit, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-utilities-edit-modal',
  templateUrl: './utilities-edit-modal.component.html',
  styleUrls: ['./utilities-edit-modal.component.css']
})
export class UtilitiesEditModalComponent implements OnInit {

  @Input()
  Friend = {
    "id":"",
    "Group":"",
    "Next":"",
    "Balance":0,
    "groupMember":[{
        "id":"",
        "name":"",
        "amount":0
    }]
  }

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
    ){ }

  @ViewChild('price') price: ElementRef;
  @ViewChild('paid') paid: ElementRef;

  ngOnInit(): void {
  }

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
}
