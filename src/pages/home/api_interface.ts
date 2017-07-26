import * as $ from 'jquery';


  // jQuery ajax calls //

/*
      HOW TO USE AJAX CALLS

    Ajax calls are asynchronous so they cannot change values of variables
    outside of its scope immediately. So, the data from the call should be
    used within the scope of the call like so:

    *nameOfAjaxCall*(*params*).done(*nameOfDataHandlingFunction*);

    There is no need to specify the parameters of the data handle function,
    as the data from the ajax call will be passed automatically as the input.
    The done() function is called once the server responds with the data and
    the specified data handling function is called.

    Heres an example that simply prints any data from the call to the console:

      this.getLatestNode(51).done(this.consoleLog);

    Both involved functions are defined below.

*/

export class serverApi{
  token;
  base_url;
  context;
  constructor(_context, token: string, url: string = "https://slugsense.herokuapp.com"){
    this.token = token;
    this.base_url = url;
  }
  get24hrData(nid, _timestamp = null){
    if (_timestamp){
      return $.ajax({
		    context: this.context,
        async:false,
        type: "POST",
        dataType: "json",
        url: this.base_url+"/api/nodes/prev_24h/"+nid.toString(),
        data: {api_token: this.token, timestamp: _timestamp }
      });
    };
    return $.ajax({
	    context: this.context,
      async: false,
      type: "POST",
      dataType: "json",
      url: this.base_url+"/api/nodes/prev_24h/"+nid.toString(),
      data: {api_token: this.token}
    });
  };

  getLatestNode(nid, isAsync: boolean = true){
    return $.ajax({
      type: "POST",
      async: isAsync,
      context: this.context,
      dataType: "json",
      url: this.base_url+"/api/nodes/"+nid.toString()+"/latest_reading",
      data: { api_token: this.token}
    });
  };

  // Unused
  getUserInfo() {
    return $.ajax({
      context: this.context,
      url: this.base_url + "/api/users/getuser",
      type:"POST",
      data: {api_token: this.token},
    });
  };

  getLatestAll(that) {
    return $.ajax({
      context: that,
      url: this.base_url + "/api/nodes/latest_readings/all",
      type:"POST",
      data: {api_token: this.token},
    })
  };
}