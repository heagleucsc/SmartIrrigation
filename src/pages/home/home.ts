import {Component, ViewChild} from '@angular/core';
import { Events, NavController, IonicPage, App, Loading, LoadingController } from 'ionic-angular';
import {EChartsComponent} from "../../components/echart-component";
import { timeBoxedData } from './node_data';
import { user_data } from './user_data';
import { data_display } from './echarts';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  user: user_data;
  nodeIds: number[] = [];
  nodeIndex = 0;
  username = '';
  //refrest time (in milliseconds, change according to preference, current set at 10 seconds for testing)
  refresh_time = 10000;
  mode_day = true;
  chartData: data_display;

  constructor(public events: Events, private nav: NavController, private logingOutCtrl: LoadingController) {
    this.username = sessionStorage.getItem("username");
    let nids = localStorage.getItem("nids");
    if (!nids) this.updateNodeIds;
    else this.nodeIds = JSON.parse(nids);
    this.user = new user_data(this.currentNid());

    //runs the first time
    this.updateInfo();
    //runs after intervals
    setInterval(this.updateInfo.bind(this), this.refresh_time);

    // Chart setup
    this.chartData = new data_display(this.chart, this.option);

    // Called via menu
    events.subscribe('changedNid', (pNid) => {
      this.changeNid(pNid)
    });
  }
  
  //Start Graph
  @ViewChild(EChartsComponent)
  chart;
  
  option = {
    backgroundColor: ['#394058'],

    title: {
         text: '',
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
  
   ionViewDidEnter() {
   this.chart.resize();
 } 
  //End Graph 
  

  updateInfo()  {
    console.log("updating info");
    this.user.updateData();
	
    // this.updateButtons()
    //this.chart.updateGraph()
    this.updateNodeIds()
    this.events.publish('updateMenuNow');
    this.user.logLatest();
  }

  /////////////////////////////////////////////
  // Events from interaction with components // 
  /////////////////////////////////////////////
  toggleDailyWeekly(){
    this.mode_day = !this.mode_day;
    // this.updateGraph() // -- implement in future
  };
  changeNid(nid){
    this.user.changeNid(nid);
    //this.nodeIndex = (this.nodeIndex + 1) % this.nodeIds.length;
    //this.user.changeNid(this.currentNid());
  };
  printNodeIds(){
    console.log(this.nodeIds);
  }
  buttonPressed(field){
    //console.log("Test if chart object: " + field);
	this.user.updateGraphOptions(this.chart, this.chartData, field);
  }


  /////////////////////////////////////////////




  // Utility functions //
  currentNid(): number {
    return this.nodeIds[this.nodeIndex];
  };

  // I should really instead pass this context
  // and handle the update in user_user.ts

  // but I think node ids should be dealt with in home.ts
  // since user_user should be specific to a single node
  updateNodeIds() {
    this.user.getLatestAll().done(function(user)
    {
      let nids: number[] = [];
      for (let node of user){
        if ("nodeId" in node)
        nids.push(node["nodeId"]);
      }
      this.nodeIds = nids;
    });
  }

  updateButtons() {

  }
}