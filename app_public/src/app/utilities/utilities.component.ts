import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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

  ngOnInit(): void {
  }

  converter(currency1: string, currency2: string, value: number): void {
    this.api.converter(currency1, currency2, value, (rez) =>{

        this.output.nativeElement.value = rez.value
    });
    
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
