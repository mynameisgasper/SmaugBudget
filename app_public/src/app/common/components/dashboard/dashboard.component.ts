import { Component, OnInit, ViewChild, ViewEncapsulation, Renderer2, ElementRef, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Alert } from '../../classes/alert';
import { ApiService } from '../../services/api.service';
import { Card } from '../../classes/card';
import { User } from '../../classes/user';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { ConnectionService } from '../../services/connection.service';
declare var $:any;

declare var getTranslation: any;
declare var setLanguage: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent implements OnInit {

  @ViewChild('amountDashboard') amount: ElementRef;
  @ViewChild('dateDashboard') date: ElementRef;
  @ViewChild('changeIncomeModal') changeIncomeModal: ElementRef;

  modalRef: BsModalRef;

  pencilIcon = faPencilAlt;
  message = getTranslation("messageDashboard");
  welcomeMessage = getTranslation("welcomeMessageDashboard");
  cards: Card[] = [];
  alerts: Alert[] = [];
  analytics: Array<Object> = [];
  overview = getTranslation("overview");
  incomeRow = getTranslation("incomeRow");
  currency: String;
  incomeLastMonth: any;
  expensesRow = getTranslation("expensesRow");
  balanceRow = getTranslation("balanceRow");
  expensesLastMonth: any;
  analyticsField = getTranslation("analyticsField");
  noData: string = getTranslation("noData");
  incomeModalTitle = getTranslation("incomeModalTitle");
  incomeModalPlaceholderIncome = getTranslation("incomeModalPlaceholderIncome");
  incomeModalPlaceholderDate = getTranslation("incomeModalPlaceholderDate");
  incomeModalSaveButton = getTranslation("incomeModalSaveButton");
  incomeModalCloseButton = getTranslation("incomeModalCloseButton");
  chartData: Array<Number> = [];
  chartColors: Array<Object> = [];
  chartLabels: Array<String> = [];

  hasChangeIncomeMessage: boolean = false;
  changeIncomeMessage: string = ""

  constructor(
    private router: Router,
    private api: ApiService,
    private authentication: AuthenticationService,
    private modalService: BsModalService,
    private connectionService: ConnectionService
  ) { }

  ngOnInit(): void {
    this.api.getUser().then(result => {
      const user: User = result;
      this.refreshLanguage(result.language);
      this.cards = this.generateCards(user.bills, user.expense, user.paycheck, user.paycheckDate);
      this.alerts = this.generateAlerts(user.envelopes, user.bills, user.goals);
      this.analytics = this.generateAnalyitcs(result.expense, result.paycheckDate)
      this.currency = user.defaultCurrency;
      this.incomeLastMonth = user.paycheckLastMonth;
      this.expensesLastMonth = this.getTotalCost(this.getLastMonthExpenses(user.expense, user.paycheckDate));
    }).catch(error => {
      this.authentication.logout();
      this.router.navigate(['/']);
    });
  }

  public hasConnection(): boolean {
    return this.connectionService.hasConnection;
  }

  async refreshLanguage(language: string) {
    setLanguage(language);
        
    this.message = getTranslation("messageDashboard");
    this.welcomeMessage = getTranslation("welcomeMessageDashboard");
    this.overview = getTranslation("overview");
    this.incomeRow = getTranslation("incomeRow");
    this.expensesRow = getTranslation("expensesRow");
    this.balanceRow = getTranslation("balanceRow");
    this.analyticsField = getTranslation("analyticsField");
    this.noData = getTranslation("noData");
    this.incomeModalTitle = getTranslation("incomeModalTitle");
    this.incomeModalPlaceholderIncome = getTranslation("incomeModalPlaceholderIncome");
    this.incomeModalPlaceholderDate = getTranslation("incomeModalPlaceholderDate");
    this.incomeModalSaveButton = getTranslation("incomeModalSaveButton");
    this.incomeModalCloseButton = getTranslation("incomeModalCloseButton");
  }

  amountDashboard1(ammountField: any): number {
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    if(!regex.test(ammountField.value)){
      ammountField.style.setProperty("border-color", "red", "important");
      $('.tt1').toast('show');
      return 0;
    } 
    else {
      ammountField.style.borderColor = "#ced4da";
      $('.tt1').toast('hide');
      return 1;
    }
  }

  dateDashboard1(dateField: any): number {
    if (dateField.value < 1 || dateField.value > 28) {
      dateField.style.setProperty("border-color", "red", "important");
      $('.tt2').toast('show');
      return 0;
    } 
    else {
      dateField.style.borderColor = "#ced4da";
      $('.tt2').toast('hide');
      return 1;
    }
  }

  buttonDashboard(ammountField: any, dateField: any, template: TemplateRef<any>): void {
    var amount = this.amountDashboard1(ammountField)
    var date = this.dateDashboard1(dateField);
    if (amount == 0 || date == 0) {
      //DO NOTHING
    } 
    else {
      //POST REQUEST - TO BE ADDED
      this.hasChangeIncomeMessage = true;
      this.changeIncomeMessage = "Saving income"

      this.api.changeIncome(ammountField.value, dateField.value).then(result => {
        this.modalRef.hide();
        this.hasChangeIncomeMessage = false;
      }).catch(error => {
        console.log(error);
        this.changeIncomeMessage = "Saving failed!"
      });
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
        new Card(1, 'bg-primary', 'faUniversity', (isNaN(budgetLeft) ? 0 : budgetLeft), getTranslation("cardTitle1"), null),
        new Card(2, 'bg-primary', 'faCoins', totalBills, getTranslation("cardTitle2"), null),
        new Card(3, 'bg-primary', 'faPiggyBank', (isNaN(budgetLeft - totalBills) ? 0 : budgetLeft - totalBills), getTranslation("cardTitle3"), null),
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
      envelopesAlerts.push(new Alert('alert-warning', getTranslation("alertName1"), totalAlmostEmptyEnvelopes + getTranslation("alertText1")));
    }
    if (totalEmptyEnvelopes > 0) {
        envelopesAlerts.push(new Alert('alert-danger', getTranslation("alertName1"), totalEmptyEnvelopes + getTranslation("alertText1_1")));
    }

    return envelopesAlerts;
  }

  generateBillsAlerts(bills) {
    var billsAlerts = [];

    const nearBills = this.getBillsInTheNext7Days(bills);
    if (nearBills.length > 0) {
      billsAlerts.push(new Alert('alert-warning', getTranslation("alertName2"), nearBills.length + getTranslation("alertText2")));
    }
    return billsAlerts;
  }

  generateGoalsAlerts(goals) {
    var count = this.goalsCompleted(goals);
    if (count) {
        return [new Alert('alert-success', getTranslation("alertName3"), count + getTranslation("alertText3"))];
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
                rowName: getTranslation("analyticsRowName1"),
                color: mostMoneySpentOn.color,
                category: mostMoneySpentOn.name
            },
            {
                rowName: getTranslation("analyticsRowName2"),
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

  alertsExist(): Boolean {
    return this.alerts.length > 0;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(){
    this.modalRef.hide();
  }
}
