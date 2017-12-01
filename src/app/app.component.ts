import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, ModalController } from 'ionic-angular';
import { StatusBar} from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { CartPage } from '../pages/cart/cart';
import { ProductsPage } from '../pages/products/products';
import { CategoriesPage } from '../pages/categories/categories';
import { PropertyListPage } from '../pages/property-list/property-list';
import { CleaningFormPage } from '../pages/cleaning-form/cleaning-form';
import { DeliveryFormPage } from '../pages/delivery-form/delivery-form';
import { MaintenanceFormPage } from '../pages/maintenance-form/maintenance-form';
import { SupportPage } from '../pages/support/support';
import { MarketcloudService } from '../providers/marketcloud-service';
import { ConfigurationService } from '../providers/configuration-service';
import { AppRate } from '@ionic-native/app-rate';

@Component({
  templateUrl: 'app.html',
  providers: [MarketcloudService, SplashScreen, StatusBar],
})
export class MyApp {
  myModal: any;

  @ViewChild(Nav) nav: Nav;

  rootPage: any = CategoriesPage;

  // We will prefix our Storage values with a unique namespace
  // This is because if you have several apps built on this template
  // they might clash using different Marketcloud API keys.
  //
  // With a namespace you can have any apps you want (as long as you have unique namespace)
  // so for example set this value to the app's name
  marketcloudAppNamespace: string = 'mcIonic2';

  pages: Array<{title: string, component: any}>;
  helpMenus: Array<{title: string, component: any}>;
  requestForms: Array<{title: string, component: any}>;

  constructor(
    public modalCtrl: ModalController,
    public platform: Platform,
    private configuration: ConfigurationService,
    private marketcloud: MarketcloudService,
    public storage: Storage,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    private appRate: AppRate,
    private alertCtrl: AlertController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.appRate.preferences = {
        openStoreInApp: false,
        displayAppName: 'SSL App',
        usesUntilPrompt: 5,
        promptAgainForEachNewVersion: false,
        storeAppURL: {
          android: 'market://details?id=com.ssl.newbietech'
        },
        customLocale: {
          title: 'Do you enjoy %@?',
          message: 'If you enjoy using %@, would you mind taking a moment to rate it? Thanks so much!',
          cancelButtonLabel: 'No, Thanks',
          laterButtonLabel: 'Remind Me Later',
          rateButtonLabel: 'Rate It Now'
        },
        callbacks: {
          onRateDialogShow: function(callback){
            console.log('rate dialog shown!');
          },
          onButtonClicked: function(buttonIndex){
            console.log('Selected index: -> ' + buttonIndex);
          }
        }
      };

      // Opens the rating immediately no matter what preferences you set
      this.appRate.promptForRating(false);
      // Object with references to pages
      this.pages = [
        { title: 'Home', component: ProductsPage },
        { title: 'Categories', component: CategoriesPage },
        { title: 'Cart', component: CartPage },
        { title: 'Real Estate', component: PropertyListPage }
      ];

      this.helpMenus = [
        { title: 'Support/Feedback', component: SupportPage },

      ];

      this.requestForms = [
        { title: 'Delivery', component: DeliveryFormPage },
        { title: 'Cleaning', component: CleaningFormPage },
        { title: 'Maintenance', component: MaintenanceFormPage }
      ];
      // Marketcloud
      // If we don't have a cart here, we create a cart and store the id into the
      // local storage
      this.storage.get(this.marketcloudAppNamespace+'_cart_id')
      .then((value) => {

        if (value === null){
          // If value is null then we don't have a cart_id in the storage

          // Then we don't have a cart and we must create one

          this.marketcloud.client.carts.create({})
          .then((response) => {

            // The cart was successfully created and returned by Marketcloud
            // We immediatly store the id in the device's storage.
            this.storage.set(this.marketcloudAppNamespace+'_cart_id',response.data.id)
            .then(() => {

              // Cart id successfully written on the Storage
              this.configuration.set('cart_id',response.data.id);

            })
          })
          .catch((error) => {
            //An error has occurred, since we were not able to create the cart
            // we show the error to the user. This is were we might want to create
            // a retry mechanism.

            let alert = this.alertCtrl.create({
              title: 'Oops',
              subTitle: 'Unable to load categories, please check your internet connection.',
              buttons: ['Ok']
            });

            alert.present();

          })
        } else {
          console.info("Using cart with id "+value);
          this.configuration.set('cart_id',value);
        }
      })
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openRequestForm(requestForm) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(requestForm.component);
  }

  openHelp(help) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(help.component);
  }
}
