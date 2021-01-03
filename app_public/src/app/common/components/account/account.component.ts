import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, Renderer2, Inject, ViewChildren } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { faPlusSquare, faTrashAlt, faCamera, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ConnectionService } from '../../services/connection.service';
declare var $:any;

declare var getTranslation: any;
declare var setLanguage: any;
declare var getLanguage: any;
declare var getValueById: any;
declare var setValueById: any;
declare var getInnerTextById: any;
declare var setInnerTextById: any;
declare var rgbToHex: any;
declare var toggleDarkMode: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    firstName: any;
    lastName: any;
    email: any;
    defaultCurrency: any;
    defaultLanguage: any;
    categories: any;
    uID: any;
    pfpImg: any;
    name: string;
    imageToShow: any;
    darkEnabled: any;
    modalOpen: any = false;

    constructor(
        private api: ApiService,
        private router: Router, 
        private authentication: AuthenticationService,
        private renderer: Renderer2,
        private elementRef: ElementRef,
        private connectionService: ConnectionService,
        @Inject(DOCUMENT) private document: HTMLDocument
    ) { 
    }

  ngOnInit(): void {
    if (localStorage.getItem('dark') === "false") {
      this.darkEnabled = false;
    }
    else {
      this.darkEnabled = true;
    }
    this.api.getUser().then(result => {
        this.uID = result._id;
        this.firstName = result.firstname;
        this.lastName = result.lastname;
        this.email = result.email;
        this.defaultCurrency = result.defaultCurrency;
        this.defaultLanguage = result.language;
        this.categories = this.fixRGBValues(result.categories);
        this.refreshLanguage(result.language);
        this.pfpImg = this.getImage();
      }).catch(error => {
        this.authentication.logout();
        this.router.navigate(['/']);  
      });
  }
  @ViewChild('modalone') public modal: ModalDirective;
  @ViewChild('modaltwo') public modal2: ModalDirective;

  public hasConnection(): boolean {
    return this.connectionService.hasConnection;
  }

  hasUrl = false;

  faTrashAlt = faTrashAlt;
  faCamera = faCamera;
  faPencilAlt = faPencilAlt;

  hasChangeLanguageMessage: boolean = false;
  changeLanguageMessage: string = "";

  hasChangeCurrencyMessage: boolean = false;
  changeCurrencyMessage: string = "";

  hasChangeUserMessage: boolean = false;
  changeUserMessage: string = "";

  hasChangeColorMessage: boolean = false;
  changeColorMessage: string = "";

  haschangePasswordMessage: boolean = false;
  changePasswordMessage: string = "";

  haschangePfpMessage: boolean = false;
  changePfpMessage: string = "";

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
        { key: "EUR", name: "EURO" },
        { key: "USD", name: "US Dollar" },
        { key: "INR", name: "Indian Rupee" },
        { key: "AUD", name: "Australian Dollar" },
        { key: "CAD", name: "Canadian Dollar" },
        { key: "SGD", name: "Singapore Dollar" },
        { key: "RUB", name: "Russian Ruble" },
        { key: "BGN", name: "Bulgarian Lev" },
        { key: "BRL", name: "Brazilian Real" },
        { key: "CHF", name: "Swis Franc" },
        { key: "CNY", name: "Chinese Yuan Renmibi" },
        { key: "CZK", name: "Czech Koruna" },
        { key: "DKK", name: "Danish Krone" },
        { key: "HKD", name: "Hong Kong Dollar" },
        { key: "HRK", name: "Croatian Kuna" },
        { key: "HUF", name: "Hungarian Forint" },
        { key: "IDR", name: "Indonesian Rupiah" },
        { key: "ILS", name: "Israeli Shekel" },
        { key: "ISK", name: "Icelandic Krona" },
        { key: "JPY", name: "Japanese Yen" },
        { key: "KRW", name: "South Korean Won" },
        { key: "MXN", name: "Mexican Peso" },
        { key: "MYR", name: "Malaysian Ringgit" },
        { key: "NOK", name: "Norwegian Krone" },
        { key: "NZD", name: "New Zeland Dollar" },
        { key: "PHP", name: "Philipine Peso" },
        { key: "PLN", name: "Polish Zloty" },
        { key: "RON", name: "Romanian Leu" },
        { key: "SEK", name: "Swedish Krona" },
        { key: "THB", name: "Thai Baht" },
        { key: "TRY", name: "Turkish Lira" },
        { key: "ZAR", name: "South African Rand" }
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

  fixRGBValues(categories: any) {
      for (var i = 0; i < categories.length; i++) {
        categories[i].color = rgbToHex(categories[i].color);
      }
      return categories;
  }

  refreshLanguage(language: string) {
    setLanguage(language);
        
        this.data.HINT = getTranslation("HINT");
        this.data.nameHint = getTranslation("nameHint");
        this.data.surnameHint = getTranslation("surnameHint");
        this.data.title = getTranslation("account_title");
        this.data.firstName = getTranslation("firstName");
        this.data.lastName = getTranslation("lastName");
        this.data.password = getTranslation("password");
        this.data.changePassword = getTranslation("changePassword");
        this.data.email = getTranslation("email");
        this.data.changeImage = getTranslation("changeImage");
        this.data.saveChanges = getTranslation("saveChanges");
        this.data.application = getTranslation("application");
        this.data.darkMode = getTranslation("darkMode");
        this.data.language = getTranslation("language");
        this.data.currency = getTranslation("currency");
        this.data.categories = getTranslation("categories");
        this.data.passwordHint = getTranslation("passwordHint");
        this.data.passwordNoMatch = getTranslation("passwordNoMatch");
        this.data.oldPassword = getTranslation("oldPassword");
        this.data.newPassword = getTranslation("newPassword");
        this.data.confirmPassword = getTranslation("confirmPassword");
        this.data.close = getTranslation("close");
        this.data.changeProfilePicture = getTranslation("changeImage");
        this.data.dragAndDropOr = getTranslation("dragAndDropOr");
  }

  changeLanguage(language: string) {
    setInnerTextById("languageChange", language);
    this.hasChangeLanguageMessage = true;
    this.changeLanguageMessage = 'Saving language';
    
    this.api.setLanguage(language).then((response) => {
        this.refreshLanguage(response.language);
        this.hasChangeLanguageMessage = false;
      }).catch((error) => {
        this.changeLanguageMessage = 'Failed to save!';
      });
}

