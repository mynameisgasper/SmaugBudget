import { Component, OnInit, Input } from '@angular/core';
import { faMinusSquare, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FriendGroup } from '../../classes/friendGroup'
import { ApiService } from '../../services/api.service';
import { UtilitiesComponent } from '../utilities/utilities.component'

@Component({
  selector: 'tr [app-table-row]',
  templateUrl: './utility-table-element.component.html',
  styleUrls: ['./utility-table-element.component.css']
})
export class UtilityTableElementComponent implements OnInit {

  faMinusSquare = faMinusSquare;
  faPencilAlt = faPencilAlt

  constructor(
    private api: ApiService,
    private UtilitiesComponent: UtilitiesComponent
  ) { }

  @Input()
    group: FriendGroup;

  ngOnInit(): void {
    console.log(this.group);
  }

  buttonDeleteGroup(){
      if (!this.group.id) {
        //DO NOTHING
    } else {
      this.deleteGroup();
    }
  }

  deleteGroup(){
    console.log("asd")
    this.api.deleteGroup(this.group.id).then((response) => {
      this.UtilitiesComponent.afterDelete(this.group.id);
    }).catch((error) => {
      console.log(error);
    });
  }

}
