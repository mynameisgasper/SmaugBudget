import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faCog, faAdjust, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../services/authentication.service';
import { ApiService } from '../../services/api.service';

declare var removeForLogout: any;
declare var loadDarkMode: any;
declare var toggleDarkMode: any;
declare var getTranslation: any;

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

  lang = {
    "logout": getTranslation("logout"),
    "saveChanges": getTranslation("saveChanges"),
    "name": getTranslation("name"),
    "edit": getTranslation("edit"),
    "close": getTranslation("close"),
    "remove": getTranslation("remove"),
    "DASHBOARD": getTranslation("DASHBOARD"),
    "ENVELOPES": getTranslation("ENVELOPES"),
    "GOALS": getTranslation("GOALS"),
    "BILLS": getTranslation("BILLS"),
    "HISTORY": getTranslation("HISTORY"),
    "UTILITIES": getTranslation("UTILITIES"),
    "user": getTranslation("user"),
    "settings": getTranslation("settings"),
    "appearance": getTranslation("appearance"),
    "light": getTranslation("light"),
    "dark": getTranslation("dark")
  }

  logout(): void {
    removeForLogout();
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
