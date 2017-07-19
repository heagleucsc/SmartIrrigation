import * as moment from 'moment';

/*
Requirement that a data point has at least a timestamp and an id
*/
interface nodeData_json{
  createdAt: string;
  id: any;
}

/*
nodeDatum is an immutable storage class for a single data point.
*/
class nodeDatum{
  private _date;
  private _id;
  private _data = {
    "humidity": null,
    "temperature": null,
    "moisture": null,
    "sunlight": null
  };
  constructor(data: nodeData_json){
    this._date = data.createdAt;
    this._id = data.id;
    if ("humidity" in this._data) 
      this._data["humidity"] = data["humidity"];
    if ("temperature" in this._data) 
      this._data["temperature"] = data["temperature"];
    if ("moisture" in this._data) 
      this._data["moisture"] = data["moisture"];
    if ("sunlight" in this._data) 
      this._data["sunlight"] = data["sunlight"];
  }

  getDate(){return this._date};
}

/*

*/

class  nodeData{
  _latestDate;
  _data;
  _count = 0;
  _max;
  constructor(data: nodeData_json[], dataSize: number){
    this._max = dataSize;
    for (let datum of data){
      let a = new nodeDatum(datum);
      this._data[a.getDate()] = a;
      this._count++;
    }
  }

  insertDatum(datum: nodeData_json){

  }
}

class timeBoxedData{
  _latestDate;
  _data;
  _earliestDate;
  constructor(data: nodeData_json[], hours: number, latestTime: string){
    if (!latestTime) this._latestDate = moment(); //now
    else this._latestDate = moment(latestTime, moment.ISO_8601);// "YYYY-MM-DD HH:mm:ss.SSSZ")    
    this._earliestDate = this._latestDate.subtract(hours, 'hours');
    for (let datum of data) this.insertData(datum);
  };

  private insertData(datum: nodeData_json): void {
    let a = new nodeDatum(datum);
    if (this.withinTimeSpan(a.getDate())) return;
    this._data[a.getDate()] = a;
  };

  private withinTimeSpan(latestTime: string): boolean {
      let t = moment(latestTime, moment.ISO_8601);
      return this._earliestDate.isBefore(t)
                && t.isBefore(this._latestDate);
  };

  public getDataAsDict() {

  }
}