import {Component, ViewChild} from '@angular/core';
import { Events, NavController, IonicPage, App, Loading, LoadingController } from 'ionic-angular';
import { timeBoxedData } from './node_data';
import { user_data } from './user_data';
import { data_display, getDefaultOptions } from './echarts';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  logingOutLoading: Loading;
  user: user_data;
  nodeIds: number[] = [];
  nodeIndex = 0;
  username = '';
  //refrest time (in milliseconds, change according to preference, current set at 10 seconds for testing)
  refresh_time = 10000;
  mode_day = true;

  constructor(public events: Events, private nav: NavController, private auth: AuthService, private logingOutCtrl: LoadingController) {
    this.username = sessionStorage.getItem("username");
    let nids = localStorage.getItem("nids");
    if (!nids) this.updateNodeIds;
    else this.nodeIds = JSON.parse(nids);
    this.user = new user_data(this.currentNid());

    //runs the first time
    this.updateInfo();

    //runs after intervals
    setInterval(this.updateInfo.bind(this), this.refresh_time);
    // Called via menu
    events.subscribe('changedNid', (pNid) => {
      this.changeNid(pNid)
    });
  }
///////

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
  //this.chart.ngOnDestroy();
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
///////

//Start Graph
  //Graph options were modified from code given to us by the SlugSense mentors


  @ViewChild(data_display)
   chart;


  option = getDefaultOptions();


   ionViewDidEnter() {
   console.log("Try: " + this.chart);
   this.buttonPressed("humidity");
   this.chart.resize();
   //this.buttonPressed("humidity");
   //this.chart.resize();
 }

  //End Graph



  /////////////////////////////////////////////
  // Events from interaction with components //
  /////////////////////////////////////////////
  toggleDailyWeekly(){
    this.mode_day = !this.mode_day;
  };
  changeNid(nid){
    this.user.changeNid(nid, this.chart);
  };
  printNodeIds(){
    console.log(this.nodeIds);
  }
  buttonPressed(field){
	  this.user.updateGraphOptions(this.chart, field);
  }


  /////////////////////////////////////////////

  // Utility functions //
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

};
