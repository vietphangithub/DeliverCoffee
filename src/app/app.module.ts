import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
// Import below modules for NGX Toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Firebase

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
// import { AngularFireModule } from 'angularfire2';




// Component
import { AppComponent } from './app.component';
import { SeatDetailComponent } from './seat/seat-detail/seat-detail.component';
import { CoffeeComponent } from './coffee/coffee/coffee.component';
import { ListCoffeeComponent } from './coffee/listCoffee/list-coffee/list-coffee.component';
import { CoffeePageComponent } from './coffee/coffee-page/coffee-page.component';
import { ListSeatComponent } from './seat/list-seat/list-seat.component';
import { ListSeatDoneComponent } from './seat/list-seat-done/list-seat-done.component';
import { LoginComponent } from './login/login.component';


import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { Device } from '@ionic-native/device/ngx';



// Service

@NgModule({
  declarations: [
    AppComponent,
    SeatDetailComponent,
    CoffeeComponent,
    ListCoffeeComponent,
    CoffeePageComponent,
    ListSeatComponent,
    ListSeatDoneComponent,
    LoginComponent,
    // LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireStorageModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    Device
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
