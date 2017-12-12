import {Component, ViewChild, ElementRef } from '@angular/core';
import {ActionSheetController, ActionSheet, NavController, NavParams, ToastController} from 'ionic-angular';
import {BrokerDetailPage} from '../broker-detail/broker-detail';
import {PropertyService} from '../../providers/property-service-rest';

declare var google;

@Component({
    selector: 'page-property-detail',
    templateUrl: 'property-detail.html'
})
export class PropertyDetailPage {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    property: any;
    labels: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    labelIndex = 0;

    polylines: Array<object> = [];

    constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public propertyService: PropertyService, public toastCtrl: ToastController) {
        this.property = this.navParams.data;
        console.log(this.property);
        propertyService.findById(this.property._id).then(
            property => this.property = property
        );
    }

    ionViewDidLoad() {
        // start my map
        this.startMap();
    }

    startMap() {
        let posMaceio = { lat: -9.616139, lng: -35.817239 }
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          zoom: 12,
          center: posMaceio,
          mapTypeId: 'roadmap'
        });

        google.maps.event.addListener(this.map, 'click', (event) => {
          this.addMarker(event.latLng, this.map);

        });

    }

    addMarker(location, map) {
        let marker = new google.maps.Marker({
            position: location,
            label: this.labels[this.labelIndex++ % this.labels.length],
            map: map
        });
    }


    openBrokerDetail(broker) {
        this.navCtrl.push(BrokerDetailPage, broker);
    }

    favorite(property) {
        this.propertyService.favorite(property)
            .then(property => {
                let toast = this.toastCtrl.create({
                    message: 'Property added to your favorites',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast);
            });
    }

    share(property) {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: 'Share via',
            buttons: [
                {
                    text: 'Twitter',
                    handler: () => console.log('share via twitter')
                },
                {
                    text: 'Facebook',
                    handler: () => console.log('share via facebook')
                },
                {
                    text: 'Email',
                    handler: () => console.log('share via email')
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => console.log('cancel share')
                }
            ]
        });

        actionSheet.present();
    }

}
