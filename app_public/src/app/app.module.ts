import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FrameComponent } from './frame/frame.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CardComponent } from './card/card.component';
import { AlertComponent } from './alert/alert.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EnvelopesComponent } from './envelopes/envelopes.component';
import { EnvelopesProgressComponent } from './envelopes-progress/envelopes-progress.component';
import { EnvelopesConProgressComponent } from './envelopes-con-progress/envelopes-con-progress.component';
import { GoalsComponent } from './goals/goals.component';
import { GoalsProgressComponent } from './goals-progress/goals-progress.component';
import { DbComponent } from './db/db.component';
import { UtilitiesComponent } from './utilities/utilities.component';
import { UtilityTableElementComponent } from './utility-table-element/utility-table-element.component';
import { UtilitiesEditModalComponent } from './utilities-edit-modal/utilities-edit-modal.component';
import { HistoryComponent } from './history/history.component';
import { HistoryTableElementComponent } from './history-table-element/history-table-element.component';
import { EnvelopesEditModalComponent } from './envelopes-edit-modal/envelopes-edit-modal.component';

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
    EnvelopesEditModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    FontAwesomeModule,
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
        component: DashboardComponent
      },
      {
        path: 'envelopes',
        component: EnvelopesComponent
      },
      {
        path: 'goals',
        component: GoalsComponent
      },
      {
        path: 'utilities',
        component: UtilitiesComponent
      },
      {
        path: 'history',
        component: HistoryComponent
      }
    ])
  ],
  exports: [],
  providers: [],
  bootstrap: [FrameComponent]
})
export class AppModule { }
