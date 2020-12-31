import { Component, Inject, OnInit, ViewEncapsulation, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { Router } from "@angular/router"
import { AuthenticationService } from '../../services/authentication.service';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit {

  hasRegistrationMessage: boolean = false;
  registrationMessage: string = "";

  hasLoginMessage: boolean = false;
  loginMessage: string = "";

  hasResetMessage: boolean = false;
  resetMessage: string = "";

  constructor(
    private api: AuthenticationService,
    private router: Router,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: HTMLDocument
    ) {}

  
    @ViewChild('registration') registration: any;

    @ViewChild('firstname') firstName: ElementRef;
    @ViewChild('lastname') lastName: ElementRef;
    @ViewChild('email1') email1: ElementRef;
    @ViewChild('email2') email2: ElementRef;
    @ViewChild('password1') password1: ElementRef;
    @ViewChild('password2') password2: ElementRef;


  ngOnInit(): void {
    if (this.api.getLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngAfterViewInit(): void {
    if(window.location.href.indexOf('#registration') != -1) {
      this.registration.open()
      //document.getElementById("registration").showModal();
      console.log(this.registration)
    }

    else if(window.location.href.indexOf('#login') != -1) {
      //this.login.open()
    }
  }


  register(firstname: string, lastname: string, email1: string, email2: string, password1: string, password2: string): void {
    if (firstname && lastname && email1 && email1 === email2 && password1 && password1 === password2) {
      this.hasRegistrationMessage = true;
      this.registrationMessage = "Registration in progress";

      this.api.register(firstname, lastname, email1, email2, password1, password2).then((response) => {
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
        
        this.router.navigate(['/confirm', response.urlCode]);
      }).catch((error) => {
        this.registrationMessage = "Registration failed!";
        console.log(error);
      });
    }
  }

  loginUser(email: string, password: string): void {
    if (email && password) {
      this.hasLoginMessage = true;
      this.loginMessage = "Login in progress";

      this.api.login(email, password).then((result) => {
        if (result.status && result.status != 200) {
          this.loginMessage = "Login failed!";
          //Wrong password
        }
        else {
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
              elementList[i].removeAttribute('class');
              elementList[i].removeAttribute('style');
            }
          }
          catch {}
  
          this.api.setLoggedIn(result.token);
          this.router.navigate(['/dashboard']);
        }
      }).catch((error) => {
        this.api.userLoggedIn = null;
        this.loginMessage = "Login failed!";
        console.log(error);
      })
    }
    else {
      //Fields incorrect
    }
  }

  firstNameIndex(): number {

    const field = this.firstName.nativeElement;
    var regex = new RegExp("^([a-zA-Z]){1,20}$");
    if (!regex.test(field.value)) {
        field.style.borderColor = "red";
        $('.tt1').toast('show');
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt1').toast('hide');
        return 1;
    }
  }

  lastNameIndex(): number {

    const field = this.lastName.nativeElement;
    var regex = new RegExp("^([a-zA-Z]){1,20}$");
    if (!regex.test(field.value)) {
        field.style.borderColor = "red";
        $('.tt2').toast('show');
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt2').toast('hide');
        return 1;
    }
  }
  
  emailIndex() {
    var email1 = this.email1.nativeElement;
    var email2 = this.email2.nativeElement;
    if (!this.validateForm(email1.value) || !this.validateForm(email2.value)){
      email1.style.borderColor = "red";
      email2.style.borderColor = "red";
      $('.tt5').toast('show')
      return 0;
    }
    else if (email1.value != email2.value) {
        email1.style.borderColor = "red";
        email2.style.borderColor = "red";
        $('.tt5').toast('show')
        return 0;
    } else {
        email1.style.borderColor = "#ced4da";
        email2.style.borderColor = "#ced4da";
        $('.tt5').toast('hide')
        return 1;
    }
  }

  passwordIndex(): number {

    var pass1 = this.password1.nativeElement;
    var pass2 = this.password2.nativeElement;
    if (pass1.value != pass2.value) {
        pass2.style.borderColor = "red";
        $('.tt3').toast('show')
        return 0;
    } else {
        pass2.style.borderColor = "#ced4da";
        $('.tt3').toast('hide')
        return 1;
    }
  }

  passwordStrengthIndex(): number {
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
      var pass = this.password1.nativeElement;
      if (pass.value.match(strongRegex)) {
          pass.style.borderColor = "green";
          $('.tt4').toast('hide')
          return 1;
      } else if (pass.value.match(mediumRegex)) {

          pass.style.borderColor = "orange";
          $('.tt4').toast('hide')
          return 1;
      } else {
          pass.style.borderColor = "red";
          $('.tt4').toast('show')
          return 0;
      }
    }

    buttonSignupIndex(firstname: string, lastname: string, email1: string, email2: string, password1: string, password2: string): void{
      var firstNameCheck = this.firstNameIndex()
      var lastNameCheck = this.lastNameIndex();
      var emailCheck = this.emailIndex();
      var passCheck1 = this.passwordIndex();
      var passCheck2 = this.passwordStrengthIndex();
      if (firstNameCheck == 0 || lastNameCheck == 0 || emailCheck == 0 || passCheck1 == 0 || passCheck2 == 0) {
        //DO NOTHING
      } 
      else {
        this.register(firstname, lastname, email1, email2, password1, password2)
      }
    }

    validateForm(field: string): number {

      if (!field) {
         console.log()
        return 0;
      }
      return 1;
    }

    forgotPassword(email: string) {
      this.hasResetMessage = true;
      this.resetMessage = "Sending reset email";

      this.api.requestResetPassword(email).then(result => {
        console.log(result);
        if (result.status !== 200) {
          this.resetMessage = "Failed to send an email!";
        }
        else {
          this.resetMessage = "Email sent!";
        }
      }).catch(error => {
      });
    }
}
