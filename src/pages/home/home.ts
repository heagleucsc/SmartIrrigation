import { Component } from '@angular/core';
import { Events, NavController, IonicPage, App, Loading, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { user_data } from './user_data';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: user_data;
  nodeIds: number[] = [];
  nodeIndex = 0;
  username = '';
  //password = ''; // password should not be stored
  //optional for loging out effect along with : private logingOutCtrl: LoadingController
  logingOutLoading: Loading;

    //refrest time (in milliseconds, change according to preference, current set at 10 seconds for testing)
  refresh_time = 10000;
  mode_day = true;

  constructor(public events: Events, private nav: NavController, private auth: AuthService, private logingOutCtrl: LoadingController) {
    //let info = this.auth.getUserInfo();
    this.username = sessionStorage.getItem("username");
    let nids = localStorage.getItem("nids");
    if (!nids) this.updateNodeIds();
    else this.nodeIds = JSON.parse(nids);
    this.user = new user_data(this.currentNid());

    //runs the first time
    this.updateInfo();
    //runs after intervals
    setInterval(this.updateInfo.bind(this), this.refresh_time);
    events.subscribe('changedNid', (pNid) => {
    //this.nodeIndex = (this.nodeIndex + 1) % this.nodeIds.length;
    this.user.changeNid(pNid);
    console.log(pNid);

    })
  }

  updateInfo()  {
    console.log("updating info")
    this.user.updateData();
    // this.updateButtons()
    // this.updateGraph()
    this.updateNodeIds()
    this.events.publish('updateMenuNow');
    this.user.logLatest();
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
  /////////////////////////////////////////////
  // Events from interaction with components //
  /////////////////////////////////////////////
  toggleDailyWeekly(){
    this.mode_day = !this.mode_day;
    // this.updateGraph() // -- implement in future
  };
  changeNid(){

    this.nodeIndex = (this.nodeIndex + 1) % this.nodeIds.length;
    this.user.changeNid(this.currentNid());
  };
  printNodeIds(){
    console.log(this.nodeIds);
  }
  buttonPressed(field: string){
    //let field = <HTMLElementL>document.GetElementById("humidity");
    //let field = event.target.id;
    console.log(field);
    // For Heather //
    // this.user.changeGraphField(field)
    // this.updateGraph
  }

  update(){
    $.ajax({

    })
  }

  /////////////////////////////////////////////




  // Utility Functions
  currentNid(): number {
     return this.nodeIds[this.nodeIndex];
   };
  updateNodeIds() {
    this.user.getLatestAll().done(function(user)
    {
      let nids: number[] = [];
      for (let node of user){
        if ("nodeId" in node)
        nids.push(node["nodeId"]);
      }
      this.nodeIds = nids;
    });
  }

  updateButtons() {

  }
};
