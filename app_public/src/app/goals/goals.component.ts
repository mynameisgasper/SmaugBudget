import { Component, OnInit } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hasTargetLeft(value: Number): Boolean {
    return value > 0;
  }

  areEqual(val1: String, val2: String): Boolean {
    return val1 === val2;
  }

  faPlusSquare = faPlusSquare;

  data = {
    "fileName":"goals",
    "message":"Welcome to Goals!",
    "welcomeMessage":"Here you can add saving goals you want to achieve. Click 'Add Goal', fill in the form, submit and you`re done!",
    "logout":"Logout",
    "DASHBOARD":"DASHBOARD",
    "ENVELOPES":"ENVELOPES",
    "GOALS":"GOALS",
    "BILLS":"BILLS",
    "HISTORY":"HISTORY",
    "UTILITIES":"UTILITIES",
    "year":2020,
    "month":12,
    "day":21,
    "selectCategory": "Select Category",
    "user":"User",
    "settings":"Settings",
    "appearance":"Appearance",
    "light":"Light",
    "dark":"Dark",
    "goal":[{
      "_id":"5fc600b4507a6800112af239",
      "title":"Playstation 5",
      "progress":0,
      "target":450,
      "targetLeft":450,
      "color":"#2f7cfe",
      "monthlyTarget":3,
      "category":{
        "_id":"5fc600b4507a6800112af23a",
        "color":"rgb(191, 33, 194)",
        "basic":true,
        "name":"Electronics"
      },
      "year":"2021",
      "month":"07",
      "day":"01"
    },{
      "_id":"5fc600b4507a6800112af23b",
      "title":"Headphones",
      "progress":100,
      "target":250,
      "targetLeft":0,
      "color":"#00cf1d",
      "monthlyTarget":0,
      "category":{
        "_id":"5fc600b4507a6800112af23c",
        "color":"rgb(40, 235, 79)",
        "basic":true,
        "name":"Electronics"
      },
      "year":"2021",
      "month":"07",
      "day":"28"
    }],
    "card":[{
      "id":1,
      "title":"Goals Total",
      "color":"bg-primary",
      "count":2,
      "icon":"faBullseye"
    },{
      "id":2,
      "title":"Goals Completed",
      "color":"green-panel",
      "count":1,
      "icon":"faCheckCircle",
      "comment":"Headphones completed!"
    }],
    "categories":[{
      "_id":"5fc600b4507a6800112af1d5",
      "category":"Car"
    },{
      "_id":"5fc600b4507a6800112af1d6",
      "category":"Groceries"
    },{
      "_id":"5fc600b4507a6800112af1d7",
      "category":"Leisure"
    },{
      "_id":"5fc600b4507a6800112af1d8",
      "category":"Subscriptions"
    },{
      "_id":"5fc600b4507a6800112af1d9",
      "category":"Travel"
    },{
      "_id":"5fc600b4507a6800112af1da",
      "category":"Home"
    },{
      "_id":"5fc600b4507a6800112af1db",
      "category":"Gifts"
    },{
      "_id":"5fc600b4507a6800112af1dc",
      "category":"Shopping"
    },{
      "_id":"5fc600b4507a6800112af1dd",
      "category":"Utilities"
    },{
      "_id":"5fc600b4507a6800112af1de",
      "category":"Electronics"
    }],
    "currency":"EUR"
  }
}
