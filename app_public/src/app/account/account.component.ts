import { Component, OnInit } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  data = {
      "HINT": "hint",
      "nameHint": "nameHint",
      "surnameHint": "surnameHint",
      "title": "title",
      "firstName": "firstName",
      "data_firstName": "data_firstName",
      "lastName": "lastName",
      "data_lastName": "data_lastName",
      "password": "password",
      "changePassword": "changePassword",
      "email": "email",
      "data_email": "data_email",
      "changeImage": "changeImage",
      "saveChanges": "saveChanges",
      "application": "application",
      "darkMode": "darkMode",
      "language": "language",
      "selLanguage": "selLanguage",
      "currency": "currency",
      "data_defCurrency": "data_defCurrency",
      "data_currency": [
          {
              "key": "key",
              "name": "name"
          }
      ],
      "categories": "categories",
      "data_categories": [
          {
              "id": "id",
              "name": "name",
              "hexColor": "#fcba03"
          }
      ],
      "passwordHint": "passwordHint",
      "passwordNoMatch": "passwordNoMatch",
      "oldPassword": "oldPassword",
      "newPassword": "newPassword",
      "confirmPassword": "confirmPassword",
      "close": "close",
      "changeProfilePicture": "changeProfilePicture",
      "dragAndDropOr": "dragAndDropOr"
  };

  changeCurrency(newDef: String) {

  }
  
}
