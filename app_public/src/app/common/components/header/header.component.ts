import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faCog, faAdjust, faSignOutAlt, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../services/authentication.service';
import { ApiService } from '../../services/api.service';
import { ConnectionService } from '../../services/connection.service';

declare var removeForLogout: any;
declare var loadDarkMode: any;
declare var toggleDarkMode: any;
declare var getTranslation: any;
declare var setLanguage: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  imageToShow?: any;
  pfpImg?: any;

  @Input()
  component?: string

  faCog = faCog;
  faAdjust = faAdjust;
  faSignOutAlt = faSignOutAlt;
  defaultLanguage: string;
  faConnection = faExclamationCircle;

  accessLevel = this.auth.getAccessLevel();

  constructor(private router: Router, private auth: AuthenticationService, private api: ApiService, private connectionService: ConnectionService) { }

  ngOnInit(): void {
    if (this.auth.userLoggedIn) {
      this.pfpImg = this.getImage();
      loadDarkMode();
      this.api.getUser().then(result => {
        this.defaultLanguage = result.language;
        this.refreshLanguage(this.defaultLanguage);
      }).catch(error => {
        this.auth.logout();
        this.router.navigate(['/']);  
      });
    }  
  }

  public hasConnection(): boolean {
    return this.connectionService.hasConnection;
  }

  lang = {
    "logout": "logout",
    "saveChanges": "saveChanges",
    "name": "name",
    "edit": "edit",
    "close": "close",
    "remove": "remove",
    "DASHBOARD": "DASHBOARD",
    "ENVELOPES": "ENVELOPES",
    "GOALS": "GOALS",
    "BILLS": "BILLS",
    "HISTORY": "HISTORY",
    "UTILITIES": "UTILITIES",
    "user": "user",
    "settings": "settings",
    "appearance": "appearance",
    "light": "light",
    "dark": "dark",
    "admin": "admin"
  }

  refreshLanguage(language: string) {
    setLanguage(language);
        
    this.lang.logout = getTranslation("logout");
    this.lang.saveChanges = getTranslation("saveChanges");
    this.lang.name = getTranslation("name");
    this.lang.edit = getTranslation("edit");
    this.lang.close = getTranslation("close");
    this.lang.remove = getTranslation("remove");
    this.lang.DASHBOARD = getTranslation("DASHBOARD");
    this.lang.ENVELOPES = getTranslation("ENVELOPES");
    this.lang.GOALS = getTranslation("GOALS");
    this.lang.BILLS = getTranslation("BILLS");
    this.lang.HISTORY = getTranslation("HISTORY");
    this.lang.UTILITIES = getTranslation("UTILITIES");
    this.lang.user = getTranslation("user");
    this.lang.settings = getTranslation("settings");
    this.lang.appearance = getTranslation("appearance");
    this.lang.light = getTranslation("light");
    this.lang.dark = getTranslation("dark");
  }

  logout(): void {
    removeForLogout();
    this.auth.logout();
    this.router.navigate(['/']);
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
