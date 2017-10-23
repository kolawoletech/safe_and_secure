import { Injectable } from '@angular/core';
import { MarketcloudService } from '../marketcloud-service';
import {StorageProvider} from '../storage-provider/storage-provider';
declare let Marketcloud:any;



@Injectable()
export class UserProvider {
 
  marketProvider :any;
  
  constructor(public storage:StorageProvider) {
    this.marketProvider = new Marketcloud.Client({
    	publicKey : '78007c41-7f1c-454e-8b1f-600c96fa24ba' // REPLACE WITH YOUR PUBLIC KEY
    });
  }

  

  isLoggedIn() {
    let user = this.storage.getObject('user');
    if(user) {
      return true;
    } else return false;
  }
  
  createUser(user) {
    let promise = new Promise((resolve, reject) => {
      console.log(user);
      this.marketProvider.users.create(user, (err, user) => {
        if(user) {
          resolve(user);
        } else {
          reject(err);
        }
      })
    });
    return promise;
  }

  authUser(user) {
    let promise = new Promise((resolve, reject) => {
        this.marketProvider.users.authenticate(user.email, user.password, (err, data) => {
          if(err) {
            reject(err);
          } else {
            resolve(data);
          }
        })
      });
     return promise;
  }

  logout() {
    this.storage.remove('user');
    Marketcloud.token = null;
    delete Marketcloud.user;
  }

getCurrentUser() {
  let promise = new Promise((resolve, reject) => {
      this.marketProvider.users.getCurrent((err, user) => {
        if(user) {
          resolve(user);
        } else {
          console.log(err);
          reject(err);
        }
      })
    });
    return promise;
  }
  
 getAddress() {
   let promise = new Promise((resolve, reject) => {
      this.marketProvider.addresses.list({},(err, address) => {
        console.log(err,address)
        if(address) {
          resolve(address);
        } else {
          reject(err);
        }
      })
   });
   return promise;
 }
 
 createAddress(address) {
   let promise = new Promise((resolve, reject) => {
     this.marketProvider.addresses.create(address, (err, address) => {
       if(address) {
         resolve(address);
       } else {
         reject(err);
       }
     });
   })
   
   return promise;
 }
 
}
