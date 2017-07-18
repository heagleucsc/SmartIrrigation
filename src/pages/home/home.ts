import { Component } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  token = null;
  nodes = null; // Might be unnecessary
  nodeIDs = null;
  default_nid;
  base_url = "https://slugsense.herokuapp.com";


  printData(data){
    console.log(data);
  }

  getNids(data){
    let nids: number[] = [];
    for (let n of data){
      nids.push(n.nodeId);
    }
    console.log(nids);


    return nids;
  }

  constructor() {
    this.token = localStorage.getItem("token");
    this.nodes = localStorage.getItem("nodes");
    if (this.token == null){
      console.log("token lost");
    }
    //let test = new visual_obj(null,["humidity"]);
    //console.log(test);
    //this.getLatestAll().done(this.getNids);  }
  }

  //Gets 24 hour data
  get24hrData(nid, _timestamp){
    if (_timestamp){
      return $.ajax({
        type: "POST",
        dataType: "json",
        url: this.base_url+"/api/nodes/prev_24h/"+nid.toString(),
        data: {api_token: this.token, timestamp: _timestamp }
      });
    }
    return $.ajax({
      type: "POST",
      dataType: "json",
      url: this.base_url+"/api/nodes/prev_24h/"+nid.toString(),
      data: {api_token: this.token}
    });
  };

  getLatestNode(nid){
    return $.ajax({
      type: "POST",
      dataType: "json",
      url: this.base_url+"/api/nodes/"+nid.toString()+"/latest_reading",
      data: { api_token: this.token}
    });
  }

  getLatestAll() {
    return $.ajax({
      url: this.base_url + "/api/nodes/latest_readings/all",
      type:"POST",
      data: {api_token: this.token},
    })
  }


  // Make nid an input later

  consoleLog(data){
    console.log(data);
  }
  log24hrData(event){
    let nid = (<HTMLInputElement>document.getElementById("nid")).value;
    let timestamp = (<HTMLInputElement>document.getElementById("timestamp")).value;
    this.get24hrData(nid,timestamp).done(this.consoleLog);
  }
  logLatestAll(event){
    this.getLatestAll().done(this.consoleLog);
  }
  logLatestNid(event){
    let nid = (<HTMLInputElement>document.getElementById("nid")).value;
    this.getLatestNode(nid).done(this.consoleLog);
  }

  // Takes 24 hour JSON data and puts it into a list
  JSONtoList(data){

  }

  updateData(nid,field){

  };

  convertToList(data){

  };
}

class visual_obj{
    _data = {};

    constructor(types: string[]){
        for (let s of types){
          let arr: number[] = new Array();
          this._data[s] = arr;
        };
    };

    single_insert(data: Object){
      for (let key in data){
        if (key in this._data){
          this._data[key].push(data[key]);
        }
      }
    }

    print_field(field: string){
      if (!(field in this._data)){
        console.log(field + " not found in obj")
      }
      console.log(this._data[field]);
    }


}
