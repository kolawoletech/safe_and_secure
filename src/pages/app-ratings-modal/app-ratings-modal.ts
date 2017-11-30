import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , App, ViewController} from 'ionic-angular';
import {  } from 'ionic-angular';
/**
 * Generated class for the AppRatingsModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-app-ratings-modal',
  templateUrl: 'app-ratings-modal.html',
})
export class AppRatingsModalPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl : App,
    public viewCtrl : ViewController)
 {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppRatingsModalPage');
  }

}
