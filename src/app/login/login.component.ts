import { Component } from '@angular/core';
import {AuthService}  from '../shared/services/authService/auth.service'
import { Router, Params , ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';
  public coffeeID: string;
  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.coffeeID = this.route.snapshot.params.id;
    console.log('this.coffeeID', this.coffeeID);
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  tryFacebookLogin(){
    this.authService.doFacebookLogin()
    .then(res => {
      console.log("userID", res.user.uid);
      localStorage.setItem('seat-userID', res.user.uid); //Set Global
      localStorage.setItem('seat-coffeeID', this.coffeeID); //Set Global
      this.router.navigate(["/coffee-seat/", this.coffeeID]).then( (e) => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
    })
  }

  tryTwitterLogin(){
    // this.authService.doTwitterLogin()
    // .then(res => {
    //   this.router.navigate(['/user']);
    // })
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/user']);
    })
  }

  tryLogin(value){
    // this.authService.doLogin(value)
    // .then(res => {
    //   this.router.navigate(['/user']);
    // }, err => {
    //   console.log(err);
    //   this.errorMessage = err.message;
    // })
  }

}
