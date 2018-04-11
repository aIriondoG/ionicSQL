import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//Implementacion de sqlite
import { SQLite } from '@ionic-native/sqlite';
import { TasksServiceProvider } from '../providers/tasks-service/tasks-service';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public taskS: TasksServiceProvider,
    public sqlite: SQLite) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.createDatabase();
  }
  private createDatabase() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db) => {
        console.log(db);
        this.taskS.setDatabase(db);
        this.taskS.createTable();
      })
      .then(() => {
        console.log("-");
      })
      .catch(error => {
        console.error(error);
      })
  }
}

