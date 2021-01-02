import { Component, OnInit, ElementRef, ViewChild, Renderer2} from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../services/api.service';
import { Card } from '../../classes/card';
import { Bill } from '../../classes/bill';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
declare var $:any;

declare var getTranslation: any;
declare var setLanguage: any;

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

    constructor(
        private api: ApiService,
        private renderer: Renderer2,
        private router: Router, 
        private authentication: AuthenticationService    
    ) { }

    public cards: Card[]
    public pageData: any;
    public categories: any;
    bills: Bill[]
    fileName: string = "bills";
    message = getTranslation("messageBills");
    welcomeMessage = getTranslation("welcomeMessageBills");
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
    currency: string;

    billsAll = getTranslation("billsAll");
	billAdd = getTranslation("billAdd");
	billsPayee = getTranslation("billsPayee");
	billsDue = getTranslation("billsDue");
	billsOften = getTranslation("billsOften");
	billsOnce = getTranslation("billsOnce");
	billsMonth = getTranslation("billsMonth");
    billsYear = getTranslation("billsYear");
    HINT = getTranslation("HINT");
    envelopestt2 = getTranslation("envelopestt2");
    envelopestt3 = getTranslation("envelopestt3");
    goalsDateHint = getTranslation("goalsDateHint");
    envelopesCategory = getTranslation("envelopesCategory");
    envelopesSelCat = getTranslation("envelopesSelCat");
    envelopesAmount = getTranslation("envelopesAmount");

    hasAddMessage: boolean = false;
    addMessage: string = "";

    ngOnInit(): void {
        this.api.getUser().then(result => {
            this.refreshLanguage(result.language);
            this.bills = this.generateBills(result.bills)
            this.cards = this.generateCards();
            this.categories = result.categories;
            this.currency = result.defaultCurrency;  
        }).catch(error => {
            this.authentication.logout();
            this.router.navigate(['/']);      
        });
    }

    @ViewChild('nameAdd') nameAdd: ElementRef;
    @ViewChild('amountAdd') amountAdd: ElementRef;
    @ViewChild('dateAdd') dateAdd: ElementRef;
    @ViewChild('addBillModal') addBillModal: ElementRef;

    faPlusSquare = faPlusSquare;

    refreshLanguage(language: string) {
        setLanguage(language);
            
        this.message = getTranslation("messageBills");
        this.welcomeMessage = getTranslation("welcomeMessageBills");
        this.billsAll = getTranslation("billsAll");
	    this.billAdd = getTranslation("billAdd");
	    this.billsPayee = getTranslation("billsPayee");
	    this.billsDue = getTranslation("billsDue");
	    this.billsOften = getTranslation("billsOften");
	    this.billsOnce = getTranslation("billsOnce");
	    this.billsMonth = getTranslation("billsMonth");
        this.billsYear = getTranslation("billsYear");
        this.HINT = getTranslation("HINT");
        this.envelopestt2 = getTranslation("envelopestt2");
        this.envelopestt3 = getTranslation("envelopestt3");
        this.goalsDateHint = getTranslation("goalsDateHint");
        this.envelopesCategory = getTranslation("envelopesCategory");
        this.envelopesSelCat = getTranslation("envelopesSelCat");
        this.envelopesAmount = getTranslation("envelopesAmount");
    }
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

    compare(b, a) { //1 menjava, -1 ni menjava
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

    buttonAddBills(categoryValue: string, payeeValue: string, amountValue: number, dateValue: Date, repeatValue: String) {
        var amount1 = this.amountAddBills();
        var check1 = this.nameAddBills();
        var date1 = this.dateAddBills();
        if (amount1 == 0 || check1 == 0 || date1 == 0) {
            return false;
        } else {
            this.addBill(categoryValue, payeeValue, amountValue, dateValue, repeatValue);
        }
    }

    addBill(category, payee, amount, date, repeat){
        this.hasAddMessage = true;
        this.addMessage = "Saving bill";

        this.api.addBill(category, payee, amount, date, repeat).then((response) => {
            this.addBillModal.nativeElement.click();
            this.afterAddBill(response);
            this.hasAddMessage = false;
        }).catch((error) => {
            this.addMessage = "Failed to save!";
        });
    }

    afterAddBill(bill){
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
        this.bills.push(newBill);
        this.bills.sort(this.compare);

        this.cards = this.generateCards();
    }

    generateCards() {
        const nearBills = this.getBillsInTheNext7Days();

        return [
        new Card(1, 'bg-primary', 'faPaperclip', this.bills.length, getTranslation("billsTotal"), null),
        new Card(21, 'bg-warning', 'faCalendar', nearBills.length, getTranslation("billsWeek"), this.generateComment(nearBills)),
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
        var comment = getTranslation("billsNone");

        var bill = this.findClosestBill(bills);
        if (!bill) return comment;
        const billDate = new Date(Date.parse(bill.date));
        const dtfUK = new Intl.DateTimeFormat('UK', { month: '2-digit', day: '2-digit' });
        comment = getTranslation("billsClose") + ":\n" + bill.recipient + " - " + dtfUK.format(billDate);

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

    afterEdit(bill){
        var billObject = this.bills.find(billObject => billObject._id === bill._id)
        var date = bill.date.split('T')[0].split('-');

        billObject._id = bill._id;
        billObject.category = bill.category.name;
        billObject.currency = bill.currency;
        billObject.date = bill.date;
        billObject.day = date[2];
        billObject.month = date[1];
        billObject.monthName = this.translateMonth(date[1]);
        billObject.recipient = bill.recipient;
        billObject.repeat = bill.repeating;
        billObject.value = bill.value;
        billObject.year = date[0];

        this.cards = this.generateCards();
    }
}
