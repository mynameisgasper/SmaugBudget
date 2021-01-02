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
    
    hasEditGroupMessage: boolean = true;
    editGroupMessage: string = "";
  
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
  @ViewChild('showGroupModal') showGroupModal: ElementRef;
  



  valueGroupsUtilities(): number {
    const field = this.price.nativeElement;
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
    //črkev male,velike,številke
    if (!regex.test(field.value)) {
        field.style.setProperty("border-color", "red", "important");
        //$('.tt1' + this.group.id).toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        //$('.tt1' + this.group.id).toast('hide')
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
        //$('.tt1' + this.group.id).toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        //$('.tt1' + this.group.id).toast('hide')
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
        //$('.tt1' + this.group.id).toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        //$('.tt1' + this.group.id).toast('hide')
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
        //$('.tt1' + this.group.id).toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        //$('.tt1' + this.group.id).toast('hide')
        return 1;
    }
  }

  checkSumPricePaid(pricePaidArray){
    var priceSum = 0;
    var paidSum = 0;
    for(var i = 0; i < pricePaidArray.length; i++){
      priceSum =  priceSum + Number(pricePaidArray[i][0]);
      paidSum =  paidSum + Number(pricePaidArray[i][1]);
    }
    if(priceSum == paidSum){
      //$('.tt2' + this.group.id).toast('hide')
      return 1
    }
    else{
      //$('.tt2' + this.group.id).toast('show')
      return 0
    }
  }

  disableButtonMember(pricePaidArray, fake): void {
    var price = this.valueGroupsUtilities();
    var paid = this.valueGroupsUtilities2();
    var sum = this.checkSumPricePaid(pricePaidArray);
    
    var index = 1;
    var numbersOverall = 1;
    if(price == 0 || paid == 0)
      numbersOverall = 0;
    for(var member of this.group.groupMember){
      var memberId = member.id;
      price = this.priceFieldCheckMembers(memberId, pricePaidArray[index][0]);
      paid = this.paidFieldCheckMembers(memberId, pricePaidArray[index][1]);
      if(price == 0 || paid == 0)
        numbersOverall = 0;
      index++;
    }

    if (numbersOverall == 0 || sum == 0 || fake == 1) {
      if(numbersOverall == 0)
        $('.tt1' + this.group.id).toast('show')
      if(sum == 0)
        $('.tt2' + this.group.id).toast('show')

      if(numbersOverall == 1)
        $('.tt1' + this.group.id).toast('hide')
      if(sum == 1)
        $('.tt2' + this.group.id).toast('hide')

      
        //DO NOTHING
    } else {
      $('.tt2' + this.group.id).toast('hide')
      $('.tt1' + this.group.id).toast('hide')
      this.calculateBalances(pricePaidArray);
    }
  }
  
  formCalculateBalances(f: NgForm, fake) {
    const values = f.form.value;
    var pricePaidArray: Array<Array<number>> = [];
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

    this.disableButtonMember(pricePaidArray, fake);
  }

  calculateBalances(pricePaidArray){
    this.hasEditGroupMessage = true;
    this.editGroupMessage = "Calculating balances";
    
    this.api.calculateBalances(JSON.stringify(pricePaidArray), this.group.id).then((response) => {
      this.showGroupModal.nativeElement.click();
      this.UtilitiesComponent.afterCalculatingBalances(response);
      this.hasEditGroupMessage = false;
    }).catch((error) => {
      this.editGroupMessage = "Failed to calculate balances!";
    });
  }
}
