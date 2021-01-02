import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {

  constructor(private connectionService: ConnectionService) { }

  ngOnInit(): void {
  }

  public hasConnection(): boolean {
    return this.connectionService.hasConnection;
  }

}