getImage() {
    this.api.getPfp().then((image) => {
        let reader = new FileReader();
        reader.addEventListener("load",
        () => {
            this.imageToShow = reader.result;
        },
        false);

        if (image) {
        if (image.type !== "application/pdf")
            reader.readAsDataURL(image);
        }
        
      }).catch((error) => {
        
      });
}

changeColor(category_id: string) {
  this.hasChangeColorMessage = true;
  this.changeColorMessage = 'Saving color';
    this.api.changeColor(category_id, getValueById("color" + category_id)).then((response) => {
      this.hasChangeColorMessage = false;
        
      }).catch((error) => {
        this.changeColorMessage = 'Failed to save!';
      });
}

changeCurrency(curr: string) {
    setInnerTextById("currencyChange", curr);
    this.hasChangeCurrencyMessage = true;
    this.changeCurrencyMessage = 'Saving currency';
    
    this.api.setDefaultCurrency(curr).then((response) => {
      this.hasChangeCurrencyMessage = false;
      }).catch((error) => {
        this.changeCurrencyMessage = 'Failed to save!';

      });
}

updateUserInfo() {
    this.hasChangeUserMessage = true;
    this.changeUserMessage = "Saving user";

    this.api.updateUser(getValueById("emailInput"), getValueById("nameInput"), getValueById("lastnameInput")).then((response) => {
        try {
          var elementList = this.document.querySelectorAll('.modal-backdrop');
          for (let i = 0; i < elementList.length; i++) {
            elementList[i].removeAttribute('class');
          }
        }
        catch {}
        
        try {
          var elementList = this.document.querySelectorAll('.modal-open');
          for (let i = 0; i < elementList.length; i++) {
            document.removeChild(elementList[i])
          }
        }
        catch {}
        this.hasChangeUserMessage = false;
      }).catch((error) => {
        this.changeUserMessage = "Failed to save!";
      });
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
  this.haschangePfpMessage = true;
  this.changePfpMessage = 'Saving image';
    this.api.postFile(this.fileToUpload).then((response) => {
        this.pfpImg = this.getImage();
        this.haschangePfpMessage = false;
        this.modal2.hide();
      }).catch((error) => {
        console.log(error);
        this.changePfpMessage = 'Failed to upload!';
      });
}


disableButton() {
    var name = this.nameRegex();
    var surname = this.surnameRegex();

    if (name == 0 || surname == 0) {
        return false;
    } else {
        this.updateUserInfo();
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
        $('.tt2').toast('hide')
        return 1;
    }
}

passwordStrength(element) {

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
    
    var pass = this.elementRef.nativeElement.querySelector('#' + element);
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
    var pass1 = this.elementRef.nativeElement.querySelector("#newPassword");
    var pass2 = this.elementRef.nativeElement.querySelector("#confirmPassword");
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

removeCategory(id: string) {
  if(confirm("Deleting category will remove all related envelopes and goals!")) {
    this.hasChangeColorMessage = true;
    this.changeColorMessage = "Removing category";
    this.api.deleteCategory(id).then((response) => {
      this.elementRef.nativeElement.querySelector('#editColor' + id ).parentNode.remove();
      this.hasChangeColorMessage = false;
    }).catch((error) => {
      this.changeColorMessage = "Failed to remove!";
    });
  }
}

removeUser() {
  if(confirm("Do you want to remove your account?")) {
    this.api.deleteUser().then((response) => {
      this.router.navigate(['/']);
      
    }).catch((error) => {
      this.changeColorMessage = "Failed to remove!";
    });
  }
}

 
passwordSubmit() {
  if (this.passwordStrength("newPassword") && this.passwordCheckSignUp()) {
    this.haschangePasswordMessage = true;
    this.changePasswordMessage = "Saving password!";
    this.api.updatePassword(getValueById('oldPassword'), getValueById('newPassword'), getValueById('confirmPassword')).then((response) => {
      try {
        this.haschangePasswordMessage = false;
        this.modal.hide();
      }
      catch {}
      
    }).catch((error) => {
      this.changePasswordMessage = "Failed to save!";
    });
  }
}

darkModeButton() {
  toggleDarkMode();
}
  
}
