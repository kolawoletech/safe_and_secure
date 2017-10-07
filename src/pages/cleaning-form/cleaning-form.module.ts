import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CleaningFormPage } from './cleaning-form';

@NgModule({
	imports: [IonicModule],
  declarations: [
    CleaningFormPage,
  ],
  exports: [
    CleaningFormPage
  ],
  entryComponents: [
    CleaningFormPage
  ]
})
export class CleaningFormPageModule {}
