//This class is modified from the EchartComponent class
//From an echarts api tutorial: https://golb.hplar.ch/p/Integrate-ECharts-into-an-Ionic-2-app

import {Component, Input, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {timeBoxedData } from './node_data';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
//import * as echarts from 'echarts';

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
// private _data: timeBoxedData;

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
	  this.option.yAxis[0].name = "(%) ";
	  this.option.series[0].name = "Humidity";
	  this.option.legend.data = ['Humidity'];
	  this.option.xAxis[0].data = <string[]> time;
      this.option.series[0].data = <number[]> hum;
      this.chart.setOption(this.option, true);
  }

  //Switches the graph to display moisture data
  getMoist(){
	  this.option.yAxis[0].name = "(%) ";
	  this.option.series[0].name = "Moisture";
	  this.option.legend.data = ['Moisture'];
	  this.option.xAxis[0].data = <string[]> time;
      this.option.series[0].data = <number[]> moist;
      this.chart.setOption(this.option, true);
  }

  //Switches the graph to display temperature data
  getTemp() {
	  this.option.yAxis[0].name = "(F) ";
	  this.option.series[0].name = "Temperature";
	  this.option.legend.data = ['Temperature'];
	  this.option.xAxis[0].data = <string[]> time;
      this.option.series[0].data = <number[]> temp;
      this.chart.setOption(this.option, true);
  }

  //Switches the graph to display sunlight data
  getSun() {
	  this.option.yAxis[0].name = "(%)";
	  this.option.series[0].name = "Sunlight";
	  this.option.legend.data = ['Sunlight'];
	  this.option.xAxis[0].data = <string[]> time;
      this.option.series[0].data = <number[]> sun;
      this.chart.setOption(this.option, true);
  }
}

export function getDefaultOptions(){
  return  {
    backgroundColor: ['#FFFFFF'],

    title: {
         text: '',
         textStyle: {
             fontWeight: 'normal',
             fontSize: 16,
             color: '#57617B'
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
         itemWidth: 5,
         itemHeight: 5,
         itemGap: 13,
         data: ['Humidity'],
         right: '4%',
         textStyle: {
             fontSize: 12,
             color: '#57617B'
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
         data: []
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
		 areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(137, 189, 27, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(137, 189, 27, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
  	itemStyle: {
             normal: {
                 color: 'rgb(137,189,27)',
                 borderColor: 'rgba(137,189,2,0.27)',
                 borderWidth: 12
             }
         },
        data: []
      }
    ]
  };
}
