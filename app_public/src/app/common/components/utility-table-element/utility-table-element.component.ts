import { Component, OnInit, Input } from '@angular/core';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tr [app-table-row]',
  templateUrl: './utility-table-element.component.html',
  styleUrls: ['./utility-table-element.component.css']
})
export class UtilityTableElementComponent implements OnInit {

  faMinusSquare = faMinusSquare;

  @Input()
  Friend = {
    "id":"",
    "Group":"",
    "Next":"",
    "Balance":0,
    "groupMember":[{
        "id":"",
        "name":"",
        "amount":0
    }]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
