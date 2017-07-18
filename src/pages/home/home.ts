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

  getLatestAll() {
    return $.ajax({
      url: this.base_url + "/api/nodes/latest_readings/all",
      type:"POST",
      data: {api_token: this.token},
    })
  }

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


  getData(event){
    console.log("Get Data");
    if (!this.token){
      console.log("Token not found");
      return;
    };
    //let a = this.getLatestAll().done(this.getNids);
    //console.log("a: " + a);
    //console.log(this.nodeIDs)
      $.ajax({
        type: "POST",
        dataType: "json",
        //url: this.base_url+"/api/nodes/prev_24h/51",
        url: this.base_url+"/api/nodes/51/latest_reading",
        data: {
          api_token: this.token       
        },
        success: function(data){
          let test = new visual_obj(["humidity","sunlight"]);
          test.single_insert(data);
          test.print_field("humidity");
          test.print_field("sunlight");
          console.log(data);
        },
        error: function(err){
          console.log(err.toString());
          console.log("failure");
        }
      });

  }

  //Gets 24 hour data and 
  get24hrData(nid){
    $.ajax({
      type: "POST",
      dataType: "json",
      url: this.base_url+"/api/nodes/prev_24h/51",
      data: {
        api_token: this.token
      }
    });
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