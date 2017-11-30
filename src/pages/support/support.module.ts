import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SupportPage } from './support';

@NgModule({
  declarations: [
    SupportPage,
  ],
  imports: [
    IonicModule.forChild(SupportPage),
  ],
  exports: [
    SupportPage
  ]
})
export class SupportPageModule {}
