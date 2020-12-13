import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from '@angular/fire/database'; // Firebase modules for Database, Data list and Single object

import { Seat } from '../../models/seat';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  listSeat: AngularFireList<any>; // Reference to Student data list, its an Observable
  vistingObject: AngularFireObject<any>; // Reference to Student object, its an Observable too
  dateDDMMYYYY : string;
  seatStr : string = 'seat';

  constructor(
    public db: AngularFireDatabase
    ) {
    
    this.dateDDMMYYYY = this.getForMatDateDDMMYYYY();
  }

  addSeat(seat: Seat) {
    this.listSeat = this.db.list('/'+ this.seatStr + '/' + seat.coffeeID + '/' + this.dateDDMMYYYY) ;
    console.log('add seat service', seat);
    this.listSeat.push({
      // $key:'111',
      userID: seat.userID,
      coffeeID: seat.coffeeID,
      cardCode: seat.cardCode,
      seatCode: seat.seatCode,
      status: seat.status,

      dateFolder:this.dateDDMMYYYY,
      orderedDate: this.getCurrentDate(),
      ordereddBy: seat.ordereddBy,
      doneDate: '',
      doneBy: ''
    });

    return this.listSeat;
  }


  updateSeat(seat: Seat) {
   console.log('update service:', seat);
    this.db
      .object('/'+ this.seatStr + '/' + seat.coffeeID + '/' + seat.dateFolder + '/' + seat.$key)
      .update({
        cardCode: seat.cardCode,
        seatCode: seat.seatCode,
        status: seat.status,
        doneDate: this.getCurrentDate(),
        doneBy: seat.doneBy
      });
  }

  deleteSeat(seat: Seat) {
    this.db
      .object('/'+ this.seatStr + '/' + seat.coffeeID + '/' + seat.dateFolder + '/' + seat.$key)
      .remove();
  }

  GetListSeat(coffeeID, dateFolder) {
    this.listSeat = this.db.list('seat/' + coffeeID + '/' + dateFolder);
    return this.listSeat;
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

