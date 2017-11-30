import { SupportPage } from './../pages/support/support';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
import { PropertyService } from '../providers/property-service-mock';
import { BrokerService } from '../providers/broker-service-mock';
import { UserProvider } from '../providers/user-provider/user-provider';
import { StorageProvider } from '../providers/storage-provider/storage-provider';
import { UtilProvider } from '../providers/util-provider/util-provider';

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
    SupportPage
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
    SupportPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigurationService,
    PropertyService,
    BrokerService, UserProvider, StorageProvider, InAppBrowser, UtilProvider,MarketcloudService
  ]
})
export class AppModule {}
