import { Component, ViewChild } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular';
import { PageData, UserData } from './user_data';

import * as $ from 'jquery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  /* User holds json data */
  user: UserData;
  page: PageData;
  token = null;
  base_url = "https://slugsense.herokuapp.com";
  message = "Hello"
  mode_day = true;

  constructor(navCtrl: NavController, navParams: NavParams) {
    this.token = localStorage.getItem("token");
    if (this.token == null){
      console.log("token lost");
    }
    this.user = new UserData(navParams.get('user'), this.token);
    this.page = new PageData(this.user.currNid());
  }


  /*
    Functions called via events on the home page
  */
  changeNid(){
    this.user.nextNid();
    this.page.changeNode(this.user.currNid());
  }

  currentNid() {
    return this.user.currNid();
  }

  toggleDailyWeekly() {
    this.mode_day = !this.mode_day;
  }

  logPageData() {
    console.log(this.page);
  }

  /*
  Data handling functions

  Write functions that handle data recieved from ajax calls here
  */
  //---------------------------------------------------------------------//
  consoleLog(data){
    console.log(data);
  };

  printNodeIds(){
    console.log(this.user.nodeIds);
  };
}
