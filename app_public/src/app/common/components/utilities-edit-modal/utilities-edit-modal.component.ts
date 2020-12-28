import { Component, OnInit, Input, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FriendGroup } from '../../classes/friendGroup'
import { NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { UtilitiesComponent } from '../utilities/utilities.component'
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
  
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private api: ApiService,
    private UtilitiesComponent: UtilitiesComponent
    ){ }

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

  priceFieldCheckMembers(memberId, value): number {
    const field = document.getElementById(".price" + memberId);
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
    //črkev male,velike,številke
    if (!regex.test(value)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt1').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt1').toast('hide')
        return 1;
    }
  }

  paidFieldCheckMembers(memberId, value): number {
    const field = document.getElementById(".paid" + memberId);
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
    //črkev male,velike,številke
    if (!regex.test(value)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt1').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt1').toast('hide')
        return 1;
    }
  }

  disableButtonMember(pricePaidArray): void {
    var price = this.valueGroupsUtilities();
    var paid = this.valueGroupsUtilities2();
    
    var index = 1;
    for(var member of this.group.groupMember){
      var memberId = member.id;
      price = this.priceFieldCheckMembers(memberId, pricePaidArray[index][0]);
      paid = this.paidFieldCheckMembers(memberId, pricePaidArray[index][1]);
      index++;
    }

    if (price == 0 || paid == 0 ) {
        //DO NOTHING
    } else {
      this.renderer.setAttribute(document.getElementById("sum" + this.group.id), 'data-dismiss', 'modal');
      this.calculateBalances(pricePaidArray)
      this.renderer.removeAttribute(document.getElementById("sum" + this.group.id), 'data-dismiss', 'modal');
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

    this.disableButtonMember(pricePaidArray);
  }

  calculateBalances(pricePaidArray){
    console.log(document.getElementById("sum" + this.group.id))
    
    this.api.calculateBalances(JSON.stringify(pricePaidArray), this.group.id).then((response) => {
      this.UtilitiesComponent.afterCalculatingBalances(response);
      
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
