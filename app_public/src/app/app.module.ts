import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FrameComponent } from './frame/frame.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CardComponent } from './card/card.component';
import { AlertComponent } from './alert/alert.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    FrameComponent,
    DashboardComponent,
    HomeComponent,
    CardComponent,
    WelcomeComponent,
    AlertComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ])
  ],
  exports: [CardComponent, WelcomeComponent, AlertComponent, HeaderComponent],
  providers: [],
  bootstrap: [FrameComponent]
})
export class AppModule { }
