import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { Card } from '../card';
import { Goal } from '../goal';
import { Router } from "@angular/router"
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
    private router: Router,
    private renderer: Renderer2,) { }

  cards: Card[]
  goals: Goal[]
  faPlusSquare = faPlusSquare;

  @ViewChild('nameGoal') nameGoal: ElementRef;
  @ViewChild('categoryGoal') categoryGoal: ElementRef;
  @ViewChild('amountGoal') amountGoal: ElementRef;
  @ViewChild('dateGoal') dateGoal: ElementRef;
  @ViewChild('addAmount') addAmount: ElementRef;

  ngOnInit(): void {
    this.api.getUser().then(result => {
      this.goals = this.generateGoals(result.goals);
      this.cards = this.generateCards(this.goals);
      console.log(this.goals);
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

  generateCards(goals) {
    var totalGoals = goals.length;
    var completedGoals = this.getCompletedGoals(goals);
    var comment = this.generateComment(goals, completedGoals);

    return [
      new Card(1, 'bg-primary', 'faBullseye', totalGoals, 'Goals Total', null),
      new Card(21, 'green-panel', 'faCheckCircle', completedGoals, 'Goals Completed', comment),
    ];
  }

  getCompletedGoals(goals){
    var count = 0;
    for (var goal of goals) {
      if(goal.targetLeft == 0)
        count++;
    }

    return count;
  }

  generateComment(goals, completedGoals){
    var comment = "";
    if(completedGoals == 0)
      comment = "No goals completed.";
    else if (completedGoals > 2)
      comment = "Multiple goals completed!";
    else{
      for (var goal of goals) {
        if(goal.target == goal.saved)
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
      this.parseAddGoalResponse(response);
      this.cards = this.generateCards(this.goals);
    }).catch((error) => {
      console.log(error);
    });
  }

  parseAddGoalResponse(goal){
    console.log(goal)
    var date = goal.date.split("-");
    date[2] = date[2].substring(0, 2);

    var progress = Math.ceil(goal.saved / goal.target * 100);
    var targetLeft = goal.target - goal.saved;
    var monthlyTarget = this.calculateDailyTarget(goal.date, targetLeft);
    
    var color = "#2f7cfe";
    if (targetLeft <= 0)
        color = "#00cf1d"

    this.goals.push(new Goal(goal._id, goal.title, progress , goal.target, targetLeft, color, monthlyTarget, goal.category.name, date[0], date[1], date[2]));
  }

  addMoneyToGoal(amount, title){
    this.api.addMoneyToGoal(amount, title).then((response) => {
      this.parseAddMoneyToGoalResponse(response);
      this.cards = this.generateCards(this.goals);
    }).catch((error) => {
      console.log(error);
    });
  }

  parseAddMoneyToGoalResponse(goal){
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
    }


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
      "id":21,
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
