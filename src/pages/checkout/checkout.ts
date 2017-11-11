import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup  } from '@angular/forms';
import { ConfigurationService } from '../../providers/configuration-service';
import { MarketcloudService } from '../../providers/marketcloud-service';
import { OrderCompleteModalPage } from '../order-complete-modal/order-complete-modal';
import { EmailValidator } from '../../validators/email';


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
  step : number;
  customer : any;

  cart : any = {items : []};

  currentStep : string;
  public address:any;
  braintreeNonce : string;

  constructor(
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public configuration: ConfigurationService,
    public alertCtrl  :AlertController,
    public marketcloud: MarketcloudService,
    public formBuilder: FormBuilder
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
  logForm(){
    console.log(this.address.value)
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
        console.log(this.address);
        this.customer = this.address.value;
        console.log(this.customer);
        return this.marketcloud.client.orders.create({

          shipping_address : this.customer,
          billing_address : this.customer,
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
