import {timeBoxedData } from './node_data';

import * as $ from 'jquery';

export class PageData{
  nodeId = null;
  token = null;
  data: timeBoxedData; 
  latest = null;
  base_url = "https://slugsense.herokuapp.com";

  constructor(nid: number){
    this.nodeId = nid;
    this.token = localStorage.getItem("token");
    if (this.token == null){
      console.log("token lost");
    }
    this.updateData();
    console.log(this);
  }

  getLatest(field: string){
    if (this.latest == null) this.updateData();
    if ( !(field in this.latest) ) return -1;
    return this.latest[field];
  }

  updateData() {
    this.get24hrData().done(this.update24hrData.bind(this));
    this.getLatestNode().done(this.updateLatest.bind(this));
  }

  private update24hrData(data){
    this.data = new timeBoxedData(data, 24);
  }

  private updateLatest(data) {
    this.latest = data;
  }

  changeNode(nid) {
    this.nodeId = nid;
    this.updateData();
    console.log("current node changed to " + nid);
    console.log(this);
  }


  private get24hrData(timestamp = null){
    if (timestamp){
      return $.ajax({
        type: "POST",
        dataType: "json",
        url: this.base_url+"/api/nodes/prev_24h/"+this.nodeId.toString(),
        data: {api_token: this.token, timestamp: timestamp }
      });
    }
    return $.ajax({
      type: "POST",
      dataType: "json",
      url: this.base_url+"/api/nodes/prev_24h/"+this.nodeId.toString(),
      data: {api_token: this.token}
    });
  };

  private getLatestNode(){
    return $.ajax({
      type: "POST",
      dataType: "json",
      url: this.base_url+"/api/nodes/"+this.nodeId.toString()+"/latest_reading",
      data: { api_token: this.token}
    });
  }

  private getNodeReadings(nid){
    return $.ajax({
      type: "GET",
      dataType: "json",
      url: this.base_url+"/api/nodes/"+this.nodeId.toString()
    });
  }
}

export class UserData {
  user = null;
  nodes = {};
  nodeIds = [];
  token = null;
  base_url = "https://slugsense.herokuapp.com";
  nodeIndex = 0;
  refreshTime = 100000;

  constructor(data, token) {
    this.token = token;
    this.user = data;
    this.compileNodeList(this.user.nodes);
    this.getLatestAll().done(this.updateLatestAll.bind(this));
    setInterval(this.updateInfo.bind(this), this.refreshTime);
    console.log(this);
  }

  public updateInfo() {
    this.getUserInfo().done(this.updateUserInfo.bind(this));
    this.getLatestAll().done(this.updateLatestAll.bind(this));
    console.log("user updated");
  }

  private updateUserInfo(data) {
    this.user = data;
    this.compileNodeList(this.user.nodes);
  }

  public currNid(): number {
    return this.nodeIds[this.nodeIndex];
  }

  public nextNid(){
    this.nodeIndex = (this.nodeIndex + 1) % this.nodeIds.length;
  }

  public changeNid(nid) {
    for(var i = 0; i < this.nodeIds.length; i++) {
      if(this.nodeIds[i] == nid) {
        this.nodeIndex = i;
      }
    }
  }

  private compileNodeList(data){
    this.nodeIds = [];
    for (let node of data){
      this.nodes[node.id] = node;
      this.nodeIds.push(<number>(node.id));
    }  
  }

  private updateLatestAll(data) {
    for(let reading of data) {
        this.nodes[reading.nodeId]["latest"] = reading; 
     }
  }

  public  getLatest(field: string, nid: number): number {
    //return -1;
    let node = this.nodes[nid];
    if (!node) return -4;
    console.log(node);
    if (!("latest" in node)) return -3;
    let latest = node.latest;
    if (!latest) return -2;
    console.log(latest);
    if (field in latest)
      return latest.field;
    return -1;
  }

  private getLatestAll() {
    return $.ajax({
      context: this,
      url: this.base_url + "/api/nodes/latest_readings/all",
      type:"POST",
      data: {api_token: this.token},
    })
  }



  private getUserInfo() {
    return $.ajax({
      context: this,
      url: this.base_url + "/api/users/getuser",
      type:"POST",
      data: {api_token: this.token},
    });
  }
}
