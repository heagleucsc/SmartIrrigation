import * as moment from 'moment';

/*
Requirement that a data point has at least a timestamp and an id
*/
export interface nodeData_json{
  createdAt: string;
  id: any;
}

/*
nodeDatum is an immutable storage class for a single data point.
Should be used only by timeBoxedData
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

  getField(fieldname: string) {
    return this._data[fieldname]
  }
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




export class timeBoxedData{
  private _latestDate;
  private _data;
  private _earliestDate;
  constructor(data: nodeData_json[], hours: number, latestTime :string = null){
    this._data = {};
    if (!latestTime) this._latestDate = moment(); //now
    else this._latestDate = moment(latestTime, moment.ISO_8601);// "YYYY-MM-DD HH:mm:ss.SSSZ")
    this._earliestDate = this._latestDate.subtract(hours, 'hours');
    for (let datum of data) this.insertData(datum);
  };


  /* Public Data Access Functions */

  public getDataAsDict() {
    let dict: { [fieldName: string]: Object[]} = {};
    dict["time"] = [];
    let stamps:string[] = Object.keys(this._data);
    stamps.sort(this.dateCompare);
    dict["time"] = stamps;
    let params:string[] = ["humidity", "temperature", "moisture", "sunlight"];
    for(let param of params) {
      dict[param] = [];
    }
    for(let time of dict["time"]) {
      let datum: nodeDatum = this._data[<string>time];
      for(let param of params) {
        dict[param].push(datum.getField(param));
      }
    }
	/*Takes the array of time stamps and puts them in the correct format*/
	for(let i = 0; i < stamps.length; i++){
		//stamps[i] = this.formatTime(stamps[i]);
    let t1 = moment(stamps[i], moment.ISO_8601);
    stamps[i] = t1.format("h:mmA");

	}
	dict["time"] = stamps;
    return dict;
  };

  public getLatestData(){
    let stamps:string[] = Object.keys(this._data);
    stamps.sort(this.dateCompare);
    let latestTime = stamps[stamps.length-1];
    return this._data.latestTime;
  }

  /* Private functions */

  private insertData(datum: nodeData_json): void {
    let a = new nodeDatum(datum);
    if (this.withinTimeSpan(a.getDate())) {
      return;
    }
    this._data[a.getDate()] = a;
  };


  private withinTimeSpan(latestTime: string): boolean {
      let t = moment(latestTime, moment.ISO_8601);
      return this._earliestDate.isBefore(t)
                && !(t.isAfter(this._latestDate));
  };


  private dateCompare(a: string, b: string) {
    let t1 = moment(a, moment.ISO_8601);
    let t2 = moment(b, moment.ISO_8601);
    if(t1.isBefore(t2)) {
      return -1;
    }
    else if(t1.isSame(t2)) {
      return 0;
    }
    return 1;
  };

  /* Puts the timestamps into the correct format for the graph*/
  private formatTime(a:string){
	  if(a == null){
		  return a;
	  }
	  let start = a.indexOf("T") + 1;
	  let end = a.indexOf(":", start + 3);
	  let temp = a.substring(start,end);
	  return temp;
  }


}
