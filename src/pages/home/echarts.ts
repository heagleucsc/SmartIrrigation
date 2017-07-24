import {EChartsComponent} from "../../components/echart-component";
import {Component, ViewChild} from '@angular/core';
import {timeBoxedData } from './node_data';

import * as echarts from 'echarts';

let time:Object[] = new Array(24);
let hum:Object[] = new Array(24);
let moist:Object[] = new Array(24);
let temp:Object[] = new Array(24);
let sun:Object[] = new Array(24);

export class data_display{
	
  private _data: timeBoxedData;
  chart;
  option;

  constructor(chart, option){
	this.chart = chart; 
	this.option = option;
  }
  
  //This function gets the data from an ajax call
  // May be moved into another class
    graphData(data){
	  time = data["time"];
	  hum = data["humidity"];
	  moist = data["moisture"];
	  temp = data["temperature"];
	  sun = data["sunlight"];
	  
  }
 
 
 //Switches the graph to display humidity data
   getHum(chart, option) {
	  option.yAxis[0].name = "Humidity（%）";
	  option.series[0].name = "Humidity";
	  option.legend.data = ['Humidity'];
	  option.xAxis[0].data = <string[]> time;
      option.series[0].data = <number[]> hum;
      chart.setOption(option, true);
  }
  
  //Switches the graph to display moisture data
  getMoist(chart, option){
	  option.yAxis[0].name = "Moisture（%）";
	  option.series[0].name = "Moisture";
	  option.legend.data = ['Moisture'];
	  option.xAxis[0].data = <string[]> time;
      option.series[0].data = <number[]> moist;
      chart.setOption(option, true);
  }
  
  //Switches the graph to display temperature data
  getTemp(chart,option) {
	  option.yAxis[0].name = "Temperature (F)";
	  option.series[0].name = "Temperature";
	  option.legend.data = ['Temperature'];
	  option.xAxis[0].data = <string[]> time;
      option.series[0].data = <number[]> temp;
      chart.setOption(option, true);
  }
  
  //Switches the graph to display sunlight data
  getSun(chart,option) {
	  option.yAxis[0].name = "Sunlight（%）";
	  option.series[0].name = "Sunlight";
	  option.legend.data = ['Sunlight'];
	  option.xAxis[0].data = <string[]> time;
      option.series[0].data = <number[]> sun;
      chart.setOption(option, true);
  }
}
