import { Component, OnInit, Input } from '@angular/core';
import { faMinusSquare, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-envelopes-progress',
  templateUrl: './envelopes-progress.component.html',
  styleUrls: ['./envelopes-progress.component.css']
})
export class EnvelopesProgressComponent implements OnInit {

  @Input()
  data = {
    "currency": "EUR",
    "envelope": {}
  }

  faMinusSquare = faMinusSquare;
  faPencilAlt = faPencilAlt

  isLow(value: Number): Boolean {
    return value < 85;
  }

  isMedium(value: Number): Boolean {
    return value >= 85 && value < 100;
  }

  isHigh(value: Number): Boolean {
    return value >= 100;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
