import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
    GoalsProgressComponent
  ],
  imports: [
    BrowserModule,
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
      }
    ])
  ],
  exports: [
    CardComponent, 
    WelcomeComponent, 
    AlertComponent, 
    HeaderComponent,
    FooterComponent
  ],
  providers: [],
  bootstrap: [FrameComponent]
})
export class AppModule { }
