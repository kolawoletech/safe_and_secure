import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App, ViewController } from 'ionic-angular';

/**
 * Generated class for the RequestCompleteModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-request-complete-modal',
  templateUrl: 'request-complete-modal.html',
})
export class RequestCompleteModalPage {

  constructor(
    public appCtrl : App,
    public viewCtrl : ViewController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderCompleteModalPage');
  }

  returnHome() {
    this.viewCtrl.dismiss()
  }
}
