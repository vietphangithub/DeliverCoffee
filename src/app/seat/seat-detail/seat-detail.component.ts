import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms'; // Reactive form services
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.

import { SeatService } from '../../shared/services/seatService/seat.service';
import { Seat } from '../../shared/models/seat';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

@Component({
  selector: 'app-seat-detail',
  templateUrl: './seat-detail.component.html',
  styleUrls: ['./seat-detail.component.css']
})
export class SeatDetailComponent implements OnInit {
  frmInputSeat: FormGroup;
  public seatTable: Seat;
  public listSeat: Seat[];
  public isAdded: Boolean;
  public coffeeID: string;
  public userID:string;

  constructor(
    public _fb: FormBuilder,
    public _SeatService: SeatService,
    public _toastr: ToastrService,
    private route: ActivatedRoute,
  ) {
    // this.coffeeID = localStorage.getItem('seat-coffeeID');
    this.coffeeID = this.route.snapshot.params.id;
    console.log('this.coffeeID', this.coffeeID);
    // this.userID = localStorage.getItem('seat-userID'); //Set Global
   
  }
  ngOnInit(): void {
    this.seatTable = new Seat();
    this.isAdded = true;
    this.frmInputSeat = this._fb.group({
      $key: [''],
      userID: 0,
      coffeeID: this.coffeeID, 
      dateFolder: this._SeatService.dateDDMMYYYY,
      cardCode: '',
      seatCode: '',
      status: 0,
      orderedDate: '',
      ordereddBy: '',
      doneDate: '',
      doneBy: ''
    });

    this.GetDeviceID();
  }

  onAddSeat(seat) {
    let s = this._SeatService.addSeat(seat);
    console.log('add seat', seat);
    s.snapshotChanges().subscribe(data => {
      // Using snapshotChanges() method to retrieve list of data along with metadata($key)
   
      data.forEach(item => {
        let a = item.payload.toJSON();
        if(a['status'] == 0 
        && a['userID'] == seat.userID){
          // a['$key'] = item.key;
          this.frmInputSeat.controls['$key'].setValue(item.key);
          console.log('keyID = ', this.frmInputSeat.controls['$key'].value);

        }
      });
    });
    // this.ResetForm();
    this._toastr.success(
      this.frmInputSeat.controls['cardCode'].value + ' successfully added!'
    );
    this.isAdded = false;
  }

  updateSeat(seat){
    this._SeatService.updateSeat(seat);
    console.log('update  seat', seat);
    // this.ResetForm();
    this._toastr.success(
      this.frmInputSeat.controls['cardCode'].value + ' successfully added!'
    );
    this.isAdded = false;
  }

  ResetForm() {
    this.frmInputSeat.reset();
  }

  GetDeviceID() {
    (async () => {
      // We recommend to call `load` at application startup.
      const fp = await FingerprintJS.load();

      // The FingerprintJS agent is ready.
      // Get a visitor identifier when you'd like to.
      const result = await fp.get();

      // This is the visitor identifier:
      console.log('result', result);
      console.log('GetDeviceID', result.visitorId);
      this.frmInputSeat.controls['userID'].setValue(result.visitorId.toString());
      this.frmInputSeat.controls['ordereddBy'].setValue(result.visitorId.toString());

      return result.visitorId.toString();
    })();
  }
}
