import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';

import { MarketcloudService } from '../../providers/marketcloud-service';

import { ProductsPage } from '../products/products';
import { CleaningFormPage } from '../cleaning-form/cleaning-form';
import { MaintenanceFormPage } from '../maintenance-form/maintenance-form';
import { DeliveryFormPage } from '../delivery-form/delivery-form';
/*
  Generated class for the Categories page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
  providers: [],
  entryComponents: [ProductsPage]
})
export class CategoriesPage {

  categories: Array<any>;
  forms: Array<{title: string, component: any}>;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private marketcloud: MarketcloudService,
      private alertCtrl: AlertController) {

        this.forms = [
          { title: 'Delivery', component: DeliveryFormPage },
          { title: 'Cleaning', component: CleaningFormPage },
          { title: 'Maintenance', component: MaintenanceFormPage },

        ];
    marketcloud.client.categories.list()
    .then((response) => {
      this.categories = response.data;
    })
    .catch((error) => {
      let alert = this.alertCtrl.create({
          title: 'Oops',
          subTitle: 'Unable to load categories, please check your internet connection.',
          buttons: ['Ok']
        });

        alert.present();
    })

  }

  showProductsInCategory(category) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ProductsPage, {
      query : {
        category_id : category.id
      }
    });
  }
  goToForm(form){
    this.navCtrl.push(form.component);
  }
}
