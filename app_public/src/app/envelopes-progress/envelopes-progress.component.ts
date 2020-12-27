import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faMinusSquare, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';

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

  constructor(private api: ApiService) { }

  isLow(value: Number): Boolean {
    return value < 85;
  }

  isMedium(value: Number): Boolean {
    return value >= 85 && value < 100;
  }

  isHigh(value: Number): Boolean {
    return value >= 100;
  }

  ngOnInit(): void {
  }

  deleteEnvelope() {
    let name = this.envelope.category.name;
    let decision = confirm("Are you sure you want to delete envelope " + name);
    if (decision == true) {
      console.log(this.envelope._id)
      this.api.deleteEnvelope(
        this.envelope._id
      ).then(result => { }).catch(error => console.log(error));
    }
  }
}
