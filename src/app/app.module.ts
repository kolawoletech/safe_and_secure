import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { ReactiveFormsModule } from '@angular/forms'

import { ProductsPage } from '../pages/products/products';
import { CheckoutPage } from '../pages/checkout/checkout';
import { CategoriesPage } from '../pages/categories/categories';
import { OrderCompleteModalPage } from '../pages/order-complete-modal/order-complete-modal';
import { ItemPage } from '../pages/item/item';
import { CartPage } from '../pages/cart/cart';

import { BrokerListPage } from '../pages/broker-list/broker-list';
import { BrokerDetailPage } from '../pages/broker-detail/broker-detail';
import { FavoriteListPage } from '../pages/favorite-list/favorite-list';
import { PropertyDetailPage } from '../pages/property-detail/property-detail';
import { PropertyListPage } from '../pages/property-list/property-list';
import { RealEstatePage } from '../pages/real-estate/real-estate';

import { DeliveryFormPage } from '../pages/delivery-form/delivery-form';
import { MaintenanceFormPage } from '../pages/maintenance-form/maintenance-form';
import { CleaningFormPage } from '../pages/cleaning-form/cleaning-form';

import { ConfigurationService } from '../providers/configuration-service';
import { IonicStorageModule } from '@ionic/storage'
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BraintreeProvider } from '../providers/braintree/braintree';

import { PropertyService } from '../providers/property-service-mock';
import { BrokerService } from '../providers/broker-service-mock';
import { UserProvider } from '../providers/user-provider/user-provider';
import { StorageProvider } from '../providers/storage-provider/storage-provider';
import { PaypalProvider } from '../providers/paypal/paypal';
import { PayfastProvider } from '../providers/payfast/payfast';

import { UtilProvider } from '../providers/util-provider/util-provider';

import { PayPalModule } from '../pages/paypal/paypal.module';

import { MarketcloudService } from '../providers/marketcloud-service';
import { AuthPage } from '../pages/auth/auth';


@NgModule({
  declarations: [
    MyApp,
    ProductsPage,
    CategoriesPage,
    ItemPage,
    CartPage,
    CheckoutPage,
    OrderCompleteModalPage,
    BrokerListPage,
    BrokerDetailPage,
    FavoriteListPage,
    PropertyDetailPage,
    PropertyListPage,
    RealEstatePage,
    DeliveryFormPage,
    CleaningFormPage,
    MaintenanceFormPage,
    AuthPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    PayPalModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProductsPage,
    CategoriesPage,
    ItemPage,
    CartPage,
    CheckoutPage,
    OrderCompleteModalPage,
    BrokerListPage,
    BrokerDetailPage,
    FavoriteListPage,
    PropertyDetailPage,
    PropertyListPage,
    RealEstatePage,
    DeliveryFormPage,
    CleaningFormPage,
    MaintenanceFormPage,
    AuthPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigurationService, BraintreeProvider,
    PropertyService,
    BrokerService, UserProvider, StorageProvider, PaypalProvider, PayfastProvider, PayPal, UtilProvider,MarketcloudService
  ]
})
export class AppModule {}
