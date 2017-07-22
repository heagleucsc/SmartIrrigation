import {Component, ViewChild} from '@angular/core';
import {EChartsComponent} from "../../components/echart-component";
import * as nodeData from '../home/nodeData';
//import {EChartsComponent} from "../../components/echart-component";
import {timeBoxedData } from './nodeData';

import * as $ from 'jquery';

let time:Object[] = new Array(24);
let hum:Object[] = new Array(24);
let moist:Object[] = new Array(24);
let temp:Object[] = new Array(24);
let sun:Object[] = new Array(24);

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  token = null;
  base_url = "https://slugsense.herokuapp.com";

  // Unused for now
  nodes = null; // Might be unnecessary
  nodeIds: number[] = [];
  default_nid;
  message = "adskfj"



  // Graph options //
  // Graph stuff should probably be moved to its own class later
  mode_day = true;



  constructor() {
    this.token = localStorage.getItem("token");
    if (this.token == null){
      console.log("token lost");
    }
    // Update the node IDs
    this.updateNodeIds();

    //let test = new visual_obj(null,["humidity"]);
    //console.log(test);
    //this.getLatestAll().done(this.getNids);  }
  }


  /*
    Functions called via events on the home page
  */
  //---------------------------------------------------------------------//
  log24hrData(event){
    let nid = (<HTMLInputElement>document.getElementById("nid")).value;
    let timestamp = (<HTMLInputElement>document.getElementById("timestamp")).value;
    this.get24hrData(nid,timestamp).done(this.handleData);
	this.get24hrData(nid,timestamp).done(this.graphData);
  }
  logLatestAll(event){
    this.getLatestAll().done(this.consoleLog);
  }
  logLatestNid(event){
    let nid = (<HTMLInputElement>document.getElementById("nid")).value;
    this.getLatestNode(nid).done(this.consoleLog);
  }
  updateNodeIds(){
    this.getLatestAll().done(this._updateNodeIds);
  }
  test(){
    let nid = (<HTMLInputElement>document.getElementById("nid")).value;
    let timestamp = (<HTMLInputElement>document.getElementById("timestamp")).value;
    this.get24hrData(nid, timestamp).done(this.handleData);
  }
  toggleDailyWeekly(){
    this.mode_day = !this.mode_day;
    // this.updateGraph() // -- implement in future
  }
  //---------------------------------------------------------------------//


/*
      HOW TO USE AJAX CALLS
    Ajax calls are asynchronous so they cannot change values of variables
    outside of its scope, including fields of the HomePage class itself.
    To use the data:
    *nameOfAjaxCall*(*params*).done(*nameOfDataHandlingFunction*);
    There is no need to specify the parameters of the data handle function,
    as the data from the ajax call will be passed automatically as the input.
    The done() function is called once the server responds with the data and
    the specified data handling function is called.
    Heres an example that simply prints any data from the call to the console:
      this.getLatestNode(51).done(this.consoleLog);
    Both involved functions are defined below.
*/


  /*
    Lists of ajax calls that returns data
  */
  //---------------------------------------------------------------------//
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
      context: this,
      url: this.base_url + "/api/nodes/latest_readings/all",
      type:"POST",
      data: {api_token: this.token},
    })
  }

  getNodeReadings(nid){
    return $.ajax({
      type: "GET",
      dataType: "json",
      url: this.base_url+"/api/nodes/"+nid.toString(),
      data: {} //api_token: this.token}
    });
  }

  getUserInfo() {
    //return $.
  }
  //---------------------------------------------------------------------//


  /*
  Data handling functions
  Write functions that handle data recieved from ajax calls here
  */
  //---------------------------------------------------------------------//
  consoleLog(data){
    console.log(data);
  };

  _updateNodeIds(data: Object[]){
    let nids: number[] = [];
    //console.log(data);
    for (let node of data){
      //console.log(node);
      if ("nodeId" in node)
        nids.push(node["nodeId"]);
    }
    this.nodeIds = nids;
    //localStorage.setItem("nids", JSON.stringify(nids))
  };

  //---------------------------------------------------------------------//


  /*
  Utility functions
  */
  //---------------------------------------------------------------------//
  printNodeIds(){
    console.log(this.nodeIds);
  };

  handleData(data) {
    //console.log(data);
    let box : timeBoxedData = new timeBoxedData(data, 24);
    console.log(box);
    console.log(box.getDataAsDict());
  }
  
  graphData(data){
	  let box : timeBoxedData = new timeBoxedData(data, 24);
	  let dict: { [fieldName: string]: Object[]} = box.getDataAsDict();
	  time = dict["time"];
	  hum = dict["humidity"];
	  moist = dict["moisture"];
	  temp = dict["temperature"];
	  sun = dict["sunlight"];
	  
  }


@ViewChild(EChartsComponent)
 chart;

 option = {
   backgroundColor: ['#394058'],
   
   title: {
        text: 'Sensor 53',
        textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
        },
        left: '6%'
    },
	tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#57617B'
            }
        }
    },
	legend: {
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: ['Humidity'],
        right: '4%',
        textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
        }
    },
   color: ['#3398DB'],
   grid: {
     left: '3%',
     right: '4%',
     bottom: '3%',
     containLabel: true
   },
   xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#57617B'
            }
        },
        data: ['1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1']
    }],    
   yAxis: [{
        type: 'value',
        name: 'Humidity（%）',
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#57617B'
            }
        },
        axisLabel: {
            margin: 10,
            textStyle: {
                fontSize: 14
            }
        },
        splitLine: {
            lineStyle: {
                color: '#57617B'
            }
        }
    }],
   series: [
     {
       name: 'Humidity',
       type: 'line',
       smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
            normal: {
                width: 1
            }
        },
		itemStyle: {
            normal: {
                color: 'rgb(137,189,27)',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12
            }
        },
       data: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
     }
   ]
 };
 
 ionViewDidEnter() {
   this.chart.resize();
 }
 
   getHum() {
	  this.option.yAxis[0].name = "Humidity（%）";
	  this.option.series[0].name = "Humidity";
	  this.option.legend.data = ['Humidity'];
	  this.option.xAxis[0].data = <string[]> time;
      this.option.series[0].data = <number[]> hum;
      this.chart.setOption(this.option, true);
  }
  
  getMoist() {
	  this.option.yAxis[0].name = "Moisture（%）";
	  this.option.series[0].name = "Moisture";
	  this.option.legend.data = ['Moisture'];
	  this.option.xAxis[0].data = <string[]> time;
      this.option.series[0].data = <number[]> moist;
      this.chart.setOption(this.option, true);
  }
  
  getTemp() {
	  this.option.yAxis[0].name = "Temperature (F)";
	  this.option.series[0].name = "Temperature";
	  this.option.legend.data = ['Temperature'];
	  this.option.xAxis[0].data = <string[]> time;
      this.option.series[0].data = <number[]> temp;
      this.chart.setOption(this.option, true);
  }
  
  getSun() {
	  this.option.yAxis[0].name = "Sunlight（%）";
	  this.option.series[0].name = "Sunlight";
	  this.option.legend.data = ['Sunlight'];
	  this.option.xAxis[0].data = <string[]> time;
      this.option.series[0].data = <number[]> sun;
      this.chart.setOption(this.option, true);
  }

}