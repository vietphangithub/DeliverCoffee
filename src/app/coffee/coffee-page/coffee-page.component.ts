import { Component,OnInit, Input, Output, EventEmitter } from '@angular/core';

import {CoffeeService} from '../../shared/coffee/coffee.service';
import {Coffee} from '../../shared/coffee/coffee';


@Component({
  selector: 'app-coffee-page',
  templateUrl: './coffee-page.component.html',
  styleUrls: ['./coffee-page.component.css']
})
export class CoffeePageComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();
  deliverCoffeeID:string;
  deliverCoffee : Coffee
  constructor(
    public coffeeService : CoffeeService
  ) { }

  ngOnInit(): void {
  }


  getDataCoffee($event) {
    this.sendDataCoffee($event);
  }

  sendDataCoffee(key : string) {
    this.GetCoffeeByID(key);
    this.deliverCoffeeID = key;

  }
  GetCoffeeByID(key : string){
    let coffeeObject = this.coffeeService.GetCoffee(key);
    
    coffeeObject.valueChanges().subscribe(data => {
      console.log("coffee", data);
      this.deliverCoffee = data;
    });
  }
}
