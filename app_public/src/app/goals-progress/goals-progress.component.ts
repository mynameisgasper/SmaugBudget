import { Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import { faMinusSquare, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
declare var $:any;

@Component({
  selector: 'app-goals-progress-bar',
  templateUrl: './goals-progress.component.html',
  styleUrls: ['./goals-progress.component.css']
})
export class GoalsProgressComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  faMinusSquare = faMinusSquare;
  faPencilAlt = faPencilAlt

  @Input()
    item:any

  @Input()
    currency:any 
  
  @Input()
    category:any  
  
  

  @ViewChild('editNameGoal') editNameGoal: ElementRef;
  @ViewChild('editAmountGoal') editAmountGoal: ElementRef;
  @ViewChild('editDateGoal') editDateGoal: ElementRef;
  
  nameEditGoal() {
    const field = this.editNameGoal.nativeElement;
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[ A-Za-z0-9_@./#&+-: ]{1,16}$");
    //uppercase, lowercase, številke, posebni znaki, dolžina od 1-16
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $(field.id).toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $(field.id).toast('hide')
        return 1;
    }
  }

  amountEditGoal() {
    const field = this.editAmountGoal.nativeElement;
    console.log(field);
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    if (!field.value.match(regex)) {
      console.log(1)
        field.style.setProperty("border-color", "red", "important");
        $(field.id).toast('show');
        return 0;
    } else {
      console.log(2)
        field.style.borderColor = "#ced4da";
        $(field.id).toast('hide');
        return 1;
    }
  }

  dateCheckEdit() {
    const field = this.editDateGoal.nativeElement;
    console.log(field.value);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var inputDate = field.value.split("-");
    console.log(field.value);

    if (inputDate == "") {
        $('.toastEditDate').toast('show');
        field.style.setProperty("border-color", "red", "important");
        return 0;
    }

    if (inputDate[0] > yyyy) {
        $(field.id).toast('hide');
        field.style.borderColor = "#ced4da";
        return 1;
    } else if (inputDate[0] == yyyy) {
        if (inputDate[1] > mm) {
            $(field.id).toast('hide');
            field.style.borderColor = "#ced4da";
            return 1;
        } else if (inputDate[1] == mm) {
            /* 
            ? IF DAY IS >= NOW */
            if (inputDate[2] >= dd) {
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

  buttonEditGoal(): void {
    var name = this.nameEditGoal();
    var amount = this.amountEditGoal();
    var date = this.dateCheckEdit();
    
    if (name == 0 || amount == 0 || date == 0 ) {
        //DO NOTHING
    } else {
        //POST REQUEST - TO BE ADDED
    }
  }

}
