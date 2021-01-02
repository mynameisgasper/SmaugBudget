import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { faMinusSquare, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { DOCUMENT } from '@angular/common'
import { ApiService } from '../../services/api.service';
import { Envelope } from '../../classes/envelope';
import { ConnectionService } from '../../services/connection.service';

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

  hasDeleteMessage: boolean = false;
  deleteMessage: string = ""

  constructor(
    private api: ApiService,
    private connectionService: ConnectionService,
    @Inject(DOCUMENT) private document: HTMLDocument
  ) { }

  public hasConnection(): boolean {
    return this.connectionService.hasConnection;
  }

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
    
    let name = this.envelope.category['name'];
    let decision = confirm("Are you sure you want to delete envelope " + name);

    if (decision == true) {
      this.hasDeleteMessage = true;
      this.deleteMessage = "Deleting envelope";

      this.api.deleteEnvelope(
        this.envelope._id
      ).then(result => {
        var element = this.document.getElementById(this.envelope._id);
        element.remove();
      }).catch(error => {
        this.deleteMessage = "Failed deleting envelope!";
      });
    }
  }
}
