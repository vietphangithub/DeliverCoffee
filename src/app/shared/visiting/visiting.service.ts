import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from '@angular/fire/database'; // Firebase modules for Database, Data list and Single object

import { Visiting } from '../visiting/visiting';

@Injectable({
  providedIn: 'root'
})
export class VisitingService {
  listVisiting: AngularFireList<any>; // Reference to Student data list, its an Observable
  vistingObject: AngularFireObject<any>; // Reference to Student object, its an Observable too
  dateDDMMYYYY : string;

  constructor(public db: AngularFireDatabase) {
    this.dateDDMMYYYY = this.getForMatDateDDMMYYYY();
  }

  addSeat(visiting: Visiting) {
    this.listVisiting = this.db.list('/seat/' + visiting.coffeeID + '/' + this.dateDDMMYYYY) ;
    console.log('add seat', visiting);
    this.listVisiting.push({
      // $key:'111',
      userID: visiting.userID,
      coffeeID: visiting.coffeeID,
      cardCode: visiting.cardCode,
      visiting: visiting.visiting,
      status: visiting.status,

      dateFolder:this.dateDDMMYYYY,
      orderedDate: this.getCurrentDate(),
      ordereddBy: visiting.ordereddBy,
      doneDate: '',
      doneBy: ''
    });

  }

  getLastSeat(){
  
  }


  updateSeat(visiting: Visiting) {
   console.log('update:', visiting);
    this.db
      .object('/seat/' + visiting.coffeeID + '/' + visiting.dateFolder + '/' + visiting.$key)
      .update({
        cardCode: visiting.cardCode,
        visiting: visiting.visiting,
        status: visiting.status,
        doneDate: this.getCurrentDate(),
        doneBy: visiting.doneBy
      });
  }

  deleteSeat(visiting: Visiting) {
    this.db
      .object('/seat/' + visiting.coffeeID + '/' + visiting.dateFolder + '/' + visiting.$key)
      .remove();
  }

  GetListSeat(coffeeID, dateFolder) {
    this.listVisiting = this.db.list('seat/' + coffeeID + '/' + dateFolder);
    return this.listVisiting;
  }


  getCurrentDate() {
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' +today.getFullYear();
  
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime =  time + ' ' + date;

    return dateTime;
  }


  getForMatDateDDMMYYYY(){
    const dateObj = new Date();
    const month = dateObj.getMonth() + 1;
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();

    let formatYear =   year.toString() + month.toString() + day;
    return formatYear;


  }
}

