import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ModalModule } from 'ngx-bootstrap/modal';

import { HomeComponent } from './common/components/home/home.component';
import { DashboardComponent } from './common/components/dashboard/dashboard.component';
import { FrameComponent } from './common/components/frame/frame.component';
import { WelcomeComponent } from './common/components/welcome/welcome.component';
import { CardComponent } from './common/components/card/card.component';
import { AlertComponent } from './common/components/alert/alert.component';
import { HeaderComponent } from './common/components/header/header.component';
import { FooterComponent } from './common/components/footer/footer.component';
import { EnvelopesComponent } from './common/components/envelopes/envelopes.component';
import { EnvelopesProgressComponent } from './common/components/envelopes-progress/envelopes-progress.component';
import { EnvelopesConProgressComponent } from './common/components/envelopes-con-progress/envelopes-con-progress.component';
import { GoalsComponent } from './common/components/goals/goals.component';
import { GoalsProgressComponent } from './common/components/goals-progress/goals-progress.component';
import { DbComponent } from './common/components/db/db.component';
import { UtilitiesComponent } from './common/components/utilities/utilities.component';
import { UtilityTableElementComponent } from './common/components/utility-table-element/utility-table-element.component';
import { UtilitiesEditModalComponent } from './common/components/utilities-edit-modal/utilities-edit-modal.component';
import { HistoryComponent } from './common/components/history/history.component';
import { HistoryTableElementComponent } from './common/components/history-table-element/history-table-element.component';
import { EnvelopesEditModalComponent } from './common/components/envelopes-edit-modal/envelopes-edit-modal.component';
import { AccountComponent } from './common/components/account/account.component';
import { ConfirmationComponent } from './common/components/confirmation/confirmation.component';
import { BillsComponent } from './common/components/bills/bills.component';
import { BillTableComponent } from './common/components/bill-table/bill-table.component';
import { UtilitiesMemberRowComponent } from './common/components/utilities-member-row/utilities-member-row.component';
import { LoginGuardService } from './common/services/login-guard.service';
import { GoldGuardService } from './common/services/gold-guard.service';
import { SilverGuardService } from './common/services/silver-guard.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    FrameComponent,
    DbComponent,
    DashboardComponent,
    HomeComponent,
    CardComponent,
    WelcomeComponent,
    AlertComponent,
    HeaderComponent,
    FooterComponent,
    EnvelopesComponent,
    EnvelopesProgressComponent,
    EnvelopesConProgressComponent,
    GoalsComponent,
    GoalsProgressComponent,
    UtilitiesComponent,
    UtilityTableElementComponent,
    UtilitiesEditModalComponent,
    HistoryComponent,
    HistoryTableElementComponent,
    EnvelopesEditModalComponent,
    AccountComponent,
    BillsComponent,
    BillTableComponent,
    UtilitiesMemberRowComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    NgbModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'db',
        component: DbComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent, 
        canActivate:[LoginGuardService]
      },
      {
        path: 'envelopes',
        component: EnvelopesComponent, 
        canActivate:[LoginGuardService]
      },
      {
        path: 'goals',
        component: GoalsComponent, 
        canActivate:[LoginGuardService]
      },
      {
        path: 'utilities',
        component: UtilitiesComponent, 
        canActivate:[GoldGuardService]
      },
      {
        path: 'history',
        component: HistoryComponent, 
        canActivate:[SilverGuardService]
      },
      {
        path: 'account',
        component: AccountComponent, 
        canActivate:[LoginGuardService]
      },
      {
        path: 'confirm/:url',
        component: ConfirmationComponent
      },
      {
        path: 'confirm/:url/:code',
        component: ConfirmationComponent, 
        canActivate:[LoginGuardService]
      },
      {
        path: 'bills',
        component: BillsComponent, 
        canActivate:[LoginGuardService]
      }
    ], {
      onSameUrlNavigation: 'reload',
      anchorScrolling: 'enabled',
      enableTracing: false
    })
  ],
  exports: [],
  providers: [],
  bootstrap: [FrameComponent]
})
export class AppModule { }
