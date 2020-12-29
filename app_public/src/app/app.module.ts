import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
import { RoutingModule } from './modules/routing/routing.module';
import { InputMemberPipe } from './common/pipes/input-member.pipe';
import { TranslateMonthNumberPipe } from './common/pipes/month-number.pipe';
import { IconTranslatorPipe } from './common/pipes/icon-translator.pipe';
import { CurrencyTranslatorPipe } from './common/pipes/currency-translator.pipe';
import { NotfoundComponent } from './common/components/notfound/notfound.component';
import { DoubleDigitPipe } from './common/pipes/double-digit.pipe';
import { ResetPasswordComponent } from './common/components/reset-password/reset-password.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
    ConfirmationComponent,
    UtilitiesComponent,
    UtilityTableElementComponent,
    UtilitiesEditModalComponent,
    HistoryComponent,
    HistoryTableElementComponent,
    EnvelopesEditModalComponent,
    AccountComponent,
    BillsComponent,
    BillTableComponent,
    InputMemberPipe,
    TranslateMonthNumberPipe,
    IconTranslatorPipe,
    CurrencyTranslatorPipe,
    NotfoundComponent,
    DoubleDigitPipe,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    FormsModule,
    ChartsModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [],
  providers: [],
  bootstrap: [FrameComponent]
})
export class AppModule { }
