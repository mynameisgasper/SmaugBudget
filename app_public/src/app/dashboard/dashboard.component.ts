import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
      "title":"Budget Left",
      "color":"bg-primary",
      "count":435,
      "icon":"fa-university"
    },
    {
      "title":"Expenses Left",
      "color":"bg-primary",
      "count":376,
      "icon":"fa-coins"
    },
    {
      "title":"Savings",
      "color":"bg-primary",
      "count":59,
      "icon":"fa-piggy-bank"
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
    "chartLabels": ["Car"],
    "chartType": "doughnut"
  }
}
