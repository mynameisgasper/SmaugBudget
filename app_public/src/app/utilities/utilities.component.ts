import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.css']
})
export class UtilitiesComponent implements OnInit {

    public data: any;
    public groups: any;

    faPlusSquare = faPlusSquare;
    resultValue: number;

    groupMembers: Array<Object> = [{value: 1}]

    constructor(
        private api: ApiService,
        private pit: ActivatedRoute
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
            this.groups = this.generateGroups(result.friendgroups,result._id);
            console.log(this.groups);
        }).catch(error => console.log(error));
    }

    generateGroups(groups, myId){
        var groupsArray = [];
    
        for(var group of groups){
            var memberArray = [];
            var members = group.friends;
            memberArray = this.insertMe(memberArray, myId, group.balance);
            var nextToPay = 'Me';
            var min = group.balance;
            for(var member of members){
                if(member.balance < min){
                    nextToPay = member.name;
                    min = member.balance;
                }
                memberArray.push({
                    id: member._id,
                    name: member.name,
                    amount: member.balance
                })
            }
            groupsArray.push({
                id: group._id,
                Group: group.name,
                Next: nextToPay,
                Balance: group.balance,
                groupMember: memberArray
            })
        }
        return groupsArray;
    }


    insertMe(memberArray, myId, myBalance){
        memberArray.push({
            id: myId,
            name: 'Me',
            amount: myBalance
        });

        return memberArray;
    }

    converter(currency1: string, currency2: string, value: number): void {
        this.api.converter(currency1, currency2, value).then(result => {
            this.resultValue = result.value;
        }).catch(error => console.log(error));
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

        this.api.addFriendGroup(groupName, friends).then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
        });
    }
}
