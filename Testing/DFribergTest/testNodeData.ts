import * as SUT from '../src/pages/home/node_data';
import * as moment from "moment";

/* Unit test for timeBoxedData class - Daniel Friberg*/
/*
dependancies:
  moment.js
fields:
  _latestDate: moment;
  _earliestDate: moment;
  _data: {key=timestamp: value:nodeDatum}

nodeDatum is a single unit of data with at least
a timestamp called "_date" and a unique id _id.
_id is a number, timestamp is a string in ISO_8601 form

Purpose:
  1.Make sure any nodeDatum inserted into class
    has a timestamp between _latestDate and _earliestDate. 
  2. Output data in dict of array of number form, with ordered
    data from a single nodeDatum correlated by a single index

Similar tests were done with no data, all null *except createdAt and id,
all non null data, 

Time limits functioned as needed.
This class is used to store data in user_data and is kept in this format as it
is easy to modify. When needed, this getDataAsDict is called to return data
in a format usable by the visualization, which requires arrays to be inserted
into the axis variables.

Data was verified by comparison of graph with raw JSON data printed onto console logs
Although this class is very flexible, its flexibility also allows null values to be
inserted into the graphs, which functions as intended until more intensive visualization
is added to the graph, like a gradiance that falls from the data point.

*/
let hour_range = 24;
class testTimeBoxedData{
  dataProvider: stubAPI;
  constructor(){};
  testTimeBox(): boolean{
    this.dataProvider = new stubAPI();
    let data = this.dataProvider.sampleData();
    let pass = false;
    // Constructor both sets up and does the time range limitation work
    let timeBox = new SUT.timeBoxedData(hour_range, "2017-04-22T21:22:27.699Z");
    let arrayDicts = timeBox.getDataAsDict();
    
    //Verify
    let pass = (
      "time" in arrayDicts &&
      arrayDicts["time"].length == 2 &&
      arrayDicts["time"][0] == "2017-04-22T21:22:27.699Z" &&
      arrayDicts["humidity"][0] == 2 &&
      arrayDicts["time"][1] = "2017-04-21T22:52:27.699Z"
      arrayDicts["humidity"][1] == 1
    )
    // No de-setup needed
    return pass;
  }
}

class stubAPI{
  constructor();
  this.dataProvider.sampleData(){
    let item1 = {
      createdAt: "2017-04-21T20:52:27.699Z",
      id: 1,
      humidity: 1
    }
    let item2 = {
      createdAt: "2017-04-21T21:52:27.699Z",
      id: 2,
      humidity: 2,
    }
    let item3 = {
      createdAt: "2017-04-21T22:52:27.699Z",
      id: 3,
      humidity: 1,
    }
    return {item1,item2,item3};
  }
}

// Runner
test = new testTimeBoxedData();
console.log(test.testTimeBox);