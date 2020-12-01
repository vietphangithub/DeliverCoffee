import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms'; // Reactive form services
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.

import { VisitingService } from '../../shared/visiting/visiting.service';
import { Visiting } from '../../shared/visiting/visiting';

@Component({
  selector: 'app-seat-detail',
  templateUrl: './seat-detail.component.html',
  styleUrls: ['./seat-detail.component.css']
})
export class SeatDetailComponent implements OnInit {
  frmInputVisiting: FormGroup;
  public visitingTable: Visiting;
  public listVisiting: Visiting[];
  public isAdded: Boolean;
  public coffeeID: string;
  public userID : string

  constructor(
    public _fb: FormBuilder,
    public _visitingService: VisitingService,
    public _toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    // this.coffeeID = localStorage.getItem('seat-coffeeID');
    this.coffeeID = this.route.snapshot.params.id;
    console.log('this.coffeeID', this.coffeeID);

    // this.userID = localStorage.getItem('seat-userID'); //Set Global
    this.userID = '3';
    console.log('seat-userID',this.userID);

  }
  ngOnInit(): void {
    this.visitingTable = new Visiting();
    this.isAdded = true;
    this.frmInputVisiting = this._fb.group({
      $key: [''],
      userID: this.userID,
      coffeeID: this.coffeeID,
      cardCode: '',
      visiting: '',
      status: 0,
      orderedDate: '',
      ordereddBy: '1',
      doneDate: '',
      doneBy: '1'
    });
  }

  onAddVisiting(value) {
    this._visitingService.AddVisiting(value);
    console.log('add coffeeID', this.coffeeID);
    // this.ResetForm();
    this._toastr.success(
      this.frmInputVisiting.controls['cardCode'].value + ' successfully added!'
    );
    this.isAdded = false;
  }

  updateSeat(seat){
    alert(seat);
    console.log('seat',seat);
  }

  ResetForm() {
    this.frmInputVisiting.reset();
  }
}
