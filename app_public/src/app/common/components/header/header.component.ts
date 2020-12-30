import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faCog, faAdjust, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../services/authentication.service';
import { ApiService } from '../../services/api.service';

declare var addDarkModeCss: any;
declare var loadDarkMode: any;
declare var toggleDarkMode: any;
declare var removeDarkModeCss: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  imageToShow: any;
  pfpImg: any;

  @Input()
  component: string

  faCog = faCog;
  faAdjust = faAdjust;
  faSignOutAlt = faSignOutAlt;

  constructor(private router: Router, private auth: AuthenticationService, private api: ApiService,) { }

  ngOnInit(): void {
    this.pfpImg = this.getImage();
    loadDarkMode();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['']);
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

  handleDarkMode() {
    toggleDarkMode();
    //loadGraphs();
  }
}
