import {Component, ViewChild} from '@angular/core';
import {timeBoxedData } from './node_data';
import {data_display, getDefaultOptions, getOptionsNoGradient} from './echarts';

import * as $ from 'jquery';
import * as echarts from 'echarts';
import * as moment from 'moment';


let DEFAULT_FIELD = "humidity"

// page_data class
/*
  For the sake of legibility, the code that handles data
  has been migrated to this class. Therefore, all actions
  involving the display and retrieving of data should be
  done through this class. Home.ts will instead deal
  primarily with interactions with html elements and
  automated features.

  Furthermore, having a seperate class for data handling
  allows for an simpler time handling null data that may
  result from an incompleted ajax call.


  This class will simplify several actions:
    1. When changing the node to display,
      simply call changeNid(), ie after
      another node is selected in menu

    2. Initializing data on main page will
      be a one liner constructor call



*/
export class user_data{
  _nid;
  token;
  _data: timeBoxedData;
  latest = {};
  initialized: false;
  base_url = "https://slugsense.herokuapp.com";
  // visual params //
  // ..
  // ..

  constructor(nid: number){
    this._nid = nid;
    this.token = localStorage.getItem("token");

    //init
    this.latest["humidity"] = -1;
    this.latest["temperature"] = -1;
    this.latest["moisture"] = -1;
    this.latest["sunlight"] = -1;

    // Using result from login.ts ensures that the
    // initial display of data on the buttons are accurate

    // Not implemented yet - work to be done in login.ts
    //this._latest = localStorage.getItem("latest");

    if (this.token == null){
      console.log("token lost");
    }
    this.update24hrData();
  }

  // Public access function to pull data
  // for displaying on the button
  //
  // Babandeep requested that buttons display
  // the latest none null node, so this data
  // should return data from latest_reading call
  // rather than from that of the prev_24 call

  public getLatest(field: string){
    //if (!this._latest || !(field in this._latest)) return -1;
    //return this._latest.field;
    /*
    if (!this._data) return -1;
    let latest = this._data.getLatestData();
    if ( !(field in latest) ) return -1;
    return latest[field];
    */
  }


  public updateData(){
    this.update24hrData();
    this.updateLatest();
  }

  public update24hrData(){
    this.get24hrData(this._nid).
      fail(function(err){
        console.log(err);
        console.log("Node id invalid or server timeout");
      }).
      done(function(data){
        this._data = new timeBoxedData(data, 24);
      });
  };

  public updateLatest(){
    this.getLatestNode(this._nid).
      fail(function(err){
        console.log(err);
        console.log("Error in updating latest data");
      }).
      done(function(data){

        this.latest = data;
      });
  }

  public changeNid(nid, chart){
    this._nid = nid;
    this.update24hrData();
    this.updateLatest();
	  this.updateGraphOptions(chart, DEFAULT_FIELD);
  }


//Updates the graph
  public updateGraphOptions(chart: data_display, field: string){
	  let dict: { [fieldName: string]: Object[]} = this._data.getDataAsDict();
    //console.log("Test1: " + field);
    if (this.assertOneNoneNullDataToday()){
      chart.option = getDefaultOptions();
      chart.graphData(this._data.getDataAsDict());
    }
    else {
      chart.option = getOptionsNoGradient();
      chart.graphData(this.emptyData());
      // graphNull()
    }
	  //console.log("Test2: " + field.localeCompare("humidity"));
	  //console.log("Test3: " + chartData.option);
	 //hartData.getHum(chart, chart.option);
	  if(field.localeCompare("humidity") == 0){
		  chart.getHum();
	  }else if(field.localeCompare("moisture") == 0){
		  chart.getMoist();
	  }else if(field === "temperature"){
		  chart.getTemp();
	  }else{
		  chart.getSun();
	  }

  }

  private assertOneNoneNullDataToday(){
    let now = moment();
    let hoursInDay = 24;
    let yesterday = now.subtract(hoursInDay,'hours');
    let latestDate = moment(this.latest["createdAt"], moment.ISO_8601);
    return latestDate.isAfter(yesterday);
  }

  private emptyData(){
    return {
      "time": new Array(24),
      "humidity": new Array(24),
      "temperature": new Array(24),
      "moisture": new Array(24),
      "sunlight": new Array(24),
    }
  }



  // jQuery ajax calls //

/*
      HOW TO USE AJAX CALLS

    Ajax calls are asynchronous so they cannot change values of variables
    outside of its scope immediately. So, the data from the call should be
    used within the scope of the call like so:

    *nameOfAjaxCall*(*params*).done(*nameOfDataHandlingFunction*);

    There is no need to specify the parameters of the data handle function,
    as the data from the ajax call will be passed automatically as the input.
    The done() function is called once the server responds with the data and
    the specified data handling function is called.

    Heres an example that simply prints any data from the call to the console:

      this.getLatestNode(51).done(this.consoleLog);

    Both involved functions are defined below.

*/

  private get24hrData(nid, _timestamp = null){
    if (_timestamp){
      return $.ajax({
		context: this,
        async:false,
        type: "POST",
        dataType: "json",
        url: this.base_url+"/api/nodes/prev_24h/"+nid.toString(),
        data: {api_token: this.token, timestamp: _timestamp }
      });
    };
    return $.ajax({
	  context: this,
      async: false,
      type: "POST",
      dataType: "json",
      url: this.base_url+"/api/nodes/prev_24h/"+nid.toString(),
      data: {api_token: this.token}
    });
  };

  private getLatestNode(nid){
    return $.ajax({
      type: "POST",
      async: false,
      context: this,
      dataType: "json",
      url: this.base_url+"/api/nodes/"+nid.toString()+"/latest_reading",
      data: { api_token: this.token}
    });
  };

  // Unused
  private getUserInfo() {
    return $.ajax({
      context: this,
      url: this.base_url + "/api/users/getuser",
      type:"POST",
      data: {api_token: this.token},
    });
  };

  public getLatestAll() {
    return $.ajax({
      context: this,
      url: this.base_url + "/api/nodes/latest_readings/all",
      type:"POST",
      data: {api_token: this.token},
    })
  };



  /* Utilities */

  // Called from home to update list of node ids
  public setNodeIds() {
    this.getLatestAll().done(function(data)
    {
      let nids: number[] = [];
      for (let node of data){
        if ("nodeId" in node)
        nids.push(node["nodeId"]);
      }
      localStorage.setItem("nids", JSON.stringify(nids));
    });
  }

  //
  public getNodeIds(){
    return this.getLatestAll();
  }

  public log24hr(){
    console.log(this._data);
  }

  public logLatest(){
    console.log(this.latest)
  }

}
