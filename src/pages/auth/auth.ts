import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController} from 'ionic-angular';
import { FormGroup, FormBuilder,  Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user-provider/user-provider';
import {UtilProvider} from '../../providers/util-provider/util-provider';
import {StorageProvider} from '../../providers/storage-provider/storage-provider';
/**
 * Generated class for the AuthPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  auth:string;
  loginForm: FormGroup;
  regForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public nav:NavController, 
    public form:FormBuilder, 
    public util: UtilProvider,
    public userProvider:UserProvider, 
    public storage: StorageProvider, 
    public events:Events,
    public toastCtrl: ToastController) {
        
    this.auth = 'login';
    this.form = form;
    this.loginForm = form.group({
       // email: ["",Validators.compose([Validators.required, validateEmail])],
        email: [''],
        password:[""]
    });
    
    this.regForm = form.group({
        name: [""],
        email: [''],
        password:[''],
    });
  }
  
  login(userData?) {
    // If User logins explicitly
    if(!userData) {
      userData = this.loginForm.value;
    } 

    this.userProvider.authUser(userData)
    .then((user)=> {
      this.storage.setObject('user', user);
      this.events.publish('user:logged_in');
      this.nav.pop();
    })
    .catch((error) => {
      let message = error.message;
      let toast = this.util.getToast(message);
      toast.present();
    });
  }
  
  register() {
    let user = this.regForm.value; 
    this.userProvider.createUser(user)
    .then(() => {
      delete user.name;
      this.login(user);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }
}
