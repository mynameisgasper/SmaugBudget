import { Component, OnInit, ElementRef, ViewChild, Renderer2} from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { FriendGroup } from '../../classes/friendGroup'
import { Friend } from '../../classes/friend'
import { AuthenticationService } from '../../services/authentication.service';
declare var $:any;

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.css']
})
export class UtilitiesComponent implements OnInit {

    public data: any;
    groups: FriendGroup[];
    userId: string;

    faPlusSquare = faPlusSquare;
    resultValue: number;

    groupMembers: Array<Object> = [{value: 1}]

    hasConverterMessage: boolean = false;
    converterMessage: string = "";

    hasCreateGroupMessage: boolean = false;
    createGroupMessage: string = "";

    constructor(
        private api: ApiService,
        private pit: ActivatedRoute,
        private renderer: Renderer2,
        private router: Router, 
        private authentication: AuthenticationService
    ) {}

    @ViewChild('groupName') groupName: ElementRef;
    @ViewChild('memberName') memberName: ElementRef;
    @ViewChild('counter') counter1: ElementRef;

    ngOnInit(): void {
        this.api.getUser().then(result => {
            console.log(result);
            this.data = {
                "utility":true,
                "fileName":"utilities",
                "message":"Welcome to Utilites!",
                "welcomeMessage":"Here you can find some useful gadgets.",
                "logout":"Logout",
                "DASHBOARD":"DASHBOARD",
                "ENVELOPES":"ENVELOPES",
                "GOALS":"GOALS",
                "BILLS":"BILLS",
                "HISTORY":"HISTORY",
                "UTILITIES":"UTILITIES",
                "user":"User",
                "settings":"Settings",
                "appearance":"Appearance",
                "light":"Light",
                "dark":"Dark"
            }
            this.userId = result._id;
            this.groups = this.generateGroups(result.friendgroups);
        }).catch(error => {
            this.authentication.logout();
            this.router.navigate(['']);
        });
    }

    generateGroups(groups){
        var groupsArray = [];
    
        for(var group of groups){
            var memberArray = [];
            var members = group.friends;
            memberArray = this.insertMe(memberArray,group.balance);
            var nextToPay = 'Me';
            var min = group.balance;
            for(var member of members){
                if(member.balance < min){
                    nextToPay = member.name;
                    min = member.balance;
                }
                var newFriend: Friend = {
                    id: member._id, 
                    name: member.name, 
                    amount: member.balance
                };
                memberArray.push(newFriend);
            }
            var newGroup: FriendGroup = {
                id: group._id, 
                Group: group.name, 
                Next: nextToPay, 
                Balance: group.balance,
                groupMember: memberArray
            };
            groupsArray.push(newGroup)
        }
        return groupsArray;
    }

    insertMe(memberArray, myBalance){
        var me: Friend = {
            id: this.userId, 
            name: 'Me', 
            amount: myBalance
        }
        memberArray.push(me);

        return memberArray;
    }

    converter(currency1: string, currency2: string, value: number): void {
        this.api.converter(currency1, currency2, value).then(result => {
            this.hasConverterMessage = false;
            this.resultValue = result.value;
        }).catch(error => {
            this.hasConverterMessage = true;
            this.converterMessage = "Error converting currencies!";
        });
    }

    addGroupUtilities(): number{
        const field = this.groupName.nativeElement;
        var regex = new RegExp("^[ A-Za-z0-9_@./#&+-: ]{1,16}$");
        if (!field.value.match(regex)) {
            field.style.setProperty("border-color", "red", "important");
            $('.tt5').toast('show');
            return 0;
        } else {
            field.style.borderColor = "#ced4da";
            $('.tt5').toast('hide');
            return 1;
        }
    }

    addGroupUtilities2(): number{
        const field = this.memberName.nativeElement;
        var regex = new RegExp("^[ A-Za-z0-9_@./#&+-: ]{1,16}$");
        if (!field.value.match(regex)) {
            field.style.setProperty("border-color", "red", "important");
            $('.tt5').toast('show');
            return 0;
        } else {
            field.style.borderColor = "#ced4da";
            $('.tt5').toast('hide');
            return 1;
        }
    }

    counter = 1;

    buttonAddGroupUtilities() {
        var groupName = this.groupName.nativeElement;
        if(groupName == 0)
            return false;

        var check = true;
        for(var i = 1; i < this.counter; i++){
            var testName = this.memberName.nativeElement;
            if(testName == 0){
                $('.tt6').toast('show');
                check = false
                return false;
            }
            $('.tt6').toast('hide');
        }
        return check;
    }


    addGroupMember(groupName: string) {
        if (this.counter >= 10) {
            alert("Only 10 members allowed");
        } else {
            this.counter++;
            this.groupMembers.push({value: this.counter});
        }
    }

    createGroup(f: NgForm) {
        const values = f.form.value;
        var groupName: String;
        var friends: Array<String> = [];

        for (const [key, value] of Object.entries(values)) {
            if (key === 'inputGroupName') {
                groupName = values[key];
            }
            else {
                friends.push(values[key])
            }
        }

        this.hasCreateGroupMessage = true;
        this.createGroupMessage = "Saving group";

        this.renderer.setAttribute(document.getElementById("addGroup"), 'data-dismiss', 'modal');
        this.api.addFriendGroup(groupName, friends).then(result => {
            this.hasCreateGroupMessage = false;
            this.afterAddFriedGroup(result);
        }).catch(error => {
            this.createGroupMessage = "Failed to save!";
        });
        this.renderer.removeAttribute(document.getElementById("addGroup"), 'data-dismiss', 'modal');
    }

    afterAddFriedGroup(friendGroup){
        var memberArray = [];
        var members = friendGroup.friends;
        memberArray = this.insertMe(memberArray, friendGroup.balance);
        var nextToPay = 'Me';
        var min = friendGroup.balance;
        for(var member of members){
            if(member.balance < min){
                nextToPay = member.name;
                min = member.balance;
            }
            var newFriend: Friend = {
                id: member._id, 
                name: member.name, 
                amount: member.balance
            };
            memberArray.push(newFriend);
        }
        var newGroup: FriendGroup = {
            id: friendGroup._id, 
            Group: friendGroup.name, 
            Next: nextToPay, 
            Balance: friendGroup.balance,
            groupMember: memberArray 
        }
        this.groups.push(newGroup);
    }

    afterDelete(friendGroupId){
        const index = this.groups.findIndex(groupObject => groupObject.id === friendGroupId)
        if (index > -1) {
            this.groups.splice(index, 1);
        }
    }
}
