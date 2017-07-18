import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import * as $ from 'jquery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  //all the information about the user, from the login page
  user = null;
  //dictionary from node id to nodes 
  nodes = {};
  token = null;
  base_url = "https://slugsense.herokuapp.com";


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = navParams.get('user');
    this.nodes = {};
    console.log(this.user);
    this.token = localStorage.getItem("token");
    if (this.token == null){
      console.log("token lost");
    }
    // creates a dictionary of node ids and nodes
    this.compileNodeList(this.user.nodes);
    // gets a list of nodes ids.
    console.log(this.getNodeIds());

    // gets the latest readings for all the nodes and updates the "latest" property of the nodes
    this.getLatestAll();
    var nodeId: number = 51;
    //updates latest reading for this node id.
    this.getLatest(nodeId);

    // to get list of 24 values from the previous day for specific field
    this.get24hrData(nodeId, "temperature")
    console.log(this.nodes[nodeId])

  }

  getLatestAll() {
    return $.ajax({
      url: this.base_url + "/api/nodes/latest_readings/all",
      type:"POST",
      data: {api_token: this.token},
      context: this,
      success: function(data) {
        for(let reading of data) {
          this.nodes[reading.nodeId]["latest"] = reading; 
        }
        console.log(this.nodes);
      },
      error: function(err){
        console.log(err.toString());
        console.log("failure");
      }
    })
  }

  printData(data){
    console.log(data);
  }

  compileNodeList(data){
    for (let node of data){
      if(node.userId == this.user.id) {
        this.nodes[node.id] = node;
      }
    }  
  }

  getNodeIds() {
    let nids: number[] = [];
    let keys = Object.keys(this.nodes);
    for(let key of keys) {
      nids.push(Number(key));
    }
    return nids;
  }

  getLatest(nodeId){
    $.ajax({
      type: "POST",
      dataType: "json",
      url: this.base_url+"/api/nodes/" + nodeId + "/latest_reading",
      data: {
        api_token: this.token
      },
      context: this,
      success: function(data){
        console.log(data);
        this.nodes[nodeId]["latest"] = data;
      },
      error: function(err){
        console.log(err.toString());
        console.log("failure");
      }
    });
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
        type: "GET",
        dataType: "json",
        url: this.base_url+"/api/nodes/all",
        //url: this.base_url+"/api/nodes/51/latest_reading",
        data: {
          api_token: this.token
        },
        context: this,
        success: function(data){
          // let test = new visual_obj(["humidity","sunlight"]);
          // test.single_insert(data);
          // test.print_field("humidity");
          // test.print_field("sunlight");
          // console.log(data);
          console.log(data);
        },
        error: function(err){
          console.log(err.toString());
          console.log("failure");
        }
      });
  }

  getReadingValue(nodeid, key) {
    return this.nodes[nodeid].latest.key;
  }

  //Gets 24 hour data and
  get24hrData(nid, field){
    if(!this.nodes.hasOwnProperty(nid)) {
      console.log("invalid nid");
      return;
    }
    return $.ajax({
      type: "POST",
      dataType: "json",
      url: this.base_url+"/api/nodes/prev_24h/" + nid,
      data: {
        api_token: this.token
      },
      context: this,
      success: function(data) {
        this.nodes[nid]["prev_24h"] = data;
        if(field !== null) {
          this.nodes[nid]["graph_" + field] = this.graphList(nid, field);
        }
      },
      error: function(err){
          console.log(err.toString());
          console.log("failure");
        }
    });
  }

  // Takes 24 hour JSON data and puts it into a list
  graphList(nid, field){
    let items: number[] = [];
    for(let reading of this.nodes[nid].prev_24h) {
      if(reading.hasOwnProperty(field)) {
        items.push(reading[field]);
      } else {
        items.push(null);
      }
    }
    return items;
  }

  updateData(nid,field){

  };

  convertToList(data){

  };

  updateNodeList() {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: this.base_url+"/api/nodes/all",
      data: {
        api_token: this.token
      },
      context: this,
      success: function(data){
        this.compileNodeList(data);
      },
      error: function(err){
        console.log(err.toString());
        console.log("failure");
      }
    });
  }
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

