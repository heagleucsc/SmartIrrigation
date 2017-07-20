import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
//import { LoginPage } from '../login/login';

@NgModule({
  declarations: [
    HomePage,
  //  LoginPage
  ],
  imports: [
    IonicPageModule.forChild(HomePage)
  ],
  exports: [
    HomePage,
  //  LoginPage
  ]
})
export class HomePageModule {}
