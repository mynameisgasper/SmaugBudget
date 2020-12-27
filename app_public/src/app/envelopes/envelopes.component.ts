import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { Card } from '../card';
declare var $:any;

@Component({
  selector: 'app-envelopes',
  templateUrl: './envelopes.component.html',
  styleUrls: ['./envelopes.component.css']
})
export class EnvelopesComponent implements OnInit {

  constructor(
    private api: ApiService,
    private renderer: Renderer2) { }

  cards: Card[]
  public envelopes: any;
  public pageData: any;
  public categories: any;

  ngOnInit(): void {
    this.api.getUser().then(result => {

      var d = new Date();

      this.cards = this.generateCards(result.envelopes);
      this.envelopes = result.envelopes;
      console.log(this.envelopes);
      this.categories = this.getCategories(result.categories);
      this.pageData = {
        "fileName":"envelopes",
        "message":"Welcome to Envelopes!",
        "welcomeMessage":"This is the best way to track your monthly and weekly spending per category. Start by clicking 'Add Envelope'.",
        "logout":"Logout",
        "year":2020,
        "month":12,
        "day":21,
        "DASHBOARD":"DASHBOARD",
        "ENVELOPES":"ENVELOPES",
        "GOALS":"GOALS",
        "BILLS":"BILLS",
        "HISTORY":"HISTORY",
        "UTILITIES":"UTILITIES",
        "user":"User",
        "settings":"Settings",
        "appearance":"Appearance",
        "light":"Light",
        "dark":"Dark",
        "setMonthNumber": d.getMonth()+1,
        "setMonth": this.getCurrentMonth(d.getMonth()),
        "currentMonth": this.getCurrentMonth(d.getMonth()),
        "currency":"EUR",
      }
    }).catch(error => console.log(error));
  }

  @ViewChild('categoryAdd') categoryAdd: ElementRef;
  @ViewChild('amountAdd') amountAdd: ElementRef;
  @ViewChild('categoryExpense') categoryExpense: ElementRef;
  @ViewChild('nameExpense') nameExpense: ElementRef;
  @ViewChild('amountExpense') amountExpense: ElementRef;
  @ViewChild('dateExpense') dateExpense: ElementRef;

  faPlusSquare = faPlusSquare;

  addExpense() {
          
    let newSpent = 0;
    let newProgress = 0;

    for (let envelope of this.envelopes) {
      let dateArr = this.dateExpense.nativeElement.value.split("-")

      if (envelope.category.name === this.categoryExpense.nativeElement.value && dateArr[1] == this.pageData.setMonthNumber) {
        newSpent =  parseFloat(parseFloat(this.amountExpense.nativeElement.value).toFixed(2)) + envelope.spent;
        envelope.spent = newSpent;
        newProgress = Math.round(envelope.spent / envelope.budget * 100);
        envelope.progress = newProgress;
        console.log(newProgress);
        console.log(newSpent);
      }
    }

    this.api.addExpense(
      this.amountExpense.nativeElement.value,
      this.categoryExpense.nativeElement.value,
      this.nameExpense.nativeElement.value,
      this.dateExpense.nativeElement.value
      ).then(result => { }).catch(error => console.log(error));

  }

  nameAddEnvelopes(): number {
    const field = this.categoryAdd.nativeElement;
    if (!field.disabled) {
        //var field = document.getElementById("PayeeModal");
        var regex = new RegExp("^[ A-Za-z0-9_@./#&+-: ]{1,14}$");
        //uppercase, lowercase, številke, posebni znaki, dolžina od 1-16
        if (!field.value.match(regex)) {
            field.style.setProperty("border-color", "red", "important");
            $('.tt5').toast('show');
            return 0;
        } else {
            field.style.borderColor = "#ced4da";
            $('.tt5').toast('hide')
            return 1;
        }
    } else {
        return 1;
    }
  }

  getCategories(categories) {
    var category = [];
    var j = 0;
    for (var i = 0; i < categories.length; i++) {
        if (this.uniqueCategory(category, categories[i])) {
            category[j] = categories[i];
            j++;
        }

    }

    return category;
  }

  uniqueCategory(categories, category) {
    if (categories == null) {
        return true;
    }
    for (var i = 0; i < categories.length; i++) {
        if (categories[i]._id === category._id) {
            return false;
        }
    }
    return true;
  }

  getCurrentMonth(month) {
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


  amountAddEnvelopes(): number {
    const field = this.amountAdd.nativeElement;
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt1').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt1').toast('hide')
        return 1;
    }
  }

  nameExpenseEnvelopes(): number {
    const field = this.nameExpense.nativeElement;
    var regex = new RegExp("^[ A-Za-z0-9_@./#&+-: ]{1,16}$");
    //uppercase, lowercase, številke, posebni znaki, dolžina od 1-16
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt2').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt2').toast('hide')
        return 1;
    }
  }

  amountExpenseEnvelopes() {
    const field = this.amountExpense.nativeElement;
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt3').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt3').toast('hide')
        return 1;
    }
  }

  dateExpenseEnvelopes() {
    const field = this.dateExpense.nativeElement;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var inputDate = field.value.split("-");

    if (inputDate[0] < yyyy) {
        $('.tt4').toast('hide');
        field.style.borderColor = "#ced4da";
        return 1;
    } else if (inputDate[0] == yyyy) {
        if (inputDate[1] < mm) {
            $('.tt4').toast('hide');
            field.style.borderColor = "#ced4da";
            return 1;
        } else if (inputDate[1] == mm) {
            /* 
            ? IF DAY IS >= NOW */
            if (inputDate[2] <= dd) {
                $('.tt4').toast('hide');
                field.style.borderColor = "#ced4da";
                return 1;
            } else {
                $('.tt4').toast('show');
                field.style.setProperty("border-color", "red", "important");
                return 0;
            }
        } else {
            $('.tt4').toast('show');
            field.style.setProperty("border-color", "red", "important");
            return 0;
        }
    } else {
        $('.tt4').toast('show');
        field.style.setProperty("border-color", "red", "important");
        return 0;
    }
  }

  buttonAddEnvelopes(): void {
    var amount = this.amountAddEnvelopes();

    if (amount == 0) {
        //DO NOTHING
    } else {
      //POST REQUEST - TO BE ADDED
    }
}

  buttonExpenseEnvelopes(): void {
    var amount = this.amountExpenseEnvelopes();
    var name = this.nameExpenseEnvelopes();
    var date = this.dateExpenseEnvelopes();


    if (amount == 0 || name == 0 || date == 0) {
        //DO NOTHING
    } else {
      this.renderer.setAttribute(document.getElementById("buttonEditEnvelopes"), 'data-dismiss', 'modal');
      this.addExpense()
      this.renderer.removeAttribute(document.getElementById("buttonEditEnvelopes"), 'data-dismiss', 'modal');
    }
  }

  generateCards(envelopes) {

    return [
      new Card(1, 'bg-primary', 'faEnvelope', 2, 'Envelopes Total', null),
      new Card(21, 'bg-warning', 'faExclamationTriangle', 1, 'Almost Empty', 'No almost empty envelopes!'),
      new Card(31, 'bg-danger', 'faRadiation', 1, 'Empty', 'No empty envelopes!'),
    ];
  }
}
