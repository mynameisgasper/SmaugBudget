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
    "fileName":"",
    "message":" to Envelopes!",
    "welcomeMessage":"",
    "logout":"",
    "year":0,
    "month":0,
    "day":0,
    "DASHBOARD":"",
    "ENVELOPES":"",
    "GOALS":"",
    "BILLS":"",
    "HISTORY":"",
    "UTILITIES":"",
    "user":"",
    "settings":"",
    "appearance":"",
    "light":"",
    "dark":"",
    "setMonthNumber": 0,
    "setMonth": "",
    "currentMonth": "",
    "currency":"",
  }
  @Input()
  envelope={
    bgColor: "",
    budget: 0,
    category: {_id: "", color: "", basic: true, name: ""},
    color: "",
    colorHex: "",
    month: "",
    progress: 0,
    spent: 0,
    _id: ""
  };

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

  deleteEnvelope() {
    console.log(this.envelope)
    /*let id = this.envelope;
    confirm("Are you sure you want to delete envelope " +name);
    console.log(id);*/
   /* this.api.deleteExpense(
      this.amountExpense.nativeElement.value,
      this.categoryExpense.nativeElement.value,
      this.nameExpense.nativeElement.value,
      this.dateExpense.nativeElement.value
      ).then(result => { }).catch(error => console.log(error));*/

  }

}
