import { Component, OnInit, Input, ElementRef, ViewChild, Renderer2} from '@angular/core';
import { faMinusSquare, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Goal } from '../../classes/goal';
import { ApiService } from '../../services/api.service';
import { GoalsComponent } from '../goals/goals.component';
import { Category } from '../../classes/category';
declare var $:any;

@Component({
  selector: 'app-goals-progress-bar',
  templateUrl: './goals-progress.component.html',
  styleUrls: ['./goals-progress.component.css']
})
export class GoalsProgressComponent implements OnInit {

  constructor(
    private api: ApiService,
    private goalsComponent: GoalsComponent,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
  }

  faMinusSquare = faMinusSquare;
  faPencilAlt = faPencilAlt

 
  @Input()
    item:Goal

  @Input()
    currency:any 
  
  @Input()
    category: Category []
  
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

  buttonEditGoal(nameValue: string, categoryValue: string, amountValue: number, dateValue: Date): void {
    var name = this.nameEditGoal();
    var amount = this.amountEditGoal();
    var date = this.dateCheckEdit();
    
    if (name == 0 || amount == 0 || date == 0 ) {
        //DO NOTHING
    } else {
      this.renderer.setAttribute(document.getElementById("buttonEditGoal"+ this.item._id), 'data-dismiss', 'modal');
      this.editGoal(nameValue, categoryValue, amountValue, dateValue);
      this.renderer.removeAttribute(document.getElementById("buttonEditGoal" + this.item._id), 'data-dismiss', 'modal');
    }
  }

  editGoal(name, category, amount, date){
    this.api.editGoal(this.item._id, name, category, amount, date).then((response) => {
      this.goalsComponent.afterEdit(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  buttonDeleteGoal(): void {
    if (!this.item._id) {
        //DO NOTHING
    } else {
       this.deleteGoal();
    }
  }

  deleteGoal(){
    this.api.deleteGoal(this.item._id).then((response) => {
      this.goalsComponent.afterDelete(this.item._id)
    }).catch((error) => {
      console.log(error);
    });
  }
}
