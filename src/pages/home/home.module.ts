import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
//import { LoginPage } from '../login/login';
//for the angular material importing
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {MdButtonModule, MdCheckboxModule} from '@angular/material';

@NgModule({
  declarations: [
    HomePage,
  //  LoginPage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    //for the angular material importing
  //   BrowserAnimationsModule,
    //  MdButtonModule,
    //  MdCheckboxModule
  ],
  exports: [
    HomePage,
  //  LoginPage
  ]
})
export class HomePageModule {}
