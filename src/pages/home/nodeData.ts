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
private class nodeDatum{
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

/* timeBoxedData
Main storage class for the JSON data.

-------------------

Constructor must be called via an array of Objects which contain
at least a createdAt and id field, as indicated in nodeData_json.
Constructor also takes an hours parameter, which indicates the 
range of timestamps allowed in the class.

The range of allowed time is calculated as such: 
    
    latestTime - hours < time <= latestTime


Any data point whos timestamp doesn't fit in the range is rejected
without throwing any errors.

-------------------

getDataAsDict() will be written to output data as such:

    dictionary<fieldname, array<number>>

where the arrays values indicate the value of the field indicated
by the fieldname. The dictionary must have an an ordered 'time' field.
Its index must correspond to the index of the field values of their
corresponding data point.

 
*/


class timeBoxedData{
  private _latestDate;
  private _data;
  private _earliestDate;
  constructor(data: nodeData_json[], hours: number, latestTime = null: string){
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