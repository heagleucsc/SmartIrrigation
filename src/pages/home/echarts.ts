import {EChartsComponent} from "../../components/echart-component";
import {Component, ViewChild} from '@angular/core';

import {timeBoxedData } from './node_data';

let time:Object[] = new Array(24);
let hum:Object[] = new Array(24);
let moist:Object[] = new Array(24);
let temp:Object[] = new Array(24);
let sun:Object[] = new Array(24);

export class data_display{
	
  private _data: timeBoxedData;

  constructor(data: timeBoxedData){
    this._data = data;
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


   @ViewChild(EChartsComponent)
  chart;

  option = {
    backgroundColor: ['#394058'],

    title: {
         text: 'Sensor 1a',
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
         data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
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
        data: [1,9,1,1,6,1,1,1,1,6,1,1,1,1,1,1,1,1,7,1,1,1,8,1]
      }
    ]
  };
  
   ionViewDidEnter() {
   this.chart.resize();
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
  getMoist() {
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
