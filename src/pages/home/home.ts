import { Component } from '@angular/core';
import { NavController, IonicPage, App, Loading, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //default
  // constructor(public navCtrl: NavController) {
  //
  // }
  username = '';
  password = '';
  //optional for loging out effect along with : private logingOutCtrl: LoadingController
  logingOutLoading: Loading;

  constructor(private nav: NavController, private auth: AuthService, private logingOutCtrl: LoadingController) {
    let info = this.auth.getUserInfo();
    this.username = info['username'];
    this.password = info['password'];
  }

  public logout() {
    this.showLoadingOut();
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot(LoginPage)
    });
  }
  //Displays a loading screen when loging out
  public showLoadingOut() {
        this.logingOutLoading = this.logingOutCtrl.create({
          content: 'Loging Out...',
          dismissOnPageChange: true
        });
        this.logingOutLoading.present();
      }

}
