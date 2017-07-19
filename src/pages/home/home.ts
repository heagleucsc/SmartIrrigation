import {Component, ViewChild} from '@angular/core';
import {EChartsComponent} from "../../components/echart-component";

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
  
  //Start graph
  
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
 
 //end graph


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

  //Gets 24 hour data
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
      url: this.base_url + "/api/nodes/latest_readings/all",
      type:"POST",
      data: {api_token: this.token},
    })
  }


  // Make nid an input later

  consoleLog(data){
    console.log(data);
  }
  log24hrData(event){
    let nid = (<HTMLInputElement>document.getElementById("nid")).value;
    let timestamp = (<HTMLInputElement>document.getElementById("timestamp")).value;
    this.get24hrData(nid,timestamp).done(this.consoleLog);
  }
  logLatestAll(event){
    this.getLatestAll().done(this.consoleLog);
  }
  logLatestNid(event){
    let nid = (<HTMLInputElement>document.getElementById("nid")).value;
    this.getLatestNode(nid).done(this.consoleLog);
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

