import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder,  Validators } from '@angular/forms';
import { Slides } from 'ionic-angular';

import { RequestCompleteModalPage } from '../request-complete-modal/request-complete-modal';

import { IonicPage,NavController, ModalController } from 'ionic-angular';
import { Http, Headers, Request, RequestMethod } from "@angular/http";



/*
  Generated class for the CleaningForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-cleaning-form',
  templateUrl: 'cleaning-form.html'
})
export class CleaningFormPage {


    mailgunUrl: string;
    mailgunApiKey: string;
    recipient: string;
    @ViewChild('cleaningSlider') cleaningSlider: Slides;

    slideOneForm: FormGroup;
    slideTwoForm: FormGroup;
    slideThreeForm: FormGroup;

    submitAttempt: boolean = false;

  constructor(public http: Http, public navCtrl: NavController, public formBuilder: FormBuilder, public modalCtrl: ModalController) {
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
        this.cleaningSlider.slideNext();
    }

    prev(){
        this.cleaningSlider.slidePrev();
    }

    save(){

        this.submitAttempt = true;

        if(!this.slideOneForm.valid){
            this.cleaningSlider.slideTo(0);
        }
        else if(!this.slideTwoForm.valid){
            this.cleaningSlider.slideTo(1);
        }
        else if(!this.slideThreeForm.valid){
            this.cleaningSlider.slideTo(2);
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
        requestHeaders.append("Accept", "/");
        requestHeaders.append("Access-Control-Allow-Credentials", "true");
        requestHeaders.append("Upgrade-Insecure-Requests","1");
        requestHeaders.append("withCredentials","true");
        requestHeaders.append("Access-Control-Allow-Origin","http://localhost:8100");
        requestHeaders.append("Access-Control-Allow-Credentials", "true");
        requestHeaders.append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        requestHeaders.append("Access-Control-Allow-Headers", "Content-Type,Authorization,Upgrade-Insecure-Requests");

        this.http.request(new Request({
            method: RequestMethod.Post,
            url: "https://api.mailgun.net/v3/" + this.mailgunUrl + "/messages",
            body: "from="+sender+"+&to=" + this.recipient + "&subject=" + "Cleaning Request" + "&text=" + contentOne +"<br>"+ contentTwo +"<br>"+ contentThree,
            headers: requestHeaders
        }))

            // The modal will show "Order complete"


        .subscribe(success => {
            console.log("SUCCESS -> " + JSON.stringify(success));
            let myModal = this.modalCtrl.create(RequestCompleteModalPage);
            this.navCtrl.popToRoot()
            .then( () => {
              myModal.present();
            })
            .catch( (error) => {
              console.log("An error has occurred while navigating back to the root view",error)
            })

        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    }

}