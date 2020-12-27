import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { faPlusSquare, faTrashAlt, faCamera, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../api.service';

declare var getTranslation: any;
declare var setLanguage: any;
declare var getLanguage: any;
declare var getValueById: any;
declare var setValueById: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    yourHeadersConfig: HttpHeaders | { [header: string]: string | string[]; };
    httpClient: HttpClient;
    firstName: any;
    lastName: any;
    email: any;
    defaultCurrency: any;
    defaultLanguage: any;
    categories: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getUser().then(result => {
        this.firstName = result.firstname;
        this.lastName = result.lastname;
        this.email = result.email;
        this.defaultCurrency = result.defaultCurrency;
        this.defaultLanguage = result.language;
        this.categories = result.categories;
      }).catch(error => console.log(error));
  }
  
  hasUrl = false;

  faTrashAlt = faTrashAlt;
  faCamera = faCamera;
  faPencilAlt = faPencilAlt;

  data = {
      "HINT": getTranslation("HINT"),
      "nameHint": getTranslation("nameHint"),
      "surnameHint": getTranslation("surnameHint"),
      "title": getTranslation("account_title"),
      "firstName": getTranslation("firstName"),
      "data_firstName": "data_firstName",
      "lastName": getTranslation("lastName"),
      "data_lastName": "data_lastName",
      "password": getTranslation("password"),
      "changePassword": getTranslation("changePassword"),
      "email": getTranslation("email"),
      "data_email": "data_email",
      "changeImage": getTranslation("changeImage"),
      "saveChanges": getTranslation("saveChanges"),
      "application": getTranslation("application"),
      "darkMode": getTranslation("darkMode"),
      "language": getTranslation("language"),
      "selLanguage": "selLanguage",
      "currency": getTranslation("currency"),
      "data_defCurrency": "data_defCurrency",
      "data_currency": [
          {
              "key": "key",
              "name": "name"
          }
      ],
      "categories": getTranslation("categories"),
      "data_categories": [
          {
              "id": "id",
              "name": "name",
              "hexColor": "#fcba03"
          }
      ],
      "passwordHint": getTranslation("passwordHint"),
      "passwordNoMatch": getTranslation("passwordNoMatch"),
      "oldPassword": getTranslation("oldPassword"),
      "newPassword": getTranslation("newPassword"),
      "confirmPassword": getTranslation("confirmPassword"),
      "close": getTranslation("close"),
      "changeProfilePicture": getTranslation("changeImage"),
      "dragAndDropOr": getTranslation("dragAndDropOr")
  };

  changeLanguage(language: string) {
    //$("#languageChange")[0].innerText = language;
    var xhr  = new XMLHttpRequest();                       

    xhr.onload = function() {
        console.log(this.responseText); 
        location.reload();
    }

    xhr.open("POST", "/account");      // open connection
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("formType=changeLanguage&language="+language);                     // send data
}

changeCurrency(curr: string) {
    //$("#currencyChange")[0].innerText = curr;
    var xhr  = new XMLHttpRequest();                       

    xhr.onload = function() {
        console.log(this.responseText); 
    }

    xhr.open("POST", "/account");      // open connection
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("formType=changeCurrency&currency="+curr);                     // send data
}

updateUserInfo() {
    var forms = document.forms["userInfo"];
    console.log(forms);
    //this.disableButton();
}

fileToUpload: File = null;

readURL(input: FileList) {
    this.fileToUpload = input.item(0);
    if (this.fileToUpload) {
        this.hasUrl = true;
    } else {
        this.hasUrl = false;
    }
}

uploadFileToActivity() {
    this.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      }, error => {
        console.log(error);
      });
  }

postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData, { headers: this.yourHeadersConfig })
      .pipe(map(() => { return true; }));
}

