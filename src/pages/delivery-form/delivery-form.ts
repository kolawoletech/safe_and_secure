import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Request, RequestMethod } from "@angular/http";


/**
 * Generated class for the DeliveryFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-delivery-form',
  templateUrl: 'delivery-form.html',
})
export class DeliveryFormPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryFormPage');
  }

}
