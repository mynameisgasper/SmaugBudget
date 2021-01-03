import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AccountComponent } from '../../common/components/account/account.component';
import { BillsComponent } from '../../common/components/bills/bills.component';
import { ConfirmationComponent } from '../../common/components/confirmation/confirmation.component';
import { DashboardComponent } from '../../common/components/dashboard/dashboard.component';
import { DbComponent } from '../../common/components/db/db.component';
import { EnvelopesComponent } from '../../common/components/envelopes/envelopes.component';
import { GoalsComponent } from '../../common/components/goals/goals.component';
import { HistoryComponent } from '../../common/components/history/history.component';
import { HomeComponent } from '../../common/components/home/home.component';
import { UtilitiesComponent } from '../../common/components/utilities/utilities.component';
import { NotfoundComponent } from '../../common/components/notfound/notfound.component';
import { LoginGuardService } from '../../common/services/login-guard.service';
import { SilverGuardService } from '../../common/services/silver-guard.service';
import { GoldGuardService } from '../../common/services/gold-guard.service';
import { AdminGuardService } from '../../common/services/admin-guard.service';
import { ResetPasswordComponent } from 'src/app/common/components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'db',
    component: DbComponent, 
    canActivate:[AdminGuardService]
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
  },
  {
    path: 'passwordReset/:code',
    component: ResetPasswordComponent
  },
  {
    path: '**',
    component: NotfoundComponent, 
  }
];

const config: ExtraOptions = {
  onSameUrlNavigation: 'reload',
  anchorScrolling: 'enabled',
  enableTracing: false
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, config)
  ],
  exports: [RouterModule]
})

export class RoutingModule { }
