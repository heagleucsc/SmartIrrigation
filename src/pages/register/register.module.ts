import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
//import { HomePage } from './home';
import { RegisterPage } from './register';

@NgModule({
  declarations: [
  //  HomePage,
    RegisterPage
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage)
  ],
  exports: [
  //  HomePage,
    RegisterPage
  ]
})
export class RegisterPageModule {}
