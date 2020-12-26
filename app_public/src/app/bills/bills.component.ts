import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { Card } from '../card';
declare var $:any;

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  constructor(private api: ApiService) { }

  cards: Card[]

  ngOnInit(): void {
    this.api.getUser().then(result => {
        this.cards = this.generateCards(result.bills);
        console.log(this.cards);
      }).catch(error => console.log(error));
  }

  @ViewChild('nameAdd') nameAdd: ElementRef;
  @ViewChild('amountAdd') amountAdd: ElementRef;
  @ViewChild('dateAdd') dateAdd: ElementRef;

  faPlusSquare = faPlusSquare;

  nameAddBills(): number {
    const field = this.nameAdd.nativeElement;
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[ A-Za-z0-9_@./#&+-: ]{1,20}$");
    //črkev male,velike,številke
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt1').toast('show');
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt1').toast('hide');
        return 1;
    }
  }

  amountAddBills(): number {
    const field = this.amountAdd.nativeElement;
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt2').toast('show');
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt2').toast('hide');
        return 1;
    }
  }

  dateAddBills() {
    const field = this.dateAdd.nativeElement;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var inputDate = field.value.split("-");

    if (inputDate[0] > yyyy) {
        $('.tt5').toast('hide');
        field.style.borderColor = "#ced4da";
        return 1;
    } else if (inputDate[0] == yyyy) {
        if (inputDate[1] > mm) {
            $('.tt5').toast('hide');
            field.style.borderColor = "#ced4da";
            return 1;
        } else if (inputDate[1] == mm) {
            /* 
            ? IF DAY IS >= NOW */
            if (inputDate[2] >= dd) {
                $('.tt5').toast('hide');
                field.style.borderColor = "#ced4da";
                return 1;
            } else {
                $('.tt5').toast('show');
                field.style.setProperty("border-color", "red", "important");
                return 0;
            }
        } else {
            $('.tt5').toast('show');
            field.style.setProperty("border-color", "red", "important");
            return 0;
        }
    } else {
        $('.tt5').toast('show');
        field.style.setProperty("border-color", "red", "important");
        return 0;
    }
  }

  buttonAddBills() {
    var amount1 = this.amountAddBills();
    var check1 = this.nameAddBills();
    var date1 = this.dateAddBills();
    if (amount1 == 0 || check1 == 0 || date1 == 0) {
        return false;
    } else {
        return true;
    }
  }

  generateCards(bills) {

    return [
      new Card(1, 'bg-primary', 'faPaperclip', 2, 'Bills Total', null),
      new Card(21, 'bg-warning', 'faCalendar', 1, 'Bills This Week', 'Closest bill: Telemach - 12/30'),
    ];
  }

  data = {
    "bills": true,
    "fileName": "bills",
    "message": "Welcome to Bills!",
    "welcomeMessage": "Here you can add recurring bills. Fill in the form, submit and it will be added to an envelope repeteadly!",
    "logout": "Logout",
    "DASHBOARD": "DASHBOARD",
    "ENVELOPES": "ENVELOPES",
    "GOALS": "GOALS",
    "BILLS": "BILLS",
    "HISTORY": "HISTORY",
    "UTILITIES": "UTILITIES",
    "user": "User",
    "settings": "Settings",
    "appearance": "Appearance",
    "light": "Light",
    "dark": "Dark",
    "categories": [{
            "color": "rgb(50, 168, 156)",
            "basic": true,
            "_id": "5fc600b4507a6800112af1d5",
            "name": "Car"
        },
        {
            "color": "rgb(232, 176, 23)",
            "basic": true,
            "_id": "5fc600b4507a6800112af1d6",
            "name": "Groceries"
        },
        {
            "color": "rgb(191, 33, 194)",
            "basic": true,
            "_id": "5fc600b4507a6800112af1d7",
            "name": "Leisure"
        },
        {
            "color": "rgb(209, 23, 104)",
            "basic": true,
            "_id": "5fc600b4507a6800112af1d8",
            "name": "Subscriptions"
        },
        {
            "color": "rgb(88, 52, 179)",
            "basic": true,
            "_id": "5fc600b4507a6800112af1d9",
            "name": "Travel"
        },
        {
            "color": "rgb(173, 209, 52)",
            "basic": true,
            "_id": "5fc600b4507a6800112af1da",
            "name": "Home"
        },
        {
            "color": "rgb(50, 168, 82)",
            "basic": true,
            "_id": "5fc600b4507a6800112af1db",
            "name": "Gifts"
        },
        {
            "color": "rgb(209, 73, 23)",
            "basic": true,
            "_id": "5fc600b4507a6800112af1dc",
            "name": "Shopping"
        },
        {
            "color": "rgb(81, 219, 237)",
            "basic": true,
            "_id": "5fc600b4507a6800112af1dd",
            "name": "Utilities"
        },
        {
            "color": "rgb(40, 235, 79)",
            "basic": true,
            "_id": "5fc600b4507a6800112af1de",
            "name": "Electronics"
        }
    ],
    "card": [{
            "id": 1,
            "title": "Bills Total",
            "color": "bg-primary",
            "count": 2,
            "icon": "faPaperclip"
        },
        {
            "id": 21,
            "title": "Bills This Week",
            "color": "bg-warning",
            "count": 1,
            "icon": "faCalendar",
            "comment": "Closest bill: Telemach - 12/30"
        }
    ],
    "bill": [{
            "_id": "5fc600b4507a6800112af23f",
            "year": "2021",
            "month": "01",
            "monthName": "JAN",
            "day": "04",
            "category": "Car",
            "recipient": "Sparkasse",
            "value": 310,
            "currency": "EUR",
            "repeat": "monthly"
        },
        {
            "_id": "5fc600b4507a6800112af23d",
            "year": "2020",
            "month": "12",
            "monthName": "DEC",
            "day": "30",
            "category": "Utilities",
            "recipient": "Telemach",
            "value": 66,
            "currency": "EUR",
            "repeat": "monthly"
        }
    ],
    "currency": "EUR"
  }

}
