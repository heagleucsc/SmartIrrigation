import { Component } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  token = null;

  constructor() {
    this.token = localStorage.getItem("token");
    if (this.token == null){
      console.log("token lost");
    }
  }

  getSample(event){
    if (!this.token){
      console.log("Token not found");
      return;
    }
    console.log("Printing token");
    console.log(this.token);
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "https://slugsense.herokuapp.com/api/nodes/",
      data: {
        nid: 56
      },
      /*
      data: JSON.stringify([
        {api_token: this.token },
      ]),
      */  
      success: function(data){
        console.log(data);
      },
      error: function(err){
        console.log(err);
        console.log("failure");
      }
    });
  }
}
