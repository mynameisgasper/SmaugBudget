import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
