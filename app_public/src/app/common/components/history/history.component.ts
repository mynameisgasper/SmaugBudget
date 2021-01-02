import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DOCUMENT } from '@angular/common'
import { element } from 'protractor';
import { ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Expense } from '../../classes/expense';
import { ConnectionService } from '../../services/connection.service';

declare var $:any;

declare var getTranslation: any;
declare var setLanguage: any;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public categories: Array<Object> = [];
  public currency: string;
  public expenses: Array<Object> = [];
  fileName: string = "history";
  graph: Object = {
    "used": true,
    "name": "HistoryChart"
  };
  message: string = getTranslation("messageHistory");
  welcomeMessage: string = getTranslation("welcomeMessageHistory");
  logout: string = "Logout";
  DASHBOAR: string = "DASHBOARD,";
  ENVELOPES: string = "ENVELOPES";
  GOALS: string = "GOALS";
  BILLS: string = "BILLS";
  HISTORY: string = "HISTORY";
  UTILITIES: string = "UTILITIES";
  user: string = "User";
  settings: string = "Settings";
  appearance: string = "Appearance";
  light: string = "Light";
  dark: string = "Dark";
  chartData1: Array<any> = [];
  chartColors1: Array<any> = [];
  chartLabels1: Array<any> = []; 
  chartType1: string = "doughnut";
  chartData2: Array<any> = [];
  chartColors2: Array<any> = [];
  chartLabels2: Array<string> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  chartType2: string = "line";

  paginatedExpenses: Array<Expense> = [];
  expenseCount: number = 0;
  page: number = 1;
  pageSize: number = 10
  filter: string = '';

  historyAll = getTranslation("historyAll");
  historyExport = getTranslation("historyExport");
  historyTotal = getTranslation("historyTotal");

  constructor(
    private api: ApiService,
    @Inject(DOCUMENT) private document: HTMLDocument,
    private router: Router, 
    private authentication: AuthenticationService,
    private connectionService: ConnectionService
  ) { }

  public hasConnection(): boolean {
    return this.connectionService.hasConnection;
  }

  @ViewChild('color') color: ElementRef;

  ngOnInit(): void {
    this.api.getUser().then(result => {
      this.refreshLanguage(result.language);
      this.categories = result.categories;
      this.expenses = this.generateExpenses(result.expense);
      this.currency = result.defaultCurrency;
      
      //data za tabele
      const parsedTable = this.parseTable(this.expenses);
      document.querySelector(".totaltext").innerHTML = "<h5>" + this.historyTotal + ": " + parsedTable.sum.toFixed(2); + "€</h5>";
      const pieChart = this.groupByCategories(parsedTable);
      const lineChartData = this.makeDataForGraph(this.filterByCategory(this.expenses))

      this.chartData1 = this.makeDataArray1(pieChart);
      this.chartColors1 = this.makeColorArray1(pieChart);
      this.chartLabels1 = this.makeLabelArray1(pieChart);
      this.chartData2 = this.generateDatasets(lineChartData);
      this.chartColors2 = this.getColors(lineChartData);
    }).catch(error => {
      this.authentication.logout();
      this.router.navigate(['/']);
    });

    this.api.getExpense('', this.pageSize, (this.page - 1) * this.pageSize).then(result => {
      this.expenseCount = result['length'];
      this.paginatedExpenses = result['expenses'];
    }).catch(error => {
      this.authentication.logout();
      this.router.navigate(['/']);
    });
  }

  refreshLanguage(language: string) {
    setLanguage(language);
        
    this.message = getTranslation("messageHistory");
    this.welcomeMessage = getTranslation("welcomeMessageHistory");
    this.historyAll = getTranslation("historyAll");
    this.historyExport = getTranslation("historyExport");
    this.historyTotal = getTranslation("historyTotal");
  }

  parseTable(rows) {
    const parsedTable = {
        sum: 0,
        data: []
    };

    for (let row of rows) {

      parsedTable.data.push({
          id: row.id,
          year: row.year,
          month: row.month,
          day: row.day,
          category: row.category,
          receiver: row.receiver,
          currency: row.currency,
          value: row.value,
          color: row.color,
      });
      parsedTable.sum += row.value;
    }
    return parsedTable;
  }

  filterByCategory(table) {
      var categories = new Map();
      for (var expense of table) {
          if (!categories.get(expense.category)) {
              categories.set(expense.category, []);
          }
          categories.get(expense.category).push(expense);
          categories.get(expense.category).color = expense.color;
      }
      return categories;
  }

  filterByMonth(expenses) {
      var month = new Map();
      for (var expense of expenses) {
          if (!month.get(expense.month)) {
              month.set(expense.month, {});
              month.get(expense.month).sum = 0;
          }

          month.get(expense.month).sum += expense.value;
      }
      return month;
  }

  makeDataForGraph(category) {

      var month = new Map();
      let keys = Array.from(category.keys());
      for (let name of keys) {
          month.set(name, this.filterByMonth(category.get(name)));
          month.get(name).color = category.get(name).color;
      }

      return month;
  }

  convertMonthsToName(month) {
    switch (month) {
        case 'JAN':
            return "January";
        case 'FEB':
            return "February";
        case 'MAR':
            return "March";
        case 'APR':
            return "April";
        case 'MAY':
            return "May";
        case 'JUN':
            return "June";
        case 'JUL':
            return "July";
        case 'AUG':
            return "August";
        case 'SEP':
            return "September";
        case 'OCT':
            return "October";
        case 'NOV':
            return "November";
        case 'DEC':
            return "December";
    }
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

  groupByCategories(parsedTable) {
    const groups = [];
    for (let entry of parsedTable.data) {
        const group = this.findGroupByCategory(groups, entry.category);
        if (group != null) {
            group.sum += parseInt(entry.value);
        } else {
            groups.push({
                name: entry.category,
                sum: entry.value,
                color: entry.color,
            });
        }
    }

    return groups;
  }

  findGroupByCategory(groups, category) {
    for (let group of groups) {
        if (group.name == category) return group;
    }

    return null;
  }

  makeDataArray1(array): Array<any> {
    const returnTable = [array.length];
    for (let i = 0; i < array.length; i++) {
      returnTable[i] = array[i].sum;
    }
    return returnTable;
  }

  makeColorArray1(array) {
    const table = [];
    const returnTable = [];
    for (let i = 0; i < array.length; i++) {
      returnTable.push([array[i].color]);
    }
    let barva = {
      backgroundColor: returnTable
    }
    table[0] = barva;
    return table;
  }
  
  makeLabelArray1(array) {
    const returnTable = [array.length];
    for (let i = 0; i < array.length; i++) {
      returnTable[i] = array[i].name;
    }
    return returnTable;
  }

  generateDatasets(map) {
    var datasets: ChartDataSets[] = [];
    let keys = Array.from(map.keys());
    for (let i of keys) {
      datasets.push(this.generateDataset(map.get(i),i));
    }
    return datasets;
  }

  generateDataset(data,category): Object {
    var podatki = this.getData(data);
    return {data: podatki, label: category};
  }

  getData(data): Array<number> {
    const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let keys = Array.from(data.keys());
    for (let i of keys) {
      var y: number = +i;
      arr[y-1]=(data.get(i).sum);
    }
    return arr;
  }

  getColors(data): Color[] {
    const arr: Color[] = [];
    let keys = Array.from(data.keys());
    for (let i of keys) {
      a=data.get(i).color;
      var a = {
        borderColor: data.get(i).color
      }
      arr.push(a);
    }
    return arr;
  }

  generatePdf() {
    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
    var docDefinition = {
      content: [{ 
        text: 'Expenses', 
        style: 'header' 
      }, {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [ '*', 'auto', 100, '*' ],
  
          body: [
            [ 'Date', 'Category', 'Recipient', 'Value' ]
          ]
        }, 
        margin: [ 0, 10, 0, 0 ]
      }],
      styles: {
        header: {
          fontSize: 22,
          bold: true
        },
        body: {
          fontSize: 16        
        }
      }
    };
    
    for (let expense of this.expenses) {
      docDefinition.content[1].table.body.push([`${expense['day']}-${expense['monthName']}-${expense['year']}`, expense['category'], expense['recipient'], `${expense['value']} ${expense['currency']}`]);
    }

    pdfMake.createPdf(docDefinition).open();    
  }

  changePage(page: number) {
    this.page = page;
    
    if (!this.filter) this.filter = '';
    this.api.getExpense(this.filter, this.pageSize, (page - 1) * this.pageSize).then(result => {
      this.paginatedExpenses = result['expenses'];
      this.expenseCount = result['length'];
    }).catch(error => {
      this.authentication.logout();
      this.router.navigate(['/']);
    });
  }

  setFilter(filter: string) {
    this.filter = filter;
    this.changePage(this.page);
  }
}
