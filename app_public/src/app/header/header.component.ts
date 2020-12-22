import { Component, OnInit, Input } from '@angular/core';
import { faCog, faAdjust, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  component: string

  faCog = faCog;
  faAdjust = faAdjust;
  faSignOutAlt = faSignOutAlt;

  constructor() { }

  ngOnInit(): void {
  }

}
