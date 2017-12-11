
import { SupportPage } from './../pages/support/support';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { EmailComposer } from '@ionic-native/email-composer';
import { ProductsPage } from '../pages/products/products';
import { CheckoutPage } from '../pages/checkout/checkout';
import { CategoriesPage } from '../pages/categories/categories';
import { OrderCompleteModalPage } from '../pages/order-complete-modal/order-complete-modal';
import { RequestCompleteModalPage } from '../pages/request-complete-modal/request-complete-modal';
import { Camera } from '@ionic-native/camera';
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
import { PropertyService } from '../providers/property-service-rest';
import { BrokerService } from '../providers/broker-service-mock';
import { StorageProvider } from '../providers/storage-provider/storage-provider';
import { UtilProvider } from '../providers/util-provider/util-provider';
import { AppRate } from '@ionic-native/app-rate';
import { MarketcloudService } from '../providers/marketcloud-service';

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
    SupportPage,
    RequestCompleteModalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
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
    SupportPage,
    RequestCompleteModalPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigurationService,
    PropertyService,
    AppRate,
    BrokerService, StorageProvider, InAppBrowser, UtilProvider,MarketcloudService, EmailComposer, Camera
  ]
})
export class AppModule {}
