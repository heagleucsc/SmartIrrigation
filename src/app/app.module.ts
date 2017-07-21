import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service/auth-service';
//for the angular material importing
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
 //import {MdButtonModule, MdCheckboxModule} from '@angular/material';

@NgModule({
  declarations: [
    MyApp,
  //  HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //for the angular material importing
    // BrowserAnimationsModule,
    //  MdButtonModule,
    //  MdCheckboxModule

    //----------------------
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
//    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
