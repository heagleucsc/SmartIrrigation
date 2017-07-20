import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//---------------
export class User {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
//test data using hardcoded values, backend calls should replace them later
export class AuthService {

  //default constractor
    // constructor(public http: Http) {
    //   console.log('Hello AuthServiceProvider Provider');
    // }

  currentUser: User;

 //observables will be replaced with http calls later on
  public login(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // here make a request to the backend to make a real check!
        //later on perfom a backend request and store the token
        let access = (credentials.password === "pass" && credentials.username === "user");
        this.currentUser = new User('SlugSense', 'pass');
        observer.next(access);
        observer.complete();
      });
    }
  }

 //new user function
  public register(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
