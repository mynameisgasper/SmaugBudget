import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
declare var $:any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  code: string;

  hasMessage: boolean = false;
  message: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private api: AuthenticationService) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
  }

  passwordStrengthIndex(password): number {
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
    if (password.value.match(strongRegex)) {
        password.style.borderColor = "green";
        $('.tt4').toast('hide')
        return 1;
    } else if (password.value.match(mediumRegex)) {

        password.style.borderColor = "orange";
        $('.tt4').toast('hide')
        return 1;
    } else {
        password.style.borderColor = "red";
        $('.tt4').toast('show')
        return 0;
    }

    return 0;
  }

  resetPassword(password1, password2) {
    this.hasMessage = true;
    this.message = 'Resetting password';

    if (password1.value === password2.value && this.passwordStrengthIndex(password1) && this.passwordStrengthIndex(password2)) {
      this.api.resetPassword(this.code, password1.value).then(result => {
        if (result.status !== 200) {
          this.message = 'Failed resetting password!';
        }
        else {
          this.router.navigate(['/']);
        }
      }).catch(error => {
        this.message = 'Failed resetting password!';
      });
    }
  }
}
