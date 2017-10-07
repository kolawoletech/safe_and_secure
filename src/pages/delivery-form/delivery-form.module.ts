import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DeliveryFormPage } from './delivery-form';

@NgModule({
  declarations: [
    DeliveryFormPage,
  ],
  exports: [
    DeliveryFormPage
  ],
  entryComponents: [
    DeliveryFormPage
  ]
})
export class DeliveryFormPageModule {}
