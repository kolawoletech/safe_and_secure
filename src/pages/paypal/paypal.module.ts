import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { PaypalPage } from './paypal';

@NgModule({
	imports: [IonicModule],
	declarations: [
		PaypalPage
	],
	entryComponents: [
		PaypalPage
	],
	exports: [
		PaypalPage
	],	
})
export class PayPalModule {

}
