import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
//import { HomePage } from './home';
import { LoginPage } from './login';
//import { Materialize } from '../../assets/materialize/css/materialize.css';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
  //  HomePage,
    LoginPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage)
  ],
  exports: [
  //  HomePage,
    LoginPage
  ]
})
export class LoginPageModule {}
