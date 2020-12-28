import { Component, OnInit, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Expense } from '../../classes/expense';
import { ApiService } from '../../services/api.service';
declare var $:any;

@Component({
  selector: 'tr [history-table-row]',
  templateUrl: './history-table-element.component.html',
  styleUrls: ['./history-table-element.component.css']
})
export class HistoryTableElementComponent implements OnInit {

  faPencilAlt = faPencilAlt

  @Input()
  Expense: Expense;

  @Input()
  Currency: string;

  @Input()
  Categories =   {
    "color":"",
    "basic":true,
    "_id":"",
    "name":""
  }

  year: number = 2020;
  month: number = 1;
  day: number = 1;

  constructor(
    private renderer: Renderer2,
    private api: ApiService,
  ) { }

  @ViewChild('id') id: ElementRef;
  @ViewChild('category') category: ElementRef;
  @ViewChild('name') name: ElementRef;
  @ViewChild('amount') amount: ElementRef;
  @ViewChild('date') date: ElementRef;

  hasEditMessage: boolean = false;
  editMessage: string = "";

  ngOnInit(): void {
    const date: Date = new Date(this.Expense.date);
    this.day = date.getDate();
    this.month = date.getMonth();
    this.year = date.getFullYear();
  }

  editExpense(): void {
    this.hasEditMessage = true;
    this.editMessage = "Saving expense";

    this.api.editExpense(
      this.id.nativeElement.value,
      this.category.nativeElement.value,
      this.name.nativeElement.value,
      this.amount.nativeElement.value,
      this.date.nativeElement.value
    ).then(result => {
      this.hasEditMessage = false;
      this.Expense.category.name = this.category.nativeElement.value;
      this.Expense._id = this.id.nativeElement.value;
      this.Expense.recipient = this.name.nativeElement.value;
      this.Expense.value = this.amount.nativeElement.value;
      //this.Expense.date = this.date.nativeElement.value
      let dateArr = this.parseDate(this.date.nativeElement.value);
      this.day = parseInt(dateArr[2]);
      this.month = parseInt(dateArr[1]) - 1;
      this.year = parseInt(dateArr[0]);
    }).catch(error => this.editMessage = "Failed to save!");
  }

  nameEditHistory(): number {
    const field = this.name.nativeElement;
    var regex = new RegExp("^[A-Za-z0-9_@./#&+-: ]{1,20}$");
    //uppercase, lowercase, številke, posebni znaki, dolžina od 1-20
    if (!regex.test(field.value)) {
        field.style.setProperty("border-color", "red", "important");
        $(field.id).toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $(field.id).toast('hide')
        return 1;
    }
  }

  amountEditHistory(): number {
    const field = this.amount.nativeElement;
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
    //črkev male,velike,številke
    if (!regex.test(field.value)) {
        field.style.setProperty("border-color", "red", "important");
        $(field.id).toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $(field.id).toast('hide')
        return 1;
    }
  }

  dateEditHistory() {
    const field = this.date.nativeElement;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var inputDate = field.value.split("-");

    if (inputDate[0] < yyyy) {
        $(field.id).toast('hide');
        field.style.borderColor = "#ced4da";
        return 1;
    } else if (inputDate[0] == yyyy) {
        if (inputDate[1] < mm) {
            $(field.id).toast('hide');
            field.style.borderColor = "#ced4da";
            return 1;
        } else if (inputDate[1] == mm) {
            /* 
            ? IF DAY IS >= NOW */
            if (inputDate[2] <= dd) {
                $(field.id).toast('hide');
                field.style.borderColor = "#ced4da";
                return 1;
            } else {
                $(field.id).toast('show');
                field.style.setProperty("border-color", "red", "important");
                return 0;
            }
        } else {
            $(field.id).toast('show');
            field.style.setProperty("border-color", "red", "important");
            return 0;
        }
    } else {
        $(field.id).toast('show');
        field.style.setProperty("border-color", "red", "important");
        return 0;
    }
  }

  parseDate(date): Array<string> {
    let array = date.split('-');
    return array
  }

  buttonEditHistory(): void {
    var name = this.nameEditHistory();
    var amount = this.amountEditHistory();
    var date = this.dateEditHistory();
    if (amount == 0 || name == 0 || date == 0) {
      
      //DO NOTHING
    } else {
      this.renderer.setAttribute(document.getElementById("buttonEditExpense"), 'data-dismiss', 'modal');
      this.editExpense()
      this.renderer.removeAttribute(document.getElementById("buttonEditExpense"), 'data-dismiss', 'modal');
    }
  }
}
