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
 
    constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {
        this.slideOneForm = this.formBuilder.group({
            name: [''],
            phone: [''],
            address: [''],
            email: ['']
        });
        
        this.slideTwoForm = this.formBuilder.group({
            frequency: [''],
            specifications: [''],
            floors: ['']    
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