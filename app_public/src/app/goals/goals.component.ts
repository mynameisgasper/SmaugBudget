import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { Card } from '../card';
declare var $:any;

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  constructor(private api: ApiService) { }

  cards: Card[]
  faPlusSquare = faPlusSquare;

  @ViewChild('nameGoal') nameGoal: ElementRef;
  @ViewChild('categoryGoal') categoryGoal: ElementRef;
  @ViewChild('amountGoal') amountGoal: ElementRef;
  @ViewChild('dateGoal') dateGoal: ElementRef;
  @ViewChild('addAmount') addAmount: ElementRef;

  ngOnInit(): void {
    this.api.getUser().then(result => {
      this.cards = this.generateCards(result.goals);
      console.log(this.cards);
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

  buttonAddGoal(): void {
    var name = this.nameAddGoals();
    var category = this.categoryCheckAddGoal();
    var amount = this.amountGoals();
    var date = this.dateCheckAddGoal();
    
    if (name == 0 || category == 0 || amount == 0 || date == 0 ) {
        //DO NOTHING
    } else {
        //POST REQUEST - TO BE ADDED
    }
  }

  buttonGoalsAddMoney(): void {
    var amount = this.amountGoalsAddMoney();

    
    if (amount == 0) {
        //DO NOTHING
    } else {
        //POST REQUEST - TO BE ADDED
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
      if(goal.target == goal.saved)
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
