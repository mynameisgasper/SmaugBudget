import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  constructor() { }

  @Input()
    name: String

  @Input()
    hintBody: String 
  
  @Input()
    hintHeader: String

  ngOnInit(): void {
    console.log(this.name + " " + this.hintBody + " " + this.hintHeader);
  }

}
