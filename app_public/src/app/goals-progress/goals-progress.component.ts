import { Component, OnInit, Input } from '@angular/core';
import { faMinusSquare, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-goals-progress-bar',
  templateUrl: './goals-progress.component.html',
  styleUrls: ['./goals-progress.component.css']
})
export class GoalsProgressComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  faMinusSquare = faMinusSquare;
  faPencilAlt = faPencilAlt

  @Input()
  data:any

}
