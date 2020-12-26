import { Component, OnInit, ViewChild, ViewEncapsulation, Renderer2, ElementRef } from '@angular/core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Alert } from '../alert';
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
  message = "Welcome to dashboard!";
  welcomeMessage = "A simple overview of your spending.";
  cards: Card[];
  alerts: Alert[];
  analytics: Array<Object>;
  overview = "Last month overview";
  incomeRow = "Income";
  currency: String;
  incomeLastMonth: any;
  expensesRow = "Expenses";
  balanceRow = "Balance";
  expensesLastMonth: any;
  analyticsField = "Analytics";
  noData = "No data";
  incomeModalTitle = "Update your Income";
  incomeModalPlaceholderIncome = "Enter your income";
  incomeModalPlaceholderDate = "Day in month you receive paycheck";
  incomeModalSaveButton = "Save Changes";
  incomeModalCloseButton = "Close";
  chartData: Array<Number> = [];
  chartColors: Array<Object> = [];
  chartLabels: Array<String> = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getUser().then(result => {
      this.cards = this.generateCards(result.bills, result.expense, result.paycheck, result.paycheckDate);
      this.alerts = this.generateAlerts(result.envelopes, result.bills, result.goals);
      this.analytics = this.generateAnalyitcs(result.expense, result.paycheckDate)
      this.currency = result.defaultCurrency;
      this.incomeLastMonth = result.paycheckLastMonth;
      this.expensesLastMonth = this.getTotalCost(this.getLastMonthExpenses(result.expense, result.paycheckDate));
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

  generateGraphs(expenses): void {
    var colors: Array<String> = []

    for (let expense of expenses) {
      this.chartData.push(expense.value);
      colors.push(expense.category.color);
      this.chartLabels.push(expense.category.name);
    }

    this.chartColors = [{ backgroundColor: colors }];
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

  generateAlerts(envelopes, bills, goals) {
    var alertArray = [];
    for (var el1 of this.generateEnvelopeAlerts(envelopes)) {
        alertArray.push(el1);
    }
    for (var el2 of this.generateBillsAlerts(bills)) {
        alertArray.push(el2);
    }
    for (var el3 of this.generateGoalsAlerts(goals)) {
        alertArray.push(el3);
    }

    return alertArray;
  }
  
  generateEnvelopeAlerts(envelopes) {
    var envelopesAlerts = [];

    var date = new Date();
    var month = this.getCurrentMonth(date.getMonth());
    var totalAlmostEmptyEnvelopes = this.getTotalAlmostEmptyEnvelopes(envelopes, month);
    var totalEmptyEnvelopes = this.getTotalEmptyEnvelopes(envelopes, month);

    if (totalAlmostEmptyEnvelopes > 0) {
      envelopesAlerts.push(new Alert('alert-warning', 'ENVELOPES', totalAlmostEmptyEnvelopes + ' almost empty'));
    }
    if (totalEmptyEnvelopes > 0) {
        envelopesAlerts.push(new Alert('alert-danger', 'ENVELOPES', totalEmptyEnvelopes + ' empty'));
    }

    return envelopesAlerts;
  }

  generateBillsAlerts(bills) {
    var billsAlerts = [];

    const nearBills = this.getBillsInTheNext7Days(bills);
    if (nearBills.length > 0) {
      billsAlerts.push(new Alert('alert-warning', 'BILLS', nearBills.length + ' bill to pay this week'));
    }
    return billsAlerts;
  }

  generateGoalsAlerts(goals) {
    var count = this.goalsCompleted(goals);
    if (count) {
        return [new Alert('alert-success', 'GOALS', count + ' goal completed')];
    } else {
        return [];
    }
  }

  getTotalAlmostEmptyEnvelopes(envelopes, month) {
    var counter = 0;
    for (var i = 0; i < envelopes.length; i++) {
        if (envelopes[i].progress < 100 && envelopes[i].progress > 74 && envelopes[i].month === month) {
            counter++;
        }
    }
    return counter;
  }

  getTotalEmptyEnvelopes(envelopes, month) {
      var counter = 0;
      for (var i = 0; i < envelopes.length; i++) {
          if (envelopes[i].progress >= 100 && envelopes[i].month === month) {
              counter++;
          }
      }
      return counter;
  }

  getBillsInTheNext7Days(bills) {
      const currentTime = new Date();
      var billsArray = [];

      for (var bill of bills) {
          const billDate = new Date(Date.parse(bill.date)).getTime();
          const diff = (billDate - currentTime.getTime()) / 86400000;

          if (diff < 7) {
              billsArray.push(bill);
          }
      }
      return billsArray;
  }

  goalsCompleted(goals) {
    var completed = 0;

    for (var i = 0; i < goals.length; i++) {
        if (goals[i].saved >= goals[i].target) {
            completed++;
        }
    }

    return completed;
  }

  generateAnalyitcs(expenses, paycheckDate) {
    var lastMonthExpenses = this.getLastMonthExpenses(expenses, paycheckDate);
    var analyzeExpenses = this.getExpenseAnalysis(lastMonthExpenses);
    var mostMoneySpentOn = this.getMostMoneySpentOn(analyzeExpenses);
    var mostTimesPurchased = this.getMostTimesPurchased(analyzeExpenses);

    this.generateGraphs(lastMonthExpenses);

    if (mostMoneySpentOn && mostTimesPurchased) {
        return [{
                rowName: 'Most money spent on',
                color: mostMoneySpentOn.color,
                category: mostMoneySpentOn.name
            },
            {
                rowName: 'Most times purchased',
                color: mostTimesPurchased.color,
                category: mostTimesPurchased.name
            }
        ];
    } else {
        return [];
    }
  }

  getLastMonthExpenses(expenses, paycheckDate) {
    var lastMonthExpenses = [];

    const today = new Date();
    today.setMonth(today.getMonth() - 1);
    const previousMonth = today.getMonth();
    today.setMonth(today.getMonth() - 2);
    const prepreviousMonth = today.getMonth();
    for (var expense of expenses) {
        const expenseDate = new Date(expense.date);
        const expenseDay = expenseDate.getDate();
        const expenseMonth = expenseDate.getMonth();

        if (today > paycheckDate) {
            if ((expenseMonth == previousMonth + 1 && expenseDay <= paycheckDate) || (expenseMonth == prepreviousMonth && expenseDay > paycheckDate)) {
                lastMonthExpenses.push(expense);
            }
        } else {
            if ((expenseMonth == previousMonth && expenseDay <= paycheckDate) || (expenseMonth == prepreviousMonth && expenseDay > paycheckDate)) {
                lastMonthExpenses.push(expense);
            }
        }
    }

    return lastMonthExpenses;
  }

  getExpenseAnalysis(expenses) {
    var categories = new Map();

    for (var expense of expenses) {
        if (categories.get(expense.category.name)) {
            categories.get(expense.category.name).sum += parseInt(expense.value);
            categories.get(expense.category.name).count += 1;
            categories.get(expense.category.name).color = expense.category.color;
        } else {
            categories.set(expense.category.name, {});
            categories.get(expense.category.name).name = expense.category.name
            categories.get(expense.category.name).sum = parseInt(expense.value);
            categories.get(expense.category.name).count = 1;
            categories.get(expense.category.name).color = expense.category.color;
        }
    }

    return categories;
  }

  getMostMoneySpentOn(expenseAnalitics) {
    var selectedAnalitic = null;

    let keys = Array.from(expenseAnalitics.keys());
    for (let key of keys) {
        if (selectedAnalitic == null || expenseAnalitics.get(key).sum > selectedAnalitic.sum) {
            selectedAnalitic = expenseAnalitics.get(key);
        }
    }

    if (selectedAnalitic) {
        return selectedAnalitic;
    }
  }

  getMostTimesPurchased(expenseAnalitics) {
    var selectedAnalitic = null;

    let keys = Array.from(expenseAnalitics.keys());
    for (let key of keys) {
        if (selectedAnalitic == null || expenseAnalitics.get(key).count > selectedAnalitic.count) {
            selectedAnalitic = expenseAnalitics.get(key);
        }
    }

    if (selectedAnalitic) {
        return selectedAnalitic;
    }
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
}
