import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../services/api.service';
import { Card } from '../../classes/card';
import { Bill } from '../../classes/bill';
declare var $:any;

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

    constructor(private api: ApiService) { }

    public cards: Card[]
    public pageData: any;
    public categories: any;
    //public bills: any;
    bills: Bill[]
    fileName: string = "bills";
    message = "Welcome to Bills!";
    welcomeMessage = "Here you can add recurring bills. Fill in the form, submit and it will be added to an envelope repeteadly!";
    logout = "Logout";
    DASHBOARD = "DASHBOARD";
    ENVELOPES = "ENVELOPES";
    GOALS = "GOALS";
    BILLS = "BILLS";
    HISTORY = "HISTORY";
    UTILITIES = "UTILITIES";
    user = "User";
    settings = "Settings";
    appearance = "Appearance";
    light = "Light";
    dark = "Dark";    
    currency = "EUR"

    ngOnInit(): void {
        this.api.getUser().then(result => {
            this.bills = this.generateBills(result.bills)
            this.cards = this.generateCards();
            this.categories = result.categories;
            
        }).catch(error => console.log(error));
    }

    @ViewChild('nameAdd') nameAdd: ElementRef;
    @ViewChild('amountAdd') amountAdd: ElementRef;
    @ViewChild('dateAdd') dateAdd: ElementRef;

    faPlusSquare = faPlusSquare;

    generateBills(bills) {
        var billsArray = []
        for (var bill of bills) {
            var date = bill.date.split('T')[0].split('-');
            var newBill: Bill = {
                _id: bill._id, 
                recipient: bill.recipient,
                value: bill.value,
                category: bill.category.name,
                currency: bill.currency,
                repeat: bill.repeating,
                year: date[0],
                month: date[1],
                day: date[2],
                monthName: this.translateMonth(date[1]),
                date: bill.date
            }
            billsArray.push(newBill);
        }
        billsArray.sort(this.compare)
        return billsArray;
    }

    compare(a, b) { //1 menjava, -1 ni menjava
        if (a.year < b.year) {
            return 1;
        } else if (a.year == b.year) {
            if (a.month < b.month) {
                return 1;
            } else if (a.month == b.month) {
                if (a.day < b.day) {
                    return 1;
                } else {
                    return -1;
                }
            } else {
                return -1;
            }
        } else {
            return -1;
        }
        return 0;
    }

    translateMonth(month) {
        switch (month) {
            case '01':
                return "JAN";
            case '02':
                return "FEB";
            case '03':
                return "MAR";
            case '04':
                return "APR";
            case '05':
                return "MAY";
            case '06':
                return "JUN";
            case '07':
                return "JUL";
            case '08':
                return "AUG";
            case '09':
                return "SEP";
            case '10':
                return "OCT";
            case '11':
                return "NOV";
            case '12':
                return "DEC";
        }
    }

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

    generateCards() {
        const nearBills = this.getBillsInTheNext7Days();

        return [
        new Card(1, 'bg-primary', 'faPaperclip', this.bills.length, 'Bills Total', null),
        new Card(21, 'bg-warning', 'faCalendar', nearBills.length, 'Bills This Week', this.generateComment(nearBills)),
        ];
    }

    getBillsInTheNext7Days() {
        const currentTime = new Date();
        var billsArray = [];

        for (var bill of this.bills) {
            const billDate = new Date(bill.date).getTime();
            const diff = (billDate - currentTime.getTime()) / 86400000;

            if (diff < 7) {
                billsArray.push(bill);
            }
        }
        return billsArray;
    }

    generateComment(bills) {
        var comment = '';

        var bill = this.findClosestBill(bills);
        if (!bill) return comment;
        const billDate = new Date(Date.parse(bill.date));
        const dtfUK = new Intl.DateTimeFormat('UK', { month: '2-digit', day: '2-digit' });
        comment = "Closest bill:\n" + bill.recipient + " - " + dtfUK.format(billDate);

        return comment;
    }

    findClosestBill(bills) {
        var nearestBill = null;
        const currentTime = new Date();
    
        var minDiff = null
        for (var bill of bills) {
            const billDate = new Date(Date.parse(bill.date)).getTime();
            const diff = (billDate - currentTime.getTime());
    
            if (!minDiff || diff < minDiff) {
                minDiff = diff;
                nearestBill = bill;
            }
        }
    
        return nearestBill
    }

    afterDelete(billId){
        const index = this.bills.findIndex(billObject => billObject._id === billId)
        if (index > -1) {
         this.bills.splice(index, 1);
        }
        this.cards = this.generateCards();
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
