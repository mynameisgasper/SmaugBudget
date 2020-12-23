import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-envelopes-edit-modal',
  templateUrl: './envelopes-edit-modal.component.html',
  styleUrls: ['./envelopes-edit-modal.component.css']
})
export class EnvelopesEditModalComponent implements OnInit {

  @Input()
  Envelope = {
    "_id":"",
    "progress":0,
    "budget":0,
    "spent":0,
    "colorHex":"",
    "color":"",
    "bgColor":"",
    "month":"",
    "category":{
      "_id":"",
      "color":"",
      "basic":true,
      "name":"",
      "__v":0
    }
  }

  @Input()
  Currency: string

  constructor() { }

  ngOnInit(): void {
  }

}
