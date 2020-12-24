import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
declare var $:any;

@Component({
  selector: 'app-envelopes',
  templateUrl: './envelopes.component.html',
  styleUrls: ['./envelopes.component.css']
})
export class EnvelopesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('categoryAdd') categoryAdd: ElementRef;
  @ViewChild('amountAdd') amountAdd: ElementRef;
  @ViewChild('nameExpense') nameExpense: ElementRef;
  @ViewChild('amountExpense') amountExpense: ElementRef;
  @ViewChild('dateExpense') dateExpense: ElementRef;

  faPlusSquare = faPlusSquare;

  nameAddEnvelopes(): number {
    const field = this.categoryAdd.nativeElement;
    if (!field.disabled) {
        //var field = document.getElementById("PayeeModal");
        var regex = new RegExp("^[ A-Za-z0-9_@./#&+-: ]{1,14}$");
        //uppercase, lowercase, številke, posebni znaki, dolžina od 1-16
        if (!field.value.match(regex)) {
            field.style.setProperty("border-color", "red", "important");
            $('.tt5').toast('show');
            return 0;
        } else {
            field.style.borderColor = "#ced4da";
            $('.tt5').toast('hide')
            return 1;
        }
    } else {
        return 1;
    }
  }

  amountAddEnvelopes(): number {
    const field = this.amountAdd.nativeElement;
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt1').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt1').toast('hide')
        return 1;
    }
  }

  nameExpenseEnvelopes(): number {
    const field = this.nameExpense.nativeElement;
    var regex = new RegExp("^[ A-Za-z0-9_@./#&+-: ]{1,16}$");
    //uppercase, lowercase, številke, posebni znaki, dolžina od 1-16
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt2').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt2').toast('hide')
        return 1;
    }
  }

  amountExpenseEnvelopes() {
    const field = this.amountExpense.nativeElement;
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt8').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt8').toast('hide')
        return 1;
    }
  }

  dateExpenseEnvelopes() {
    const field = this.dateExpense.nativeElement;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var inputDate = field.value.split("-");

    if (inputDate[0] < yyyy) {
        $('.tt4').toast('hide');
        field.style.borderColor = "#ced4da";
        return 1;
    } else if (inputDate[0] == yyyy) {
        if (inputDate[1] < mm) {
            $('.tt4').toast('hide');
            field.style.borderColor = "#ced4da";
            return 1;
        } else if (inputDate[1] == mm) {
            /* 
            ? IF DAY IS >= NOW */
            if (inputDate[2] <= dd) {
                $('.tt4').toast('hide');
                field.style.borderColor = "#ced4da";
                return 1;
            } else {
                $('.tt4').toast('show');
                field.style.setProperty("border-color", "red", "important");
                return 0;
            }
        } else {
            $('.tt4').toast('show');
            field.style.setProperty("border-color", "red", "important");
            return 0;
        }
    } else {
        $('.tt4').toast('show');
        field.style.setProperty("border-color", "red", "important");
        return 0;
    }
  }

  data = {
    "fileName":"envelopes",
    "message":"Welcome to Envelopes!",
    "welcomeMessage":"This is the best way to track your monthly and weekly spending per category. Start by clicking 'Add Envelope'.",
    "logout":"Logout",
    "year":2020,
    "month":12,
    "day":21,
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
    "setMonthNumber":11,
    "card":[
    {
      "id":1,
      "title":"Envelopes Total",
      "color":"bg-primary",
      "icon":"faEnvelope",
      "count":10
    },{
      "id":21,
      "title":"Almost Empty",
      "color":"bg-warning",
      "count":0,
      "icon":"faExclamationTriangle",
      "comment":"No almost empty envelopes!"
    },{
      "id":31,
      "title":"Empty",
      "color":"bg-danger",
      "count":0,
      "icon":"faRadiation",
      "comment":"No empty envelopes!"
    }],
    "setMonth":"DEC",
    "currentMonth":"DEC",
    "envelope":[
    {
      "_id":"5fc600b4507a6800112af1df",
      "progress":258,
      "budget":60,
      "spent":155,
      "colorHex":"#32a89c",
      "color":"rgb(50, 168, 156)",
      "bgColor":"rgba(50, 168, 156, 0.5)",
      "month":"NOV",
      "category":{
        "_id":"5fc600b4507a6800112af1e0",
        "color":"rgb(50, 168, 156)",
        "basic":true,
        "name":"Car",
        "__v":0
      }
    },{
      "_id":"5fc600b4507a6800112af1e1",
      "progress":65,
      "budget":120,
      "spent":78,
      "colorHex":"#e8b017",
      "color":"rgb(232, 176, 23)",
      "bgColor":"rgba(232, 176, 23, 0.5)",
      "month":"NOV",
      "category":{
        "_id":"5fc600b4507a6800112af1e2",
        "color":"rgb(232, 176, 23)",
        "basic":true,
        "name":"Groceries",
        "__v":0
      }
    },{
      "_id":"5fc600b4507a6800112af1e3",
      "progress":82,
      "budget":55,
      "spent":45,
      "colorHex":"#bf21c2",
      "color":"rgb(191, 33, 194)",
      "bgColor":"rgba(191, 33, 194, 0.5)",
      "month":"NOV",
      "category":{
        "_id":"5fc600b4507a6800112af1e4",
        "color":"rgb(191, 33, 194)",
        "basic":true,
        "name":"Leisure",
        "__v":0
      }
    },{
      "_id":"5fc600b4507a6800112af1e5",
      "progress":29,
      "budget":35,
      "spent":10,
      "colorHex":"#d11768",
      "color":"rgb(209, 23, 104)",
      "bgColor":"rgba(209, 23, 104, 0.5)",
      "month":"NOV",
      "category":{
        "_id":"5fc600b4507a6800112af1e6",
        "color":"rgb(209, 23, 104)",
        "basic":true,
        "name":"Subscriptions",
        "__v":0
      }
    },{
      "_id":"5fc600b4507a6800112af1e7",
      "progress":45,
      "budget":40,
      "spent":18,
      "colorHex":"#5834b3",
      "color":"rgb(88, 52, 179)",
      "bgColor":"rgba(88, 52, 179, 0.5)",
      "month":"NOV",
      "category":{
        "_id":"5fc600b4507a6800112af1e8",
        "color":"rgb(88, 52, 179)",
        "basic":true,
        "name":"Travel",
        "__v":0
      }
    },{
      "_id":"5fc600b4507a6800112af1e9",
      "progress":0,
      "budget":35,
      "spent":0,
      "colorHex":"#add134"
      ,"color":"rgb(173, 209, 52)",
      "bgColor":"rgba(173, 209, 52, 0.5)",
      "month":"NOV",
      "category":{
        "_id":"5fc600b4507a6800112af1ea",
        "color":"rgb(173, 209, 52)",
        "basic":true,
        "name":"Home",
        "__v":0
      }
    },{
      "_id":"5fc600b4507a6800112af1eb",
      "progress":0,
      "budget":25,
      "spent":0,
      "colorHex":"#32a852",
      "color":"rgb(50, 168, 82)",
      "bgColor":"rgba(50, 168, 82, 0.5)",
      "month":"NOV",
      "category":{
        "_id":"5fc600b4507a6800112af1ec",
        "color":"rgb(50, 168, 82)",
        "basic":true,
        "name":"Gifts",
        "__v":0
      }
    },{
      "_id":"5fc600b4507a6800112af1ed",
      "progress":93,
      "budget":120,
      "spent":111,
      "colorHex":"#30bf62",
      "color":"rgb(209, 73, 23)",
      "bgColor":"rgba(209, 73, 23, 0.5)",
      "month":"NOV",
      "category":{
        "_id":"5fc600b4507a6800112af1ee",
        "color":"rgb(209, 73, 23)",
        "basic":true,
        "name":"Shopping",
        "__v":0
      }
    },{
      "_id":"5fc600b4507a6800112af1ef",
      "progress":45,
      "budget":100,
      "spent":45,
      "colorHex":"#51dbed",
      "color":"rgb(81, 219, 237)",
      "bgColor":"rgba(81, 219, 237, 0.5)",
      "month":"NOV",
      "category":{
        "_id":"5fc600b4507a6800112af1f0",
        "color":"rgb(81, 219, 237)",
        "basic":true,
        "name":"Utilities",
        "__v":0
      }
    },{
      "_id":"5fc600b4507a6800112af1f1",
      "progress":92,
      "budget":70,
      "spent":55,
      "colorHex":"#32a89c",
      "color":"rgb(50, 168, 156)",
      "bgColor":"rgba(50, 168, 156, 0.5)",
      "month":"OCT",
      "category":{
        "_id":"5fc600b4507a6800112af1f2",
        "color":"rgb(50, 168, 156)",
        "basic":true,
        "name":"Car"
      }
    },{
      "_id":"5fc600b4507a6800112af1f3",
      "progress":96,
      "budget":120,
      "spent":115,
      "colorHex":"#e8b017",
      "color":"rgb(232, 176, 23)",
      "bgColor":"rgba(232, 176, 23, 0.5)",
      "month":"OCT",
      "category":{
        "_id":"5fc600b4507a6800112af1f4",
        "color":"rgb(232, 176, 23)",
        "basic":true,"name":"Groceries"
      }
    },{
      "_id":"5fc600b4507a6800112af1f5",
      "progress":107,
      "budget":70,
      "spent":75,
      "colorHex":"#bf21c2",
      "color":"rgb(191, 33, 194)",
      "bgColor":"rgba(191, 33, 194, 0.5)",
      "month":"OCT",
      "category":{
        "_id":"5fc600b4507a6800112af1f6",
        "color":"rgb(191, 33, 194)",
        "basic":true,
        "name":"Leisure"
      }
    },{
      "_id":"5fc600b4507a6800112af1f7",
      "progress":43,
      "budget":35,
      "spent":15,
      "colorHex":"#d11768",
      "color":"rgb(209, 23, 104)",
      "bgColor":"rgba(209, 23, 104, 0.5)",
      "month":"OCT",
      "category":{
        "_id":"5fc600b4507a6800112af1f8",
        "color":"rgb(209, 23, 104)",
        "basic":true,
        "name":"Subscriptions"
      }
    },{
      "_id":"5fc600b4507a6800112af1f9",
      "progress":25,
      "budget":45,
      "spent":11,
      "colorHex":"#5834b3",
      "color":"rgb(88, 52, 179)",
      "bgColor":"rgba(88, 52, 179, 0.5)",
      "month":"OCT",
      "category":{
        "_id":"5fc600b4507a6800112af1fa",
        "color":"rgb(88, 52, 179)",
        "basic":true,
        "name":"Travel"
      }
    },{
      "_id":"5fc600b4507a6800112af1fb",
      "progress":0,
      "budget":35,
      "spent":0,
      "colorHex":"#add134",
      "color":"rgb(173, 209, 52)",
      "bgColor":"rgba(173, 209, 52, 0.5)",
      "month":"OCT",
      "category":{
        "_id":"5fc600b4507a6800112af1fc",
        "color":"rgb(173, 209, 52)",
        "basic":true,
        "name":"Home"
      }
    },{
      "_id":"5fc600b4507a6800112af1fd",
      "progress":0,
      "budget":25,
      "spent":0,
      "colorHex":"#32a852",
      "color":"rgb(50, 168, 82)",
      "bgColor":"rgba(50, 168, 82, 0.5)",
      "month":"OCT",
      "category":{
        "_id":"5fc600b4507a6800112af1fe",
        "color":"rgb(50, 168, 82)",
        "basic":true,
        "name":"Gifts"
      }
    },{
      "_id":"5fc600b4507a6800112af1ff",
      "progress":83,
      "budget":120,
      "spent":100,
      "colorHex":"#30bf62",
      "color":"rgb(48, 191, 98)",
      "bgColor":"rgba(48, 191, 98, 0.5)",
      "month":"OCT",
      "category":{
        "_id":"5fc600b4507a6800112af200",
        "color":"rgb(48, 191, 98)",
        "basic":true,
        "name":"Shopping"
      }
    },{
      "_id":"5fc600b4507a6800112af201",
      "progress":51,
      "budget":100,
      "spent":51,
      "colorHex":"#51dbed",
      "color":"rgb(81, 219, 237)",
      "bgColor":"rgba(81, 219, 237, 0.5)",
      "month":"OCT",
      "category":{
        "_id":"5fc600b4507a6800112af202",
        "color":"rgb(81, 219, 237)",
        "basic":true,
        "name":"Utilities"
      }
    },{
      "_id":"5fc600b4507a6800112af203",
      "progress":0,
      "budget":100,
      "spent":0,
      "colorHex":"#32a89c",
      "color":"rgb(50, 168, 156)",
      "bgColor":"rgba(50, 168, 156, 0.5)",
      "month":"DEC",
      "category":{
        "_id":"5fc42028ee6abc0760345c38",
        "color":"rgb(50, 168, 156)",
        "basic":true,
        "name":"Car"
      }
    },{
      "_id":"5fc600b4507a6800112af205",
      "progress":0,
      "budget":120,
      "spent":0,
      "colorHex":"#e8b017",
      "color":"rgb(232, 176, 23)",
      "bgColor":"rgba(232, 176, 23, 0.5)",
      "month":"DEC",
      "category":{
        "_id":"5fc42028ee6abc0760345c39",
        "color":"rgb(232, 176, 23)",
        "basic":true,
        "name":"Groceries"
      }
    },{
      "_id":"5fc600b4507a6800112af207",
      "progress":0,
      "budget":60,
      "spent":0,
      "colorHex":"#bf21c2",
      "color":"rgb(191, 33, 194)",
      "bgColor":"rgba(191, 33, 194, 0.5)",
      "month":"DEC",
      "category":{
        "_id":"5fc42028ee6abc0760345c3a",
        "color":"rgb(191, 33, 194)",
        "basic":true,
        "name":"Leisure"
      }
    },{
      "_id":"5fc600b4507a6800112af209",
      "progress":0,
      "budget":35,
      "spent":0,
      "colorHex":"#d11768",
      "color":"rgb(209, 23, 104)",
      "bgColor":"rgba(209, 23, 104, 0.5)",
      "month":"DEC",
      "category":{
        "_id":"5fc42028ee6abc0760345c3b",
        "color":"rgb(209, 23, 104)",
        "basic":true,
        "name":"Subscriptions"
      }
    },{
      "_id":"5fc600b4507a6800112af20b",
      "progress":0,
      "budget":40,
      "spent":0,
      "colorHex":"#5834b3",
      "color":"rgb(88, 52, 179)",
      "bgColor":"rgba(88, 52, 179, 0.5)",
      "month":"DEC",
      "category":{
        "_id":"5fc42028ee6abc0760345c3c",
        "color":"rgb(88, 52, 179)",
        "basic":true,
        "name":"Travel"
      }
    },{
      "_id":"5fc600b4507a6800112af20d",
      "progress":0,
      "budget":30,
      "spent":0,
      "colorHex":"#add134",
      "color":"rgb(173, 209, 52)",
      "bgColor":"rgba(173, 209, 52, 0.5)",
      "month":"DEC",
      "category":{
        "_id":"5fc42028ee6abc0760345c3d",
        "color":"rgb(173, 209, 52)",
        "basic":true,
        "name":"Home"
      }
    },{
      "_id":"5fc600b4507a6800112af20f",
      "progress":0,
      "budget":30,
      "spent":0,
      "colorHex":"#32a852",
      "color":"rgb(50, 168, 82)",
      "bgColor":"rgba(50, 168, 82, 0.5)",
      "month":"DEC",
      "category":{
        "_id":"5fc42028ee6abc0760345c3e",
        "color":"rgb(50, 168, 82)",
        "basic":true,
        "name":"Gifts"
      }
    },{
      "_id":"5fc600b4507a6800112af211",
      "progress":0,
      "budget":100,
      "spent":0,
      "colorHex":"#d14917",
      "color":"rgb(209, 73, 23)",
      "bgColor":"rgba(209, 73, 23, 0.5)",
      "month":"DEC",
      "category":{
        "_id":"5fc42028ee6abc0760345c3f",
        "color":"rgb(209, 73, 23)",
        "basic":true,
        "name":"Shopping"
      }
    },{
      "_id":"5fc600b4507a6800112af213",
      "progress":0,
      "budget":100,
      "spent":0,
      "colorHex":"#51dbed",
      "color":"rgb(81, 219, 237)",
      "bgColor":"rgba(81, 219, 237, 0.5)",
      "month":"DEC",
      "category":{
        "_id":"5fc42028ee6abc0760345c40",
        "color":"rgb(81, 219, 237)",
        "basic":true,
        "name":"Utilities"
      }
    },{
      "_id":"5fc600b4507a6800112af215",
      "progress":0,
      "budget":100,
      "spent":0,
      "colorHex":"#28eb4f",
      "color":"rgb(40, 235, 79)",
      "bgColor":"rgba(40, 235, 79, 0.5)",
      "month":"DEC",
      "category":{
        "_id":"5fc42028ee6abc0760345c41",
        "color":"rgb(40, 235, 79)",
        "basic":true,
        "name":"Electronics"
      }
    }],
    "category":[
    {
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
    "currency":"EUR",
    "conEnvelopes":[]
  }
}
