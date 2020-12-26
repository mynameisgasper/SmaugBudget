import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public pageData: any;
  public categories: {};
  public currency: string;
  public expenses: {};

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getUser().then(result => {
      this.pageData = {
        "fileName": "history",
        "graph":{
          "used":true,
          "name":"HistoryChart"
        },
        "dateRangePicker":{
          "used":true
        },
        "message":"Welcome to History!",
        "welcomeMessage":"This is the best way to check your past spending by time and category.",
        "logout": "Logout",
        "DASHBOARD":"DASHBOARD,",
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
        "chartData1": [310],
        "chartColors1": [{backgroundColor: ['rgb(50, 168, 156)']}],
        "chartLabels1": ["Car"],
        "chartType1": "doughnut",
        "chartData2": [310],
        "chartColors2": [{backgroundColor: ['rgb(50, 168, 156)']}],
        "chartLabels2": ["Car"],
        "chartType2": "line"
      }
      this.categories = result.categories;
      this.expenses = this.generateExpenses(result.expense);
      this.currency = result.defaultCurrency;
      console.log(this.expenses);
    }).catch(error => console.log(error));
  }
 
  generateExpenses(expense) {
    var expensesArray = []
    for (var exp of expense) {
        var date = exp.date.split('T')[0].split('-');

        expensesArray.push({
            id: exp._id,
            year: date[0],
            month: date[1],
            monthName: this.translateMonth(date[1]),
            day: date[2],
            category: exp.category.name,
            recipient: exp.recipient,
            value: exp.value,
            currency: exp.currency,
            color: exp.category.color,
        });
    }
    expensesArray.sort(this.compare)

    return expensesArray;
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

}
