import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { faMinusSquare, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { DOCUMENT } from '@angular/common'
import { ApiService } from '../../services/api.service';
import { Envelope } from '../../classes/envelope';

@Component({
  selector: 'app-envelopes-progress',
  templateUrl: './envelopes-progress.component.html',
  styleUrls: ['./envelopes-progress.component.css']
})
export class EnvelopesProgressComponent implements OnInit {

  @Input()
  envelope: Envelope;

  @Input()
  month: string;

  @Input()
  currency: string;


  faMinusSquare = faMinusSquare;
  faPencilAlt = faPencilAlt

  constructor(
    private api: ApiService,
    @Inject(DOCUMENT) private document: HTMLDocument
  ) { }

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
    console.log(this.envelope);
  }

  deleteEnvelope() {
    
    let name = this.envelope.category['name'];
    let decision = confirm("Are you sure you want to delete envelope " + name);

    if (decision == true) {

      this.api.deleteEnvelope(
        this.envelope._id
      ).then(result => { }).catch(error => console.log(error));

      try {

        var element = this.document.getElementById(this.envelope._id);
        element.remove();

      }
      catch {}
    }
  }
}
