import { Component, ViewChild } from '@angular/core';

import { Events, Platform, MenuController, Nav } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = LoginPage;
  pages: Array<{title: string, component: any}>;
  nidList: Array<{nid: number}>;

  constructor(
    public events: Events,
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();
    events.subscribe('updateMenuNow', ()=>{
      this.updateMenu();
      console.log("menuUpdated")
    })
    // set our app's pages
    this.pages = [
      { title: 'Hello User', component: HomePage },
     // { title: 'My First List', component: ListPage }
    ];
  }

  updateMenu(){
    this.nidList = JSON.parse(localStorage.getItem("nids"));
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  navNid(pNid) {
    this.events.publish('changedNid', pNid);
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
