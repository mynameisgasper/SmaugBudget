import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../services/api.service';
import { Card } from '../../classes/card';
import { Goal } from '../../classes/goal';
import { Category } from '../../classes/category';
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common';
declare var $:any;

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  constructor(
    private api: ApiService,
    private renderer: Renderer2,) { }

  cards: Card[]
  goals: Goal[]
  categories: Category[];
  currency: String;
  message: String;
  welcomeMessage: String;
  faPlusSquare = faPlusSquare;

  @ViewChild('nameGoal') nameGoal: ElementRef;
  @ViewChild('categoryGoal') categoryGoal: ElementRef;
  @ViewChild('amountGoal') amountGoal: ElementRef;
  @ViewChild('dateGoal') dateGoal: ElementRef;
  @ViewChild('addAmount') addAmount: ElementRef;

  ngOnInit(): void {
    this.api.getUser().then(result => {
      this.goals = this.generateGoals(result.goals);
      this.cards = this.generateCards();
      this.categories = this.generateCategories(result.categories);
      this.currency = result.defaultCurrency;
      this.message = "Welcome to Goals!";
      this.welcomeMessage = "Here you can add saving goals you want to achieve. Click 'Add Goal', fill in the form, submit and you`re done!";
    }).catch(error => console.log(error));
  }

  hasTargetLeft(value: Number): Boolean {
    return value > 0;
  }

  areEqual(val1: String, val2: String): Boolean {
    return val1 === val2;
  }

  nameAddGoals() {
    const field = this.nameGoal.nativeElement;
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[ A-Za-z0-9_@./#&+-: ]{1,16}$");
    //uppercase, lowercase, številke, posebni znaki, dolžina od 1-16
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt4').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt4').toast('hide')
        return 1;
    }
  }

  categoryCheckAddGoal() {
    const field = this.categoryGoal.nativeElement;
    if (field.value == "Select Category") {
        field.style.setProperty("border-color", "red", "important");
        $('.tt69').toast('show');
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt69').toast('hide');
        return 1;
    }
  }

  amountGoals() {
    const field = this.amountGoal.nativeElement;
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt3').toast('show');
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt3').toast('hide');
        return 1;
    }
  }

  dateCheckAddGoal() {
    const field = this.dateGoal.nativeElement;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var inputDate = field.value.split("-");

    if (inputDate == "") {
        $('#mjav').toast('show');
        field.style.setProperty("border-color", "red", "important");
        return 0;
    }

    if (inputDate[0] > yyyy) {
        $('#mjav').toast('hide');
        field.style.borderColor = "#ced4da";
        return 1;
    } else if (inputDate[0] == yyyy) {
        if (inputDate[1] > mm) {
            $('#mjav').toast('hide');
            field.style.borderColor = "#ced4da";
            return 1;
        } else if (inputDate[1] == mm) {
            /* 
            ? IF DAY IS >= NOW */
            if (inputDate[2] >= dd) {
                $('#mjav').toast('hide');
                field.style.borderColor = "#ced4da";
                return 1;
            } else {
                $('#mjav').toast('show');
                field.style.setProperty("border-color", "red", "important");
                return 0;
            }
        } else {
            $('#mjav').toast('show');
            field.style.setProperty("border-color", "red", "important");
            return 0;
        }
    } else {
        $('#date-hint').toast('show');
        field.style.setProperty("border-color", "red", "important");
        return 0;
    }
  }

  amountGoalsAddMoney() {
    const field = this.addAmount.nativeElement;
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.toastAddMoneyForm').toast('show');
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.toastAddMoneyForm').toast('hide');
        return 1;
    }
  }

  buttonAddGoal(nameValue: string, categoryValue: string, amountValue: number, dateValue: Date): void {
    var name = this.nameAddGoals();
    var category = this.categoryCheckAddGoal();
    var amount = this.amountGoals();
    var date = this.dateCheckAddGoal();
    
    if (name == 0 || category == 0 || amount == 0 || date == 0 ) {
        //DO NOTHING
    } else {
      this.renderer.setAttribute(document.getElementById("buttonAddGoal"), 'data-dismiss', 'modal');
      this.addGoal(nameValue, categoryValue, amountValue, dateValue);
      this.renderer.removeAttribute(document.getElementById("buttonAddGoal"), 'data-dismiss', 'modal');
    }
  }

  buttonGoalsAddMoney(addAmount: string, titleGoal: string): void {
    var amount = this.amountGoalsAddMoney();
    
    if (amount == 0) {
        //DO NOTHING
    } else {
      this.renderer.setAttribute(document.getElementById("buttonAddMoneyToGoal"), 'data-dismiss', 'modal');
      this.addMoneyToGoal(addAmount, titleGoal);
      this.renderer.removeAttribute(document.getElementById("buttonAddMoneyToGoal"), 'data-dismiss', 'modal');
    }
  }

  generateCards() {
    var totalGoals = this.goals.length;
    var completedGoals = this.getCompletedGoals();
    var comment = this.generateComment(completedGoals);

    return [
      new Card(1, 'bg-primary', 'faBullseye', totalGoals, 'Goals Total', null),
      new Card(21, 'green-panel', 'faCheckCircle', completedGoals, 'Goals Completed', comment),
    ];
  }

  getCompletedGoals(){
    var count = 0;
    for (var goal of this.goals) {
      if(goal.targetLeft <= 0)
        count++;
    }

    return count;
  }

  generateComment(completedGoals){
    var comment = "";
    if(completedGoals == 0)
      comment = "No goals completed.";
    else if (completedGoals > 2)
      comment = "Multiple goals completed!";
    else{
      for (var goal of this.goals) {
        if(goal.targetLeft <= 0)
          comment += goal.title + ", ";
      }
      comment = comment.substring(0, comment.length - 2);
      comment += " completed!"
    }
    
    return comment;
  }

  generateGoals(goals) {
    var goalsArray = [];
    for(var goal of goals){
      var date = goal.date.split("-");
      date[2] = date[2].substring(0, 2);

      var progress = Math.ceil(goal.saved / goal.target * 100);
      var targetLeft = goal.target - goal.saved;
      var monthlyTarget = this.calculateDailyTarget(goal.date, targetLeft);
      
      var color = "#2f7cfe";
      if (targetLeft <= 0)
          color = "#00cf1d"

      goalsArray.push(new Goal(goal._id, goal.title, progress , goal.target, targetLeft, color, monthlyTarget, goal.category.name, date[0], date[1], date[2]));
    }
  
    return goalsArray;
  }

  calculateDailyTarget(date, targetLeft) {
    var today = new Date();

    var goalDate = date.split("-");
    var y = parseInt(goalDate[0], 10)
    var m = parseInt(goalDate[1], 10)
    var d = parseInt(goalDate[2], 10)
    var endDate = new Date(y, m - 1, d);

    let diffTime = Math.abs(new Date(today).valueOf() - new Date(endDate).valueOf());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1)
        return targetLeft;
    else
        return Math.ceil(targetLeft / diffDays);
  }

  addGoal(name, category, amount, date){
    this.api.addGoal(name, category, amount, date).then((response) => {
      this.afterAddGoal(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  afterAddGoal(goal){
    var date = goal.date.split("-");
    date[2] = date[2].substring(0, 2);

    var progress = Math.ceil(goal.saved / goal.target * 100);
    var targetLeft = goal.target - goal.saved;
    var monthlyTarget = this.calculateDailyTarget(goal.date, targetLeft);
    
    var color = "#2f7cfe";
    if (targetLeft <= 0)
        color = "#00cf1d"

    this.goals.push(new Goal(goal._id, goal.title, progress , goal.target, targetLeft, color, monthlyTarget, goal.category.name, date[0], date[1], date[2]));
    this.cards = this.generateCards();
    console.log()
  }

  addMoneyToGoal(amount, title){
    this.api.addMoneyToGoal(amount, title).then((response) => {
      this.afterAddMoneyToGoal(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  afterAddMoneyToGoal(goal){
    var goalObject = this.goals.find(goalObject => goalObject._id === goal._id)
    var progress = Math.ceil(goal.saved / goal.target * 100);
    var targetLeft = goal.target - goal.saved;
    var monthlyTarget = this.calculateDailyTarget(goal.date, targetLeft);
    var color = "#2f7cfe";
    if (targetLeft <= 0)
        color = "#00cf1d"

    goalObject.targetLeft = targetLeft;
    goalObject.progress = progress;
    goalObject.monthlyTarget = monthlyTarget;
    goalObject.color = color;

    this.cards = this.generateCards();
  }

  afterDelete(goalId){
    const index = this.goals.findIndex(goalObject => goalObject._id === goalId)
    if (index > -1) {
      this.goals.splice(index, 1);
    }
    this.cards = this.generateCards();
  }

  afterEdit(goal){
    var goalObject = this.goals.find(goalObject => goalObject._id === goal._id)
    var date = goal.date.split("-");
    date[2] = date[2].substring(0, 2);

    var progress = Math.ceil(goal.saved / goal.target * 100);
    var targetLeft = goal.target - goal.saved;
    var monthlyTarget = this.calculateDailyTarget(goal.date, targetLeft);
    
    var color = "#2f7cfe";
    if (targetLeft <= 0)
        color = "#00cf1d";

    goalObject._id = goal._id;
    goalObject.title = goal.title
    goalObject.progress = progress;
    goalObject.target = goal.target;
    goalObject.targetLeft = targetLeft;
    goalObject.color = color;
    goalObject.monthlyTarget = monthlyTarget;
    goalObject.categoryName = goal.category.name;  
    goalObject.year = date[0];
    goalObject.month = date[1];
    goalObject.day = date[2];

    this.cards = this.generateCards();
  }

  generateCategories(categories){
    var categoriesArray = [];
    for(var category of categories){
      var newCategory: Category = {_id: category._id, name: category.name, color: category.color, basic: category.basic}
      categoriesArray.push(newCategory);
    }
  
    return categoriesArray;
  }

  data = {
    //zaenkat pustim kr nwm ce se se kje rab 
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
  }
}
