//This class is modified from the EchartComponent class
//From an echarts api tutorial: https://golb.hplar.ch/p/Integrate-ECharts-into-an-Ionic-2-app

import {Component, Input, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {timeBoxedData } from './node_data';
import * as echarts from 'echarts';

let time:Object[] = new Array(24);
let hum:Object[] = new Array(24);
let moist:Object[] = new Array(24);
let temp:Object[] = new Array(24);
let sun:Object[] = new Array(24);

@Component({
 selector: 'echart',
 template: `<div #root></div>`
})

export class data_display implements OnInit, OnDestroy{
	
@Input('option')
 option: any;

 private chart: any;
 private _data: timeBoxedData;

 @ViewChild('root')
 private root;

 resizeListener = () => this.resize();

 ngOnInit(): void {
   this.chart = echarts.init(this.root.nativeElement);
   this.chart.setOption(this.option);
   window.addEventListener('resize', this.resizeListener, true);
 }

 ngOnDestroy(): void {
   window.removeEventListener('resize', this.resizeListener);
   this.chart.destroy();
 }

 setOption(option, notMerge) {
   this.chart.setOption(option, notMerge);
 }

 resize() {
   this.chart.resize();
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
   getHum() {
	  this.option.yAxis[0].name = "Humidity（%）";
	  this.option.series[0].name = "Humidity";
	  this.option.legend.data = ['Humidity'];
	  this.option.xAxis[0].data = <string[]> time;
      this.option.series[0].data = <number[]> hum;
      this.chart.setOption(this.option, true);
  }
  
  //Switches the graph to display moisture data
  getMoist(){
	  this.option.yAxis[0].name = "Moisture（%）";
	  this.option.series[0].name = "Moisture";
	  this.option.legend.data = ['Moisture'];
	  this.option.xAxis[0].data = <string[]> time;
      this.option.series[0].data = <number[]> moist;
      this.chart.setOption(this.option, true);
  }
  
  //Switches the graph to display temperature data
  getTemp() {
	  this.option.yAxis[0].name = "Temperature (F)";
	  this.option.series[0].name = "Temperature";
	  this.option.legend.data = ['Temperature'];
	  this.option.xAxis[0].data = <string[]> time;
      this.option.series[0].data = <number[]> temp;
      this.chart.setOption(this.option, true);
  }
  
  //Switches the graph to display sunlight data
  getSun() {
	  this.option.yAxis[0].name = "Sunlight（%）";
	  this.option.series[0].name = "Sunlight";
	  this.option.legend.data = ['Sunlight'];
	  this.option.xAxis[0].data = <string[]> time;
      this.option.series[0].data = <number[]> sun;
      this.chart.setOption(this.option, true);
  }
}
