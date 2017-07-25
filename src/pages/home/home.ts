import {Component, ViewChild} from '@angular/core';
import { Events, NavController, IonicPage, App, Loading, LoadingController } from 'ionic-angular';
//import { timeBoxedData } from './node_data';
import { user_data } from './user_data';
import { data_display, getDefault } from './echarts';
//import { getDefault } from './echarts';

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
  //refrest time (in milliseconds, change according to preference, current set at 10 seconds for testing)
  refresh_time = 10000;
  mode_day = true;
  time

  constructor(public events: Events, private nav: NavController, private logingOutCtrl: LoadingController) {
    this.username = sessionStorage.getItem("username");
    let nids = localStorage.getItem("nids");
    if (!nids) this.updateNodeIds;
    else this.nodeIds = JSON.parse(nids);
    this.user = new user_data(this.currentNid());
    console.log(this.user);

    //runs the first time
    this.updateInfo();

    //runs after intervals
    setInterval(this.updateInfo.bind(this), this.refresh_time);

    // Chart setup
    //this.chart = new data_display();
	//this.chart.setOpt()
	//this.chart.ngOnInit()

    // Called via menu
    events.subscribe('changedNid', (pNid) => {
      this.changeNid(pNid)
    });
  }

  //Start Graph
  //Graph options were modified from code given to us by the SlugSense mentors


  @ViewChild(data_display)
  chart;

  option = getDefault();


   ionViewDidEnter() {
   console.log("Try: " + this.chart);
   var temp = this;
   setTimeout(function(){
	    console.log("Inside: " + temp.chart);
        temp.buttonPressed("humidity");
        temp.chart.resize();
    }, 100);
   //this.buttonPressed("humidity");
   //this.chart.resize();
 }

  //End Graph


  updateInfo()  {
    console.log("updating info");
    this.user.updateData();
    console.log("checking data");
    this.checkData();
    // this.updateButtons()
    //this.chart.updateGraph()
    this.updateNodeIds()
    this.events.publish('updateMenuNow');
    this.user.logLatest();
    //this.user.log24hr();
  }

  // Timeout function
  checkData(){
    let temp = this;
    if (!this.user.AssertDataNotNull()){
      setTimeout(temp.checkData, 1500);
    }
  }

  AssertDataNotNull(){
    return this.user.AssertDataNotNull();
  }

  /////////////////////////////////////////////
  // Events from interaction with components //
  /////////////////////////////////////////////
  toggleDailyWeekly(){
    this.mode_day = !this.mode_day;
    // this.updateGraph() // -- implement in future
  };
  changeNid(nid){
    this.user.changeNid(nid, this.chart);
    //this.nodeIndex = (this.nodeIndex + 1) % this.nodeIds.length;
    //this.user.changeNid(this.currentNid());
  };
  printNodeIds(){
    console.log(this.nodeIds);
  }
  buttonPressed(field){
    //console.log("Test if chart object: " + field);
	this.user.updateGraphOptions(this.chart, field);
  }


  /////////////////////////////////////////////




  // Utility functions //
  currentNid(): number {
    return this.nodeIds[this.nodeIndex];
  };

  // I should really instead pass this context
  // and handle the update in user_user.ts

  // but I think node ids should be dealt with in home.ts
  // since user_user should be specific to a single node
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
}
