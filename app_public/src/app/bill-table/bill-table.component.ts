import { Component, OnInit, Input } from '@angular/core';
import { faMinusSquare, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tr [app-bill-table]',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.css']
})
export class BillTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  faMinusSquare = faMinusSquare;
  faPencilAlt = faPencilAlt

  @Input()
  data = {
    "_id": "",
    "year": "",
    "month": "",
    "monthName": "",
    "day": "",
    "category": "",
    "recipient": "",
    "value": 0,
    "currency": "",
    "repeat": ""
  }

  @Input()
  Currency: string

  @Input()
  Categories = {
    "color": "",
    "basic": true,
    "_id": "",
    "name": ""
  }

  
  

}
