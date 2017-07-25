import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
//import { ItemDetailsPage } from '../pages/item-details/item-details';
//import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import {data_display} from '../pages/home/echarts';
//import { EChartsComponent } from "../components/echart-component";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MdCardModule, MdButtonModule, MdListModule } from '@angular/material';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    //ItemDetailsPage,
    //ListPage,
    LoginPage,
	//EChartsComponent,
	data_display
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    MdCardModule, MdButtonModule, MdListModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    //ItemDetailsPage,
    //ListPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
