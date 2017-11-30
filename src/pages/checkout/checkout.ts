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



    this.address = this.formBuilder.group({
      full_name: [""],
      country:[""],
      state: [""],
      city: [""],
      postal_code: [""],
      email:[""],
      address1: [""]
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
      var pageContent = '<html><head></head><body><form id="loginForm" action="https://www.payfast.co.za/eng/process" method="post">' +
    '<input type="hidden" name="amount" value="' + this.cart.total + '">' +
    '<input type="hidden" name="merchant_id" value="' + this.cart.total + '">' +
    '<input type="hidden" name="merchant_key" value="' + this.cart.total + '">' +
    '<input type="hidden" name="return_url" value="' + this.cart.total + '">' +
    '<input type="hidden" name="notify_url" value="' + this.cart.total + '">' +
    '<input type="hidden" name="cancel_url" value="' + this.cart.total + '">' +
    '<input type="hidden" name="name_first" value="' + this.cart.total + '">' +
    '<input type="hidden" name="name_kast" value="' + this.cart.total + '">' +
    '<input type="hidden" name="email_address" value="' + this.cart.total + '">' +
    '<input type="hidden" name="cell_number" value="' + this.cart.total + '">' +
    '<input type="hidden" name="item_name" value="' + this.cart.total + '">' +
    '<input type="hidden" name="item_description" value="' + this.cart.total + '">' +
    '<input type="hidden" name="amount" value="' + this.cart.total + '">' +
    '<input type="hidden" name="amount" value="' + this.cart.total + '">' +
    '</form> <script type="text/javascript">document.getElementById("loginForm").submit();</script></body></html>';
    var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);
    alert(pageContentUrl);

    var browser = this.iab.create(pageContentUrl, '_self', 'hidden=no,clearsessioncache=yes,clearcache=yes');

    browser.executeScript({code: "(function() { alert(123); })()"});


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
    var that : any = this;
    var payfastIntegrationConfig : any = {
        id: "payment-form",
        hostedFields: {
          number: {
            selector: "#credit-card-number"
          },
          cvv: {
            selector: "#cvv"
          },
          expirationDate: {
            selector: "#expiration-date"
          },
          styles: {
            // Style all elements
            'input': {
               'background-color':'red',
              'font-size': '16px',
              'color': '#3A3A3A',
              'height':  '32px',
              'border' : '1px solid #ccc',

            },

            // Styling a specific field
            '.number': {
              'background-color':'red',
              'border' : '1px solid #ccc',
              'height':  '32px'
            },

            // Styling element state
            ':focus': {
              'color': 'blue'
            },
            '.valid': {
              'color': 'green'
            },
            '.invalid': {
              'color': 'red'
            }
          }
        },
        onPaymentMethodReceived : function(response) {
          // We received the nonce from Braintree
          // we store it into a class propertu
          that.braintreeNonce = response.nonce;
        }
      };
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
      // We validate the payment and the address

      //if validation returns true, then we create the order



    }



  }

  completeCheckout() {
      if (true === this.validateAddress() && true === this.validatePayment()){

        let loading = this.loadingCtrl.create({
          content: "Completing checkout, please wait..."
        });

        loading.present();

        return this.marketcloud.client.orders.create({

          shipping_address :this.address.value,
          billing_address : this.address.value,
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
