import { Component, OnInit } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  faPlusSquare = faPlusSquare;

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
