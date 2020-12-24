import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
declare var $:any;

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.css']
})
export class UtilitiesComponent implements OnInit {

  faPlusSquare = faPlusSquare;
  
  @ViewChild('output123') output: ElementRef;

  constructor(
    private api: ApiService,
    private pit: ActivatedRoute
    ) {}

  @ViewChild('groupName') groupName: ElementRef;
  @ViewChild('memberName') memberName: ElementRef;
  @ViewChild('counter') counter1: ElementRef;

  ngOnInit(): void {
  }

  converter(currency1: string, currency2: string, value: number): void {
    this.api.converter(currency1, currency2, value, (rez) =>{

        this.output.nativeElement.value = rez.value
    });
    
  }

  addGroupUtilities(): number{
    const field = this.groupName.nativeElement;
    var regex = new RegExp("^[ A-Za-z0-9_@./#&+-: ]{1,16}$");
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt5').toast('show');
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt5').toast('hide');
        return 1;
    }
  }

  addGroupUtilities2(): number{
    const field = this.memberName.nativeElement;
    var regex = new RegExp("^[ A-Za-z0-9_@./#&+-: ]{1,16}$");
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt5').toast('show');
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt5').toast('hide');
        return 1;
    }
  }

  counter = 1;

  buttonAddGroupUtilities() {
    var groupName = this.groupName.nativeElement;
    if(groupName == 0)
        return false;

    var check = true;
    for(var i = 1; i < this.counter; i++){
        var testName = this.memberName.nativeElement;
        if(testName == 0){
            $('.tt6').toast('show');
            check = false
            return false;
        }
        $('.tt6').toast('hide');
    }
    return check;
  }


  addGroupMember() {
    if (this.counter >= 10) {
        alert("Only 10 members allowed");
    } else {
        this.counter++;
        var form = document.getElementById('inputMemberBody');
        var input = '<input type="text" onfocusout="checkName(this)" style="margin-top:4%" class="form-control" id="inputMember' + this.counter + '" placeholder="Member ' + this.counter + ' " name="inputMember' + this.counter + '"></input>';
        form.innerHTML = form.innerHTML + input;
        this.counter1.nativeElement.value = this.counter;
    }
  }

  data = {
    "utility":true,
    "fileName":"utilities",
    "message":"Welcome to Utilites!",
    "welcomeMessage":"Here you can find some useful gadgets.",
    "logout":"Logout",
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
    "Friend":[{
        "id":"5fc600b4507a6800112af245",
        "Group":"FRI",
        "Next":"Gasper",
        "Balance":-2.5,
        "groupMember":[{
            "id":"5fc600b4507a6800112af56e",
            "name":"Me",
            "amount":-2.5
        },{
            "id":"5fc41a53856f8e02780b4b30",
            "name":"Luka",
            "amount":5.5
        },{
            "id":"5fc41a53856f8e02780b4b32",
            "name":"Miha","amount":-1.5
        },{
            "id":"5fc41a53856f8e02780b4b34",
            "name":"Gasper",
            "amount":-4.5
        },{
            "id":"5fc41a53856f8e02780b4b36",
            "name":"Tim",
            "amount":3
        }],
    }]
}

}
