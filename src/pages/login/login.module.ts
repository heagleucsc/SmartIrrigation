import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
//import { HomePage } from './home';
import { LoginPage } from './login';
//import { Materialize } from '../../assets/materialize/css/materialize.css';
//import { NoobAnimationsModule } from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import { MdCardModule, MdButtonModule, MdListModule } from '@angular/material';


@NgModule({
  declarations: [
  //  HomePage,
    LoginPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    MdCardModule, MdButtonModule, MdListModule
  //  BrowserAnimationsModule
  ],
  exports: [
  //  HomePage,
    LoginPage
  ]
})
export class LoginPageModule {}
