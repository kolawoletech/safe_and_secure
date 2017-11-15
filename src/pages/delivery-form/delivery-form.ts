import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder,  Validators } from '@angular/forms';
import { Slides } from 'ionic-angular';


import { IonicPage, NavController } from 'ionic-angular';
import { Http, Headers, Request, RequestMethod } from "@angular/http";

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



  mailgunUrl: string;
  mailgunApiKey: string;
  recipient: string;
  @ViewChild('deliverySlider') deliverySlider: Slides;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;
  slideThreeForm: FormGroup;

  submitAttempt: boolean = false;

constructor(public http: Http, public navCtrl: NavController, public formBuilder: FormBuilder) {
  this.http = http;
  this.mailgunUrl = "mg.sslmobilecompany.com";
  this.mailgunApiKey = window.btoa("api:key-e7cc4625ddf17e80d6c105cae11aaa18");
  this.recipient = "bookings@sslmobilecompany.com";

    this.slideOneForm = formBuilder.group({
        firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: [''],
        phone: ['']
    });

    this.slideTwoForm = formBuilder.group({
        address: [''],
        type: [''],
        frequency: [''],
        numberOfBedroomsDomestic: [''],
        numberOfBathroomsDomestic: [''],
        numberOfKitchensDomestic: [''],
        numberOfOtherRoomsDomestic: [''],
        numberOfLevelsDomestic: [''],

        numberOfRoomsOffice: [''],
        numberOfBathroomsOffice: [''],
        numberOfKitchensOffice: [''],
        numberOfLevelsOffice: [''],

        notes: ['']


    });

    this.slideThreeForm = formBuilder.group({
        flatRate: [''],
        firstServiceDate: ['']
    });
  }

  next(){
      this.deliverySlider.slideNext();
  }

  prev(){
      this.deliverySlider.slidePrev();
  }

  save(){

      this.submitAttempt = true;

      if(!this.slideOneForm.valid){
          this.deliverySlider.slideTo(0);
      }
      else if(!this.slideTwoForm.valid){
          this.deliverySlider.slideTo(1);
      }
      else if(!this.slideThreeForm.valid){
          this.deliverySlider.slideTo(2);
      }
      else {
          console.log("success!")
          console.log(this.slideOneForm.value);
          console.log(this.slideTwoForm.value);
          console.log(this.slideThreeForm.value);
      }

  }

  send(sender: string) {
      var requestHeaders = new Headers();
      let contentOne = JSON.stringify(this.slideOneForm.value);
      let contentTwo = JSON.stringify(this.slideTwoForm.value);
      let contentThree = JSON.stringify(this.slideThreeForm.value);
      requestHeaders.append("Authorization", "Basic " + this.mailgunApiKey);
      requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      this.http.request(new Request({
          method: RequestMethod.Post,
          url: "https://api.mailgun.net/v3/" + this.mailgunUrl + "/messages",
          body: "from="+sender+"+&to=" + this.recipient + "&subject=" + "Delivery Request" + "&text=" + contentOne +"<br>"+ contentTwo +"<br>"+ contentThree,
          headers: requestHeaders
      }))

      .subscribe(success => {
          console.log("SUCCESS -> " + JSON.stringify(success));
      }, error => {
          console.log("ERROR -> " + JSON.stringify(error));
      });
  }

}