/*
disableButton() {
    var button = document.getElementById("userInfoButton");
    var name = this.nameRegex();
    var surname = this.surnameRegex();

    if (button || name == 0 || surname == 0) {
        return false;
    } else {

        return true;
    }
}

nameRegex() {

    var username = document.getElementById("nameInput");
    var regex = new RegExp("^([a-zA-Z])+$");
    if (!getValueById("nameInput").match(regex)) {
        username.style.setProperty("border-color", "red", "important");
        $('.tt1').toast('show');
        return 0;
    } else {
        username.style.borderColor = "#ced4da";
        $('.tt1').toast('hide');
        return 1;
    }
}

surnameRegex() {
    var username = document.getElementById("lastnameInput");
    var regex = new RegExp("^([a-zA-Z])+$");
    if (!getValueById("lastnameInput").match(regex)) {
        username.style.setProperty("border-color", "red", "important");
        $('.tt2').toast('show')
        return 0;
    } else {
        username.style.borderColor = "#ced4da";
        $('.tt3').toast('hide')
        return 1;
    }
}

ConNameRegex(element) {

    var regex = new RegExp("^([a-zA-Z0-9 ]){1,20}$");
    if (!element.value.match(regex)) {
        element.style.setProperty("border-color", "red", "important");
        $('.tt5').toast('show');
        return 0;
    } else {
        element.style.borderColor = "#ced4da";
        $('.tt5').toast('hide');
        return 1;
    }
}

disableButton2(button) {
    var form = button.parentNode.parentNode;
    var name = ConNameRegex(button.parentNode.parentNode.getElementsByClassName("connectionName")[0]);

    if (name == 0) {
        return false;
    } else {
        var inputs = form.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].removeAttribute("disabled");
        }
        
        return true;
    }
}

passwordStrength(element) {
    //var button = document.getElementById("buttonup");
    //var email1 = document.getElementById(email1up);
    //var email2 = document.getElementById(email2up);

    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    /* STRONG Passwords must be 
     * - At least 8 characters long, max length anything
     * - Include at least 1 lowercase letter
     * - 1 capital letter
     * - 1 number
     * - 1 special character => !@#$%^&**/

    /* MEDIUM Passwords must be 
     * - At least 6 characters long, max length anything
     * - Include at least 1 lowercase letter AND 1 capital letter
     *  OR
     * - Include at least 1 lowercase letter AND 1 numeric character
     *  OR
     * - Include at least 1 uppercase letter AND 1 numeric character*/
    /*
    var pass = element;
    if (pass.value.match(strongRegex)) {
        pass.style.setProperty("border-color", "green", "important");
        $('.tt3').toast('hide')
        return 1;
    } else if (pass.value.match(mediumRegex)) {

        pass.style.setProperty("border-color", "orange", "important");
        $('.tt3').toast('hide')
        return 1;
    } else {
        pass.style.setProperty("border-color", "red", "important");
        $('.tt3').toast('show')
        return 0;
    }
}

passwordCheckSignUp() {
    var pass1 = document.getElementById("newPassword");
    var pass2 = document.getElementById("confirmPassword");
    if (getValueById("newPassword") != getValueById("confirmPassword")) {
        pass1.style.setProperty("border-color", "red", "important");
        pass2.style.setProperty("border-color", "red", "important");
        $('.tt4').toast('show')
        return 0;
    } else {
        pass1.style.borderColor = "#ced4da";
        pass2.style.borderColor = "#ced4da";
        $('.tt4').toast('hide')
        return 1;
    }
}

passwordSubmit(obj) {
    var password1 = document.getElementById('oldPassword');
    var hashOne1 = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
    hashOne1.update(getValueById('oldPassword'));
    setValueById('oldPasswordHash', hashOne1.getHash("HEX"));

    var password2 = document.getElementById('newPassword');
    var hashOne2 = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
    hashOne2.update(getValueById('newPassword'));
    setValueById('newPasswordHash1', hashOne2.getHash("HEX"));

    var password3 = document.getElementById('confirmPassword');
    var hashOne3 = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
    hashOne3.update(getValueById('confirmPassword'));
    setValueById('newPasswordHash2', hashOne3.getHash("HEX"));
}
  */
}
