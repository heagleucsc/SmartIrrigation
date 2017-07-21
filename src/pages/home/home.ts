import {Component, ViewChild} from '@angular/core';
import { timeBoxedData } from './nodeData';
import { page_data } from './page_data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  data: page_data
  nodeIds: number[] = [];
  nodeIndex = 0;
  //refrest time (in milliseconds, change according to preference, current set at 10 seconds for testing)
  refresh_time = 10000;
  mode_day = true;

  constructor() {
    let nids = localStorage.getItem("nids");
    if (!nids) this.updateNodeIds;
    else this.nodeIds = JSON.parse(nids);
    this.data = new page_data(this.currentNid());

    //runs the first time
    this.updateInfo();
    //runs after intervals
    setInterval(this.updateInfo.bind(this), this.refresh_time);
  }


  updateInfo()  {
    console.log("updating info")
    this.data.updateData();
    // this.updateButtons()
    // this.updateGraph()
    this.updateNodeIds()

    this.data.logLatest();
  }


  // Events from interaction with components // 
  toggleDailyWeekly(){
    this.mode_day = !this.mode_day;
    // this.updateGraph() // -- implement in future
  };
  changeNid(){
    this.nodeIndex = (this.nodeIndex + 1) % this.nodeIds.length;
    this.data.changeNid(this.currentNid());
  };
  printNodeIds(){
    console.log(this.nodeIds);
  }





  // Utility functions //
  currentNid(): number {
    return this.nodeIds[this.nodeIndex];
  };

  // I should really instead pass this context
  // and handle the update in page_data.ts

  // but I think node ids should be dealt with in home.ts
  // since page_data should be specific to a single node
  updateNodeIds() {
    this.data.getLatestAll().done(function(data)
    {
      let nids: number[] = [];
      for (let node of data){
        if ("nodeId" in node)
        nids.push(node["nodeId"]);
      }
      this.nodeIds = nids;
    });
  }
}