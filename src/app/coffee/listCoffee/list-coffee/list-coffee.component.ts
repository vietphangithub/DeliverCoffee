import { Component,OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr

import {Coffee} from '../../../shared/coffee/coffee';
import {CoffeeService} from '../../../shared/coffee/coffee.service';

@Component({
  selector: 'app-list-coffee',
  templateUrl: './list-coffee.component.html',
  styleUrls: ['./list-coffee.component.css']
})
export class ListCoffeeComponent implements OnInit {

  coffees : Coffee[];
  @Output() messageEvent = new EventEmitter<string>();
  constructor(
    public coffeeService : CoffeeService,
    public toastr: ToastrService

  ) { }

  ngOnInit(): void {
    let s = this.coffeeService.getListCoffee();
    s.snapshotChanges().subscribe(data => {
      // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.coffees = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.coffees.unshift(a as Coffee);
      });
    });

  }

  selectCoffee(coffee){
    console.log('select coffee:', coffee);
    this.sendDataCoffee(coffee.$key);
  }


  // This method raises the custom event. We will bind this
  // method to the change event of all the 3 radio buttons
 
  sendDataCoffee(key : string) {
    console.log('groupID = ', key);
    this.messageEvent.emit(key);
  }

}
