import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  data = {
    "fileName":"history",
    "graph":{
      "used":true,
      "name":"HistoryChart"
    },
    "dateRangePicker":{
      "used":true
    },
    "message":"Welcome to History!",
    "welcomeMessage":"This is the best way to check your past spending by time and category.",
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
    "categories":[{
      "color":"rgb(50, 168, 156)",
      "basic":true,
      "_id":"5fc600b4507a6800112af1d5",
      "name":"Car"
    },{
      "color":"rgb(232, 176, 23)",
      "basic":true,
      "_id":"5fc600b4507a6800112af1d6",
      "name":"Groceries"
    },{
      "color":"rgb(191, 33, 194)",
      "basic":true,
      "_id":"5fc600b4507a6800112af1d7",
      "name":"Leisure"
    },{
      "color":"rgb(209, 23, 104)",
      "basic":true,
      "_id":"5fc600b4507a6800112af1d8",
      "name":"Subscriptions"
    },{
      "color":"rgb(88, 52, 179)",
      "basic":true,
      "_id":"5fc600b4507a6800112af1d9",
      "name":"Travel"
    },{
      "color":"rgb(173, 209, 52)",
      "basic":true,
      "_id":"5fc600b4507a6800112af1da",
      "name":"Home"
    },{
      "color":"rgb(50, 168, 82)",
      "basic":true,
      "_id":"5fc600b4507a6800112af1db",
      "name":"Gifts"
    },{
      "color":"rgb(209, 73, 23)",
      "basic":true,
      "_id":"5fc600b4507a6800112af1dc",
      "name":"Shopping"
    },{
      "color":"rgb(81, 219, 237)",
      "basic":true,
      "_id":"5fc600b4507a6800112af1dd",
      "name":"Utilities"
    },{
      "color":"rgb(40, 235, 79)",
      "basic":true,
      "_id":"5fc600b4507a6800112af1de",
      "name":"Electronics"
    }],
    "expense":[{
      "id":"5fddf8b785ba6f14a5f71c5e",
      "year":"2020",
      "month":"12",
      "monthName":"DEC",
      "day":"04",
      "category":"Car",
      "recipient":"Sparkasse",
      "value":310,
      "currency":"EUR",
      "color":"rgb(50, 168, 156)"
    },{
      "id":"5fc601f5df16f6001104213f",
      "year":"2020",
      "month":"11",
      "monthName":"NOV",
      "day":"30",
      "category":
      "Utilities",
      "recipient":"Telemach",
      "value":66,
      "currency":"EUR",
      "color":"rgb(81, 219, 237)"
    },{	
      "id":"5fc600b4507a6800112af237",
      "year":"2020",
      "month":"11",
      "monthName":"NOV",
      "day":"28",
      "category":"Electronics",
      "recipient":"Goal: Headphones",
      "value":250,
      "currency":"EUR",
      "color":"rgb(40, 235, 79)"
    },{
      "id":"5fc600b4507a6800112af223",
      "year":"2020","month":"11",
      "monthName":"NOV",
      "day":"25",
      "category":"Travel",
      "recipient":"Slovenjske Zeleznice",
      "value":18,
      "currency":"EUR",
      "color":"rgb(88, 52, 179)"
    },{
      "id":"5fc600b4507a6800112af21f",
      "year":"2020",
      "month":"11",
      "monthName":"NOV",
      "day":"21",
      "category":"Leisure",
      "recipient":"Knjigarna Kranj",
      "value":45,
      "currency":"EUR",
      "color":"rgb(191, 33, 194)"
    },{
      "id":"5fc600b4507a6800112af21d",
      "year":"2020",
      "month":"11",
      "monthName":"NOV",
      "day":"17",
      "category":"Groceries",
      "recipient":"Lidl",
      "value":63,
      "currency":"EUR",
      "color":"rgb(232, 176, 23)"
    },{
      "id":"5fc600b4507a6800112af221",
      "year":"2020",
      "month":"11",
      "monthName":"NOV",
      "day":"16",
      "category":"Subscriptions",
      "recipient":"Netflix",
      "value":10,"currency":"EUR",
      "color":"rgb(209, 23, 104)"
    },{
      "id":"5fc600b4507a6800112af225",
      "year":"2020",
      "month":"11",
      "monthName":"NOV",
      "day":"15",
      "category":"Utilities",
      "recipient":"Elektro Gorenjska",
      "value":45,"currency":"EUR",
      "color":"rgb(81, 219, 237)"
    },{
      "id":"5fc600b4507a6800112af219",
      "year":"2020",
      "month":"11",
      "monthName":"NOV",
      "day":"12",
      "category":"Car",
      "recipient":"Petrol",
      "value":55,
      "currency":"EUR",
      "color":"rgb(50, 168, 156)"
    },{
      "id":"5fc600b4507a6800112af217",
      "year":"2020",
      "month":"11",
      "monthName":"NOV",
      "day":"07",
      "category":"Car",
      "recipient":"Avto Servis",
      "value":100,
      "currency":"EUR",
      "color":"rgb(50, 168, 156)"
    },{
      "id":"5fc600b4507a6800112af21b",
      "year":"2020",
      "month":"11",
      "monthName":"NOV",
      "day":"03",
      "category":"Groceries",
      "recipient":"Mercator",
      "value":15,
      "currency":"EUR",
      "color":"rgb(232, 176, 23)"
    },{	
      "id":"5fc600b4507a6800112af227",
      "year":"2020",
      "month":"11",
      "monthName":"NOV",
      "day":"01",
      "category":"Shopping",
      "recipient":"HM",
      "value":111,
      "currency":"EUR",
      "color":"rgb(48, 191, 98)"
    },{
      "id":"5fc600b4507a6800112af231",
      "year":"2020",
      "month":"10",
      "monthName":"OCT",
      "day":"28",
      "category":"Travel",
      "recipient":"Alpetour",
      "value":11,
      "currency":"EUR",
      "color":"rgb(88, 52, 179)"
    },{
      "id":"5fc600b4507a6800112af22f",
      "year":"2020",
      "month":"10",
      "monthName":"OCT",
      "day":"20",
      "category":"Subscriptions",
      "recipient":"Prime Video",
      "value":15,
      "currency":"EUR",
      "color":"rgb(209, 23, 104)"
    },{
      "id":"5fc600b4507a6800112af233",
      "year":"2020",
      "month":"10",
      "monthName":"OCT",
      "day":"18",
      "category":"Utilities",
      "recipient":"Elektro Gorenjska",
      "value":51,
      "currency":"EUR",
      "color":"rgb(81, 219, 237)"
    },{
      "id":"5fc600b4507a6800112af229",
      "year":"2020",
      "month":"10",
      "monthName":"OCT",
      "day":"16",
      "category":"Car",
      "recipient":"OMV",
      "value":55,
      "currency":"EUR",
      "color":"rgb(50, 168, 156)"
    },{	
      "id":"5fc600b4507a6800112af235",
      "year":"2020",
      "month":"10",
      "monthName":"OCT",
      "day":"13",
      "category":"Shopping",
      "recipient":"Big Bang",
      "value":100,
      "currency":"EUR",
      "color":"rgb(48, 191, 98)"
    },{
      "id":"5fc600b4507a6800112af22b",
      "year":"2020","month":"10",
      "monthName":"OCT",
      "day":"11",
      "category":"Groceries",
      "recipient":"Hofer",
      "value":115,
      "currency":"EUR",
      "color":"rgb(232, 176, 23)"
    },{
      "id":"5fc600b4507a6800112af22d",
      "year":"2020",
      "month":"10",
      "monthName":"OCT",
      "day":"03",
      "category":"Leisure",
      "recipient":"Steam",
      "value":75,
      "currency":"EUR",
      "color":"rgb(191, 33, 194)"
    }],
    "currency":"EUR",
    "chartData1": [310],
    "chartColors1": [{backgroundColor: ['rgb(50, 168, 156)']}],
    "chartLabels1": ["Car"],
    "chartType1": "doughnut",
    "chartData2": [310],
    "chartColors2": [{backgroundColor: ['rgb(50, 168, 156)']}],
    "chartLabels2": ["Car"],
    "chartType2": "line"
  }
}
