import {EChartsComponent} from "../../components/echart-component";
import {Component, ViewChild} from '@angular/core';

import {timeBoxedData } from './nodeData';

export class data_display{
  //Start graph
  private _data: timeBoxedData;

  constructor(){

    //this._data = new timeBoxedData()
  }





   @ViewChild(EChartsComponent)
  chart;

    ionViewDidEnter() {
    this.chart.resize();
  }

  getData(){
    let data1: number[] = [70, 55, 60, 45, 71, 71, 72, 69, 77, 52, 70, 65];
    return data1;
  }



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
        data: this.getData()
      }
    ]
  };
}
