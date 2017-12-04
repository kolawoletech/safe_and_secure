import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup  } from '@angular/forms';
import { ConfigurationService } from '../../providers/configuration-service';
import { MarketcloudService } from '../../providers/marketcloud-service';
import { OrderCompleteModalPage } from '../order-complete-modal/order-complete-modal';
import { EmailValidator } from '../../validators/email';
import { InAppBrowser } from '@ionic-native/in-app-browser';


/**
 * Generated class for the CheckoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  data :any;
  browser: any;
  step : number;
  cart : any = {items : []};
  currentStep : string;
  public address:any;
  addressForm: any;
  merchant_id: any;
  merchant_key: any;
  return_url: any;
  cancel_url: any;
  success_url: any;
  constructor(
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public configuration: ConfigurationService,
    public alertCtrl  :AlertController,
    public marketcloud: MarketcloudService,
    public formBuilder: FormBuilder,
    public http: Http,
    public iab: InAppBrowser
  ) {

    // Initial step counter
    this.step = 0;
    this.currentStep = "Address";
    this.merchant_id= "12217927";
    this.merchant_key= "ebp36hd9gs6u8";
    this.cancel_url="https://sslmobilecompany.com/payment-failure";
    this.success_url="https://sslmobilecompany.com/payment-failure";
    this.addressForm = formBuilder.group({
      full_name: [''],
      country:[''],
      state: [''],
      city: [''],
      postal_code: [''],
      email:[''],
      address1: ['']
    });
    // Available steps
    //"Address",
    //"Payment",
    //"Review"


    this.marketcloud.client.carts.getById(this.configuration.get('cart_id'))
    .then((response) => {
      this.cart = response.data;
    })
    .catch((error) =>{
      let alert = this.alertCtrl.create({
          title: 'Oops',
          subTitle: 'An error has occurred, unable to load order items.',
          buttons: ['Ok']
        });

        alert.present();
    })

  }



  onSubmit() {

  //  browser.executeScript({code: "(function() { alert(123); })()"});


  }

  validateAddress() {
    return true;
  }

  validatePayment() {
    return true;
  }


  proceedToNextStep() {

    if (this.currentStep === "Address") {
      this.currentStep = "Review";
      return;
    }

    if (this.currentStep === "Payment") {
      // We fetch the payment nonce from braintree

      // Lets get the submit button, its hidden for style purposes
      var btn : any = document.querySelector('input#submitButton');
      // trigger the click event
      btn.click();

      this.currentStep = "Review";

      return;

    }

    if (this.currentStep === "Review") {

    }
  }

  completeCheckout() {
      console.log(this.cart);
      console.log(this.cart.items['name']);
      if (true === this.validateAddress() && true === this.validatePayment()){

        let loading = this.loadingCtrl.create({
          content: "Completing checkout, please wait..."
        });

        loading.present();

        return this.marketcloud.client.orders.create({
          shipping_address :this.addressForm.value,
          billing_address : this.addressForm.value,
          cart_id : Number(this.configuration.get('cart_id'))
        })
        .then( (response) => {

          // Order was correctly created, we now handle the payment
          //var nonce = this.braintreeNonce;
          // Making the transaction
          return this.marketcloud.client.payments.create({
            method : 'PayFast',
            order_id : response.data.id,
            payment_method_id: 135405
          })
        })
        .then( (response) => {
          var pageContent = '<html><head></head><body><form id="loginForm" action="https://www.payfast.co.za/eng/process" method="post">' +
        '<input type="hidden" name="amount" value="' + this.cart.total + '">' +
        '<input type="hidden" name="merchant_id" value="' +this.merchant_id + '">' +
        '<input type="hidden" name="merchant_key" value="' + this.merchant_key + '">' +
        '<input type="hidden" name="return_url" value="' + this.success_url + '">' +
        '<input type="hidden" name="cancel_url" value="' + this.cancel_url + '">' +
        '<input type="hidden" name="name_first" value="' + this.addressForm.value["full_name"] + '">' +
        '<input type="hidden" name="email_address" value="' +this.addressForm.value["email"] + '">' +
        '<input type="hidden" name="item_name" value="' + this.cart.items['name'] + '">' +
        '<input type="hidden" name="item_description" value="' +  this.cart.items['description'] + '">' +
        '</form> <script type="text/javascript">document.getElementById("loginForm").submit();</script></body></html>';
        var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);
        var browser = this.iab.create(pageContentUrl, '_self', 'hidden=no,clearsessioncache=yes,clearcache=yes');
                    // Here you can move your user into the order complete view
            loading.dismiss();

            // The modal will show "Order complete"
            let myModal = this.modalCtrl.create(OrderCompleteModalPage);

            // Emptying the view stack
            this.navCtrl.popToRoot()
            .then( () => {
              myModal.present();
            })
            .catch( (error) => {
              console.log("An error has occurred while navigating back to the root view",error)
            })

         })
        .catch( (response) => {
          console.log("An error has occurred creating the order",response);
          loading.dismiss();
        })
      }
  }
}
