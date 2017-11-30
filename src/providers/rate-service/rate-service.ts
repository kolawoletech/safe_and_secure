import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppRate } from '@ionic-native/app-rate';
import { Platform } from 'ionic-angular';

/*
  Generated class for the RateServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RateService {
  appRate: any = AppRate;
  constructor(public platform: Platform) {
    this.platform.ready().then(
       () => {
         this.appRate.preferences= {
           storeAppURL: {
             ios: '849930087',
             android: 'market://details?id=com.kolawoletech.ssl'
           },
           usesUntilPrompt: 2,
           customLocale: {
             title: 'Rate Us... Pretty Please?',
             message: 'Without ratings we starve =(',
             cancelButtonLabel: 'Pass',
             rateButtonLabel: 'Rate it!',
             laterButtonLabel: 'Ask Later'
           }
         }
       }
     )
   }
}
