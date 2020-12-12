import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms'; // Reactive form services

import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.
import { CoffeeService } from '../../shared/coffee/coffee.service';
import { Coffee } from '../../shared/coffee/coffee';
import { Device } from '@ionic-native/device/ngx';
import FingerprintJS from '@fingerprintjs/fingerprintjs';


@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit {

  coffeeForm: FormGroup;
  public visitingTable: Coffee;
  public listVisiting: Coffee[];
  isAdd: boolean;
  @Input() deliverCoffee: Coffee; // decorate the property with @Input()

  constructor(

    public formBuilder: FormBuilder,
    public coffeeService: CoffeeService,
    public toastr: ToastrService,
    public device: Device,
  ) {
  }

  ngOnInit(): void {
    this.deliverCoffee = new Coffee;
    this.coffeeForm = this.formBuilder.group({
      $key: [''],
      // id: '',
      name: '',
      address: '',
      urlQR: '',
      createdDate: '',
      createdBy: '',
      updatedDate: '',
      updatedBy: '',
      status: '',
      ownerCoffee: '',
      phone: '',
      email: '',

    });
    this.isAdd = true;
  }

  getDataCoffee($event) {
    this.isAdd = false;
    console.log('$event', $event);
    this.coffeeService.getCoffee($event).valueChanges().subscribe(data => {
      console.warn('coffee', data);
      data['$key'] = $event;

      this.coffeeForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
    });
  }


  addCoffee(coffee){
    this.coffeeService.addCoffee(coffee);
    this.toastr.success(
      this.coffeeForm.controls['name'].value + ' successfully added!'
    );
    this.resetForm();
    this.isAdd = false;


  }

  resetForm() {
    this.coffeeForm.reset();
    this.isAdd = true;
  }
  
  updateCoffee(coffee){
    this.coffeeService.updateCoffee(coffee);
    this.toastr.success(
      this.coffeeForm.controls['name'].value + ' successfully updated!'
    );
    this.resetForm();
    this.isAdd = true;
  }
}
