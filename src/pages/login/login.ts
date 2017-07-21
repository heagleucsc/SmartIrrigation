import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

import CryptoJS from 'crypto-js'

import * as $ from 'jquery';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  login(event) {
    let myUsername = (<HTMLInputElement>document.getElementById("username")).value;
    let myPassword = (<HTMLInputElement>document.getElementById("password")).value;
    let hashedPass = CryptoJS.MD5(myPassword).toString();
    console.log(hashedPass);
    if(!myUsername || !myPassword) {
      console.log("error, fields are empty");
      return;
    }
    if(typeof(Storage) !== "undefined"){
      let form = this;
      sessionStorage.setItem("username", myUsername);
      myPassword = hashedPass;
      console.log(myUsername+myPassword);
      $.ajax({
        type: "POST",
        //url: "/api/users/login",
        url: "https://slugsense.herokuapp.com/api/users/login",
        data: { username: myUsername, password: myPassword }
      }).fail(function(err) {
        console.log(err);
        console.log("Invalid Credentials");
      }).done(function(data) {
        console.log(data);
        localStorage.setItem("token", data.api_token);
        //console.log(data);
        // let nodes = data.nodes;
        // let nids: number[] = [];
        // for (let node of nodes){
        //   nids.push(node.id);
        // }
        //console.log(nids);
        //localStorage.setItem("nids", JSON.stringify(nids));
        form.navCtrl.push(HomePage, {
          user: data
        });
      });
    }

  }
};
