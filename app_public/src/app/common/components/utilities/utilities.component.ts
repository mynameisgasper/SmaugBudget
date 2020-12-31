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

declare var getTranslation: any;
declare var setLanguage: any;

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.css']
})
export class UtilitiesComponent implements OnInit {

    public data: any = {};
    groups: FriendGroup[];
    userId: string;

    faPlusSquare = faPlusSquare;
    resultValue: number;

    groupMembers: Array<Object> = [{value: 1}]

    utilGroups = getTranslation("utilGroups");
	utilCreate = getTranslation("utilCreate");
	utilName = getTranslation("utilName");
	utilNext = getTranslation("utilNext");
	utilBalance = getTranslation("utilBalance");
	utilConverter = getTranslation("utilConverter");
	utilFrom = getTranslation("utilFrom");
	utilTo = getTranslation("utilTo");
	utilConvert = getTranslation("utilConvert");
	utilInputName = getTranslation("utilInputName");
	utilAddMem = getTranslation("utilAddMem");
    utilAddGroup = getTranslation("utilAddGroup");
    HINT = getTranslation("HINT");
    envelopestt2 = getTranslation("envelopestt2");

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
    @ViewChild('addGroupModal') addGroupModal: ElementRef;

    ngOnInit(): void {
        this.api.getUser().then(result => {
            console.log(result);
            this.refreshLanguage(result.language);
            this.data = {
                "utility":true,
                "fileName":"utilities",
                "message": getTranslation("messageUtilities"),
                "welcomeMessage": getTranslation("welcomeMessageUtilities"),
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
            this.router.navigate(['/']);
        });
    }

    refreshLanguage(language: string) {
        setLanguage(language);
            
        this.utilGroups = getTranslation("utilGroups");
        this.utilCreate = getTranslation("utilCreate");
        this.utilName = getTranslation("utilName");
        this.utilNext = getTranslation("utilNext");
        this.utilBalance = getTranslation("utilBalance");
        this.utilConverter = getTranslation("utilConverter");
        this.utilFrom = getTranslation("utilFrom");
        this.utilTo = getTranslation("utilTo");
        this.utilConvert = getTranslation("utilConvert");
        this.utilInputName = getTranslation("utilInputName");
        this.utilAddMem = getTranslation("utilAddMem");
        this.utilAddGroup = getTranslation("utilAddGroup");
        this.HINT = getTranslation("HINT");
        this.envelopestt2 = getTranslation("envelopestt2");
      }

    generateGroups(groups){
        var groupsArray = [];
    
        for(var group of groups){
            var memberArray = [];
            var members = group.friends;
            //memberArray = this.insertMe(memberArray,group.balance);
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
            //$('.tt5').toast('show');
            return 0;
        } else {
            field.style.borderColor = "#ced4da";
            //$('.tt5').toast('hide');
            return 1;
        }
    }

    checkMemberName(name, index){
        const field = document.getElementById("inputMember" + index);
        var regex = new RegExp("^[ A-Za-z0-9_@./#&+-: ]{1,16}$");
        if (!name.match(regex)) {
            field.style.setProperty("border-color", "red", "important");
            //$('.tt5').toast('show');
            return 0;
        } else {
            field.style.borderColor = "#ced4da";
            //$('.tt5').toast('hide');
            return 1;
        }
    }

    counter = 1;

    buttonAddGroupUtilities(groupName, friends, fake) {
        var groupNameCheck = this.addGroupUtilities(); 

        var index = 1;
        var memberNameOverall = 1;
        for(var friend of friends){
            var memberNameCheck = this.checkMemberName(friend, index)
            if(memberNameCheck == 0)
                memberNameOverall = 0;
            index++;
        }
        console.log(groupNameCheck + " " + memberNameOverall)
        if(groupNameCheck == 0 || memberNameOverall == 0  || fake == 1){
            if(groupNameCheck == 0 || memberNameOverall == 0)
                $('.tt5').toast('show');
            else
                $('.tt5').toast('hide');
        }
        else{
            $('.tt5').toast('hide');
            this.addFriendGroup(groupName, friends);
        }
    }


    addGroupMember(groupName: string) {
        if (this.counter >= 10) {
            alert("Only 10 members allowed");
        } else {
            this.counter++;
            this.groupMembers.push({value: this.counter});
        }
    }

    createGroup(f: NgForm, fake) {
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

        this.buttonAddGroupUtilities(groupName, friends, fake);
    }

    addFriendGroup(groupName, friends){
        this.hasCreateGroupMessage = true;
        this.createGroupMessage = "Saving group";

        this.api.addFriendGroup(groupName, friends).then(result => {
            this.addGroupModal.nativeElement.click();
            this.hasCreateGroupMessage = false;
            this.afterAddFriedGroup(result);
        }).catch(error => {
            this.createGroupMessage = "Failed to save!";
        });
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

    afterCalculatingBalances(group){
        var groupObject = this.groups.find(groupObject => groupObject.id === group._id)
        groupObject.Balance = group.balance;
        var min = group.balance;
        var next = 'Me';
        for(var memberMongo of group.friends){
            for(var memberClass of groupObject.groupMember){
                if(memberMongo.name == memberClass.name){
                    memberClass.amount = memberMongo.balance;
                }
            }
            console.log("a" + memberMongo.amount + " " + min);
            if(memberMongo.balance < min){
                console.log(memberMongo.ba + " " + min);
                min = memberMongo.amount;
                next = memberMongo.name;
            }
        }
        console.log(next);
        groupObject.Next = next;
        console.log(groupObject);
    }
}
