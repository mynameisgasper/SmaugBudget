import { Component, OnInit, Input, ElementRef, ViewChild  } from '@angular/core';
import { faMinusSquare, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
declare var $:any;

@Component({
  selector: 'tr [app-bill-table]',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.css']
})
export class BillTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('nameEdit') nameEdit: ElementRef;
  @ViewChild('amountEdit') amountEdit: ElementRef;
  @ViewChild('dateEdit') dateEdit: ElementRef;

  faMinusSquare = faMinusSquare;
  faPencilAlt = faPencilAlt

  nameEditBills(): number {
    const field = this.nameEdit.nativeElement;
    var regex = new RegExp("^[ A-Za-z0-9_@./#&+-: ]{1,20}$");
    //črkev male,velike,številke
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $(field.id).toast('show');
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $(field.id).toast('hide');
        return 1;
    }
  }

  amountEditBills(): number {
    const field = this.amountEdit.nativeElement;
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $(field.id).toast('show');
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $(field.id).toast('hide');
        return 1;
    }
  }

  dateEditBills(): number {
    const field = this.dateEdit.nativeElement;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var inputDate = field.value.split("-");

    if (inputDate[0] > yyyy) {
        $(field.id).toast('hide');
        field.style.borderColor = "#ced4da";
        return 1;
    } else if (inputDate[0] == yyyy) {
        if (inputDate[1] > mm) {
            $(field.id).toast('hide');
            field.style.borderColor = "#ced4da";
            return 1;
        } else if (inputDate[1] == mm) {
            /* 
            ? IF DAY IS >= NOW */
            if (inputDate[2] >= dd) {
                $(field.id).toast('hide');
                field.style.borderColor = "#ced4da";
                return 1;
            } else {
                $(field.id).toast('show');
                field.style.setProperty("border-color", "red", "important");
                return 0;
            }
        } else {
            $(field.id).toast('show');
            field.style.setProperty("border-color", "red", "important");
            return 0;
        }
    } else {
        $(field.id).toast('show');
        field.style.setProperty("border-color", "red", "important");
        return 0;
    }
  }

  buttonEditBills() {

    var amount1 = this.amountEditBills();
    var check1 = this.nameEditBills();
    var date1 = this.dateEditBills();
    if (amount1 == 0 || check1 == 0 || date1 == 0) {
      //DO NOTHING
    } else {
      //POST REQUEST - TO BE ADDED
    }
  }


  @Input()
  data = {
    "_id": "",
    "year": "",
    "month": 0,
    "monthName": "",
    "day": "",
    "category": "",
    "recipient": "",
    "value": 0,
    "currency": "",
    "repeat": ""
  }

  @Input()
  Currency: string

  @Input()
  Categories = {
    "color": "",
    "basic": true,
    "_id": "",
    "name": ""
  }

  
  

}
