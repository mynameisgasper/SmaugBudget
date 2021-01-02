import { Component, OnInit, Input } from '@angular/core';
import { faMinusSquare, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FriendGroup } from '../../classes/friendGroup'
import { ApiService } from '../../services/api.service';
import { ConnectionService } from '../../services/connection.service';
import { UtilitiesComponent } from '../utilities/utilities.component'

@Component({
  selector: 'tr [app-table-row]',
  templateUrl: './utility-table-element.component.html',
  styleUrls: ['./utility-table-element.component.css']
})
export class UtilityTableElementComponent implements OnInit {

  faMinusSquare = faMinusSquare;
  faPencilAlt = faPencilAlt
  hasDeleteGroupMessage: boolean = false;
    DeleteGroupMessage: string = "";

  constructor(
    private api: ApiService,
    private UtilitiesComponent: UtilitiesComponent,
    private connectionService: ConnectionService
  ) { }

  public hasConnection(): boolean {
    return this.connectionService.hasConnection;
  }

  @Input()
    group: FriendGroup;

  ngOnInit(): void {
  }

  buttonDeleteGroup(){
      if (!this.group.id) {
        //DO NOTHING
    } else {
      this.deleteGroup();
    }
  }

  deleteGroup(){
    let decision = confirm("Are you sure you want to delete group " + this.group.Group + "?");
    if (decision == true) {
      this.hasDeleteGroupMessage = true;
      this.DeleteGroupMessage = "Deleting group";

      this.api.deleteGroup(this.group.id).then((response) => {
        this.UtilitiesComponent.afterDelete(this.group.id);
        this.hasDeleteGroupMessage = false;
      }).catch((error) => {
        this.DeleteGroupMessage = "Failed to delete group!";
      });
    }
  }

}
