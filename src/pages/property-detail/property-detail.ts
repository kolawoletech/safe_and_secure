import {Component, ViewChild, ElementRef } from '@angular/core';
import {ActionSheetController, ActionSheet, NavController, NavParams, ToastController} from 'ionic-angular';
import {BrokerDetailPage} from '../broker-detail/broker-detail';
import {PropertyService} from '../../providers/property-service-rest';

declare var google;
var image = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
@Component({
    selector: 'page-property-detail',
    templateUrl: 'property-detail.html'
})
export class PropertyDetailPage {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    property: any;

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
        let posMaceio = { lat: this.property.lat, lng:this.property.long }
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          zoom: 12,
          center: posMaceio,
          mapTypeId: 'roadmap',
          icon: image
        });

        google.maps.event.addListener(this.map, 'click', (event) => {
          this.addMarker(event.latLng, this.map);

        });

    }

    addMarker(location, map) {
        let marker = new google.maps.Marker({
            position: location,
            map: map,
            animation: google.maps.Animation.DROP,
        });
    }

    openBrokerDetail() {
        this.navCtrl.push(BrokerDetailPage);
    }
}
