import { Component, OnInit, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { UtilitiesMemberRowComponent } from '../utilities-member-row/utilities-member-row.component'
declare var $:any;

@Component({
  selector: 'app-utilities-edit-modal',
  templateUrl: './utilities-edit-modal.component.html',
  styleUrls: ['./utilities-edit-modal.component.css']
})
export class UtilitiesEditModalComponent implements OnInit {

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

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
    ){ }

    @ViewChild(UtilitiesMemberRowComponent) memberRow;

  ngOnInit(): void {
  }

  disableButtonMember(): void {
    this.memberRow.disableButtonMember();
  }
}
