import { Component, OnInit, ViewChild, ViewEncapsulation, Renderer2, ElementRef } from '@angular/core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { Card } from '../card';
declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent implements OnInit {

  @ViewChild('amountDashboard') amount: ElementRef;
  @ViewChild('dateDashboard') date: ElementRef;

  pencilIcon = faPencilAlt;
  cards: Card[]

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private api: ApiService) { }

  ngOnInit(): void {
    this.api.getUser().then(result => {
      console.log(result);
      this.cards = this.generateCards(result.bills, result.expense, result.paycheck, result.paycheckDate);
      console.log(this.cards);
    }).catch(error => console.log(error));
  }

  amountDashboard1(): number {
    const field = this.amount.nativeElement;
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    if(!regex.test(field.value)){
      field.style.setProperty("border-color", "red", "important");
      $('.tt1').toast('show');
      return 0;
    } 
    else {
      field.style.borderColor = "#ced4da";
      $('.tt1').toast('hide');
      return 1;
    }
  }

  dateDashboard1(): number {
    const field = this.date.nativeElement;
    if (field.value < 1 || field.value > 28) {
      field.style.setProperty("border-color", "red", "important");
      $('.tt2').toast('show');
      return 0;
    } 
    else {
      field.style.borderColor = "#ced4da";
      $('.tt2').toast('hide');
      return 1;
    }
  }

  buttonDashboard(): void{
    var amount = this.amountDashboard1()
    var date = this.dateDashboard1();
    if (amount == 0 || date == 0) {
      //DO NOTHING
    } 
    else {
      //POST REQUEST - TO BE ADDED
    }
  }

  generateCards(bills, expenses, paycheck, paycheckDate) {
    var billsUntilPaycheck = this.getBillsUntilPaycheck(bills, paycheckDate);
    var expensesSincePaycheck = this.getExpensesSincePaycheck(expenses, paycheckDate);

    var totalCost = this.getTotalCost(this.getExpensesAndBills(expensesSincePaycheck, billsUntilPaycheck));
    var totalBills = this.getTotalCost(billsUntilPaycheck);
    var budgetLeft = paycheck - totalCost;
    return [
        new Card(1, 'bg-primary', 'faUniversity', (isNaN(budgetLeft) ? 0 : budgetLeft), 'Budget Left', null),
        new Card(2, 'bg-primary', 'faCoins', totalBills, 'Expenses Left', null),
        new Card(3, 'bg-primary', 'faPiggyBank', (isNaN(budgetLeft - totalBills) ? 0 : budgetLeft - totalBills), 'Savings', null),
    ];
}

  getBillsUntilPaycheck(bills, paycheckDate) {
    try {
        var billsUntilPaycheck = [];

        const today = new Date();
        const todayMonth = today.getMonth();
        today.setMonth(today.getMonth() + 1);
        const nextMonth = today.getMonth();
        for (var bill of bills) {
            const billDate = new Date(bill.date);
            const billDay = billDate.getDate();
            const billMonth = billDate.getMonth();
            if ((billMonth == todayMonth && billDay > paycheckDate) || (billMonth == nextMonth && billDay <= paycheckDate)) {
                billsUntilPaycheck.push(bill);
            }
        }

        return billsUntilPaycheck;
    } catch {
        return [];
    }
  }

  getExpensesSincePaycheck(expenses, paycheckDate) {
    try {
        var expensesSincePaycheck = [];

        const today = new Date();
        const todayMonth = today.getMonth();
        today.setMonth(today.getMonth() - 1);
        const previousMonth = today.getMonth();
        for (var expense of expenses) {
            const expenseDate = new Date(expense.date);
            const expenseDay = expenseDate.getDate();
            const expenseMonth = expenseDate.getMonth();
            if ((expenseMonth == todayMonth && expenseDay <= paycheckDate) || (expenseMonth == previousMonth && expenseDay > paycheckDate)) {
                expensesSincePaycheck.push(expense);
            }
        }

        return expensesSincePaycheck;
    } catch {
        return [];
    }
  }

  getExpensesAndBills(expenses, bills) {
    return expenses.concat(bills);
  }

  getTotalCost(bills) {
    var sum = 0;
    for (var bill of bills) {
        sum += bill.value;
    }

    return sum;
  }

  data = {
    "fileName":"dashboard",
    "graph":{
      "used":true,
      "name":"DashboardChart"
    },
    "message":"Welcome to dashboard!",
    "welcomeMessage":"A simple overview of your spending.",
    "alertSection":"Alert Section",
    "overview":"Last month overview",
    "incomeRow":"Income",
    "expensesRow":"Expenses",
    "balanceRow":"Balance",
    "analyticsField":"Analytics",
    "incomeModalTitle":"Update your Income",
    "incomeModalPlaceholderIncome":"Enter your income",
    "incomeModalPlaceholderDate":"Day in month you receive paycheck",
    "incomeModalSaveButton":"Save Changes",
    "incomeModalCloseButton":"Close",
    "logout":"Logout",
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
    "noData":"No data",
    "card":[
    {
      "id":1,
      "title":"Budget Left",
      "color":"bg-primary",
      "count":435,
      "icon":"faUniversity",
      "comment":""
    },
    {
      "id":2,
      "title":"Expenses Left",
      "color":"bg-primary",
      "count":376,
      "icon":"faCoins",
      "comment":""
    },
    {
      "id":3,
      "title":"Savings",
      "color":"bg-primary",
      "count":59,
      "icon":"faPiggyBank",
      "comment":""
    }],
    "analytics":[
    {
      "rowName":"Most money spent on",
      "color":"rgb(50, 168, 156)",
      "category":"Car"
    },
    {
      "rowName":"Most times purchased",
      "color":"rgb(50, 168, 156)",
      "category":"Car"
    }],
    "incomeLastMonth":1500,
    "expensesLastMonth":310,
    "alert":[
    {
      "type":"alert-success",
      "name":"GOALS",
      "text":"1 goal completed"
    }],
    "alertLength":1,
    "id":"5fc600b4507a6800112af56e",
    "currency":"EUR",
    "chartData": [310],
    "chartColors": [{backgroundColor: ['rgb(50, 168, 156)']}],
    "chartLabels": ["Car"],
    "chartType": "doughnut"
  }
}
