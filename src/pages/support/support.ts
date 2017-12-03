import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the SupportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {

  currentImage = null;

  constructor(private camera: Camera, private emailComposer: EmailComposer) { }

  captureImage() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = imageData;
    }, (err) => {
      // Handle error
      console.log('Image error: ', err);
    });
  }

  sendEmail() {
    let email = {
      to: 'support@sslmobilecompany.com',
      cc: 'info@sslmobilecompany.com',
      bcc: 'bvumaml@sslmobilecompany.com',
      attachments: [
        this.currentImage
      ],
      subject: 'My Cool Image',
      body: 'Hey S, what do you thing about this image?',
      isHtml: true
    };

    this.emailComposer.open(email);
  }
}
