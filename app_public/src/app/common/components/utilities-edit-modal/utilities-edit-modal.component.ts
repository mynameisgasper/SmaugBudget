import { Component, OnInit, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { UtilitiesMemberRowComponent } from '../utilities-member-row/utilities-member-row.component'
import { FriendGroup } from '../../classes/friendGroup'
import { NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
declare var $:any;

@Component({
  selector: 'app-utilities-edit-modal',
  templateUrl: './utilities-edit-modal.component.html',
  styleUrls: ['./utilities-edit-modal.component.css']
})
export class UtilitiesEditModalComponent implements OnInit {

  @Input()
    group: FriendGroup;

    pricePaidArray: number[][] = [];
    index: 0;

 /* Friend = {
    "id":"",
    "Group":"",
    "Next":"",
    "Balance":0,
    "groupMember":[{
        "id":"",
        "name":"",
        "amount":0
    }]
  }*/
  

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private api: ApiService,
    ){ }

    @ViewChild(UtilitiesMemberRowComponent) memberRow;

  ngOnInit(): void {
  }

  @ViewChild('price') price: ElementRef;
  @ViewChild('paid') paid: ElementRef;

  valueGroupsUtilities(): number {
    const field = this.price.nativeElement;
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
    //črkev male,velike,številke
    if (!regex.test(field.value)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt1').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt1').toast('hide')
        return 1;
    }
  }

  valueGroupsUtilities2(): number {
    const field = this.paid.nativeElement;
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
    //črkev male,velike,številke
    if (!regex.test(field.value)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt1').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt1').toast('hide')
        return 1;
    }
  }

  disableButtonMember(): void {
    var price = this.valueGroupsUtilities();
    var paid = this.valueGroupsUtilities2();

    if (price == 0 || paid == 0 ) {
        //DO NOTHING
    } else {
        //POST REQUEST - TO BE ADDED
    }
  }
  
  formCalculateBalances(f: NgForm) {
    const values = f.form.value;
    var pricePaidArray: number[][] = [];
    var kjeSm = 0;
    var index = 0;
    
    for (const [key, value] of Object.entries(values)) {
      index++;
    }

    for (var i=0; i< index/2; i++) {
      pricePaidArray[i]=[];
        for (var j=0; j<2; j++){
          pricePaidArray[i][j]=0;
        }
    }

    index = 0;
    for (const [key, value] of Object.entries(values)) {
      if(kjeSm % 2 == 0)
        pricePaidArray[index][0] = values[key];
      else{
        pricePaidArray[index][1] = values[key];
        index++;
      }
      kjeSm++;    
    }
    this.calculateBalances(pricePaidArray)
  }

  calculateBalances(pricePaidArray){
    this.api.calculateBalances(JSON.stringify(pricePaidArray), this.group.id).then((response) => {
      //this.renderer.setAttribute(document.getElementById("buttonAddGoal"), 'data-dismiss', 'modal');
      //this.afterAddGoal(response);
      //this.renderer.removeAttribute(document.getElementById("buttonAddGoal"), 'data-dismiss', 'modal');
      //this.hasGoalMessage = false;
    }).catch((error) => {
      //this.goalMessage = "Failed to save goal!";
    });
    /*this.hasGoalMessage = true;
    this.goalMessage = "Saving goal";

    this.api.addGoal(name, category, amount, date).then((response) => {
      this.renderer.setAttribute(document.getElementById("buttonAddGoal"), 'data-dismiss', 'modal');
      this.afterAddGoal(response);
      this.renderer.removeAttribute(document.getElementById("buttonAddGoal"), 'data-dismiss', 'modal');
      this.hasGoalMessage = false;
    }).catch((error) => {
      this.goalMessage = "Failed to save goal!";
    });*/
  }
}
