import {Component, ViewChild} from '@angular/core';
import { timeBoxedData } from './node_data';
import { user_data } from './user_data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  user: user_data;
  nodeIds: number[] = [];
  nodeIndex = 0;
  //refrest time (in milliseconds, change according to preference, current set at 10 seconds for testing)
  refresh_time = 10000;
  mode_day = true;

  constructor() {
    let nids = localStorage.getItem("nids");
    if (!nids) this.updateNodeIds;
    else this.nodeIds = JSON.parse(nids);
    this.user = new user_data(this.currentNid());

    //runs the first time
    this.updateInfo();
    //runs after intervals
    setInterval(this.updateInfo.bind(this), this.refresh_time);
  }


  updateInfo()  {
    console.log("updating info")
    this.user.updateData();
    // this.updateButtons()
    // this.updateGraph()
    this.updateNodeIds()

    this.user.logLatest();
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
  buttonPressed(event){
    let field = event.target.id;
    console.log(field);
    // For Heather //
    // this.user.changeGraphField(field)
    // this.updateGraph
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