import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../../common/components/home/home.component';
import { AppModule } from '../../app.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    AppModule
  ]
})
export class IndexModule { }
