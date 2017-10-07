import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
 
@Component({
  selector: 'page-home',
  templateUrl: 'cleaning-form.html'
})
export class CleaningFormPage {
 
    @ViewChild('cleaningSlider') cleaningSlider: any;
 
    slideOneForm: FormGroup;
    slideTwoForm: FormGroup;
 
    submitAttempt: boolean = false;
 
    constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {
        this.slideOneForm = this.formBuilder.group({

        });
        
        this.slideTwoForm = this.formBuilder.group({

        });     
    }
 
    next(){
        this.cleaningSlider.slideNext();
    }
 
    prev(){
        this.cleaningSlider.slidePrev();
    }
 
    save(){
 
    }
 
}