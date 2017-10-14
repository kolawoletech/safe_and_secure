import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AuthPage } from './auth';

@NgModule({
	imports: [IonicModule],
  declarations: [
    AuthPage,
  ],
  exports: [
    AuthPage
  ],
  entryComponents: [
    AuthPage
  ]
})
export class AuthPageModule {}
