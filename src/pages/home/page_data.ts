import {timeBoxedData } from './nodeData';

import * as $ from 'jquery';

export class page_data{
  _nid;
  token;
  _data: timeBoxedData; 
  initialized: false;
  base_url = "https://slugsense.herokuapp.com";

  constructor(nid: number){
    this._nid = nid;
    this.token = localStorage.getItem("token");
    if (this.token == null){
      console.log("token lost");
    }
    this.update24hrData();
  }

  getLatest(field: string){
    if (!this._data) return -1;
    let latest = this._data.getLatestData();
    if ( !(field in latest) ) return -1;
    return latest[field];
  }

  update24hrData(){
    this.get24hrData().done(function(data){
      this._data = new timeBoxedData(data, 24);
    });
  }


  private get24hrData(_timestamp = null){
    if (_timestamp){
      return $.ajax({
        type: "POST",
        dataType: "json",
        url: this.base_url+"/api/nodes/prev_24h/"+this._nid,
        data: {api_token: this.token, timestamp: _timestamp }
      });
    }
    return $.ajax({
      type: "POST",
      dataType: "json",
      url: this.base_url+"/api/nodes/prev_24h/"+this._nid,
      data: {api_token: this.token}
    });
  };




}
