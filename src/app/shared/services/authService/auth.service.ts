import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    public afAuth: AngularFireAuth
  ){}
 
   doFacebookLogin(){
     return new Promise<any>((resolve, reject) => {
       let provider = new firebase.default.auth.FacebookAuthProvider();
       this.afAuth
       .signInWithPopup(provider)
       .then(res => {
        //  console.log("doFacebookLogin - res =>", res);
        //  console.log("userID", res.user.uid);
         resolve(res);
       }, err => {
         console.log("doFacebookLogin", err);
         reject(err);
       })
     })
   }
 
   doTwitterLogin(){
     return new Promise<any>((resolve, reject) => {
       let provider = new firebase.default.auth.TwitterAuthProvider();
       this.afAuth
       .signInWithPopup(provider)
       .then(res => {
         resolve(res);
       }, err => {
         console.log(err);
         reject(err);
       })
     })
   }
 
   doGoogleLogin(){
     return new Promise<any>((resolve, reject) => {
       let provider = new firebase.default.auth.GoogleAuthProvider();
       provider.addScope('profile');
       provider.addScope('email');
       this.afAuth
       .signInWithPopup(provider)
       .then(res => {
         resolve(res);
       }, err => {
         console.log(err);
         reject(err);
       })
     })
   }
 
   doRegister(value){
     return new Promise<any>((resolve, reject) => {
       firebase.default.auth().createUserWithEmailAndPassword(value.email, value.password)
       .then(res => {
         resolve(res);
       }, err => reject(err))
     })
   }
 
   doLogin(value){
     return new Promise<any>((resolve, reject) => {
       firebase.default.auth().signInWithEmailAndPassword(value.email, value.password)
       .then(res => {
         resolve(res);
       }, err => reject(err))
     })
   }
 
   doLogout(){
     return new Promise((resolve, reject) => {
       if(firebase.default.auth().currentUser){
         this.afAuth.signOut();
         resolve();
       }
       else{
         reject();
       }
     });
   }
  
}
