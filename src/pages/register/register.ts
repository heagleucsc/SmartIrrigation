import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import CryptoJS from 'crypto-js';
import * as $ from 'jquery';

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
//-------------------------
public regis() {
  //this.showLoading();
  let myUsername = this.registerCredentials.username;
  let myPassword = CryptoJS.MD5(this.registerCredentials.password).toString();
  if(typeof(Storage) !== "undefined"){
    let form = this;
    localStorage.setItem("username", myUsername);
    //console.log(myUsername+myPassword);
    $.ajax({
      type: "POST",
      //async: false,
      context: this,
      url: "https://slugsense.herokuapp.com/api/users/",
      data: { username: myUsername, password: myPassword }
    }).fail(function(err) {
      console.log(err);
      if (!this.newAccount)
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
    //  this.nav.setRoot(LoginPage);
        //form.navCtrl.push(HomePage);
      });
    };
  };
//------------------------------



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
