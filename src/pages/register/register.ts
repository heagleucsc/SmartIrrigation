import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
  })

export class RegisterPage {
  //default
    // constructor(public navCtrl: NavController, public navParams: NavParams) {
    // }
    //
    // ionViewDidLoad() {
    //   console.log('ionViewDidLoad RegisterPage');
    // }
    createSuccess = false;
    registerCredentials = { username: '', password: '' };

    constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) { }

    public register() {
      this.auth.register(this.registerCredentials).subscribe(success => {
        if (success) {
          this.createSuccess = true;
          this.showPopup("Success", "Account created.");
        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      },
        error => {
          this.showPopup("Error", error);
        });
    }

    showPopup(title, text) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: text,
        buttons: [
          {
            text: 'OK',
            handler: data => {
              if (this.createSuccess) {
                this.nav.popToRoot();
              }
            }
          }
        ]
      });
      alert.present();
    }
  }
