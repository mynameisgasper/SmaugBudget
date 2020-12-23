import { Component, OnInit, Input } from '@angular/core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tr [history-table-row]',
  templateUrl: './history-table-element.component.html',
  styleUrls: ['./history-table-element.component.css']
})
export class HistoryTableElementComponent implements OnInit {

  faPencilAlt = faPencilAlt

  @Input()
  Expense = {
    "id":"",
    "year":"",
    "month":"",
    "monthName":"",
    "day":"",
    "category":"",
    "recipient":"",
    "value":0,
    "currency":"",
    "color":""
  }

  @Input()
  Currency: string

  @Input()
  Categories =   {
    "color":"",
    "basic":true,
    "_id":"",
    "name":""
  }

  constructor() { }

  ngOnInit(): void {
  }

}
