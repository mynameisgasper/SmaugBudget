import { Component, OnInit, ViewChild, ViewEncapsulation, Renderer2, ElementRef } from '@angular/core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent implements OnInit {

  pencilIcon = faPencilAlt;

  @ViewChild('amountDashboard') amount: ElementRef;
  @ViewChild('dateDashboard') date: ElementRef;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit(): void {
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
