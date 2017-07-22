import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading, IonicPage, App } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { RegisterPage } from '../register/register';

import CryptoJS from 'crypto-js';

import * as $ from 'jquery';

//import { Materialize } from '../../assets/materialize/css/materialize.css';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
    //default constractor
    // constructor(public navCtrl: NavController, public navParams: NavParams) {
    // }
  //to check if it loads correctly
    // ionViewDidLoad() {
    //   console.log('ionViewDidLoad LoginPage');
    // }
    //To prevent "Access Denied" message when creating new account
    newAccount = false;
    loading: Loading;
    registerCredentials = { username: '', password: '' };

    constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

   //later on for new account registration
    public createAccount() {
      this.nav.push('RegisterPage');
      this.newAccount = true;
    }

//login method and redirect to main page
    public login() {
      this.showLoading();
      let myUsername = this.registerCredentials.username;
      let myPassword = CryptoJS.MD5(this.registerCredentials.password).toString();
      if(typeof(Storage) !== "undefined"){
        let form = this;
        sessionStorage.setItem("username", myUsername);
        //console.log(myUsername+myPassword);
        $.ajax({
          type: "POST",
          context: this,
          url: "https://slugsense.herokuapp.com/api/users/login",
          data: { username: myUsername, password: myPassword }
        }).fail(function(err) {
          console.log(err);
          this.showError("Invalid Credentials");
          //console.log("Invalid Credentials");
        }).done(function(data) {
          console.log(data);
          localStorage.setItem("token", data.api_token);
          let nodes = data.nodes;
          let nids: number[] = [];
          for (let node of nodes){
            nids.push(node.id);
          }
          localStorage.setItem("nids", JSON.stringify(nids));
          this.nav.setRoot('HomePage');
          
          //form.navCtrl.push(HomePage);
        });
      };
    };
      /*
      this.auth.login(this.registerCredentials).subscribe(allowed => {
        if (allowed) {
          this.nav.setRoot('HomePage');
        } else if (!allowed && !this.newAccount) {
          this.showError("Wrong Username or Password");
        }
      },
        error => {
          this.showError(error);
        });
      */

//Displays a now loading screen
    showLoading() {
      this.loading = this.loadingCtrl.create({
        content: 'Please Wait...',
        dismissOnPageChange: true
      });
      this.loading.present();
    }

//error
    showError(text) {
      this.loading.dismiss();

      let alert = this.alertCtrl.create({
        title: 'Fail',
        subTitle: text,
        buttons: ['OK']
      });
      alert.present(prompt);
    }
  }
