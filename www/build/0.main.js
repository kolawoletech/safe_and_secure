webpackJsonp([0],{

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__request_complete_modal__ = __webpack_require__(346);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestCompleteModalPageModule", function() { return RequestCompleteModalPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var RequestCompleteModalPageModule = (function () {
    function RequestCompleteModalPageModule() {
    }
    return RequestCompleteModalPageModule;
}());
RequestCompleteModalPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__request_complete_modal__["a" /* RequestCompleteModalPage */],
        ],
        imports: [],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__request_complete_modal__["a" /* RequestCompleteModalPage */]
        ]
    })
], RequestCompleteModalPageModule);

//# sourceMappingURL=request-complete-modal.module.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestCompleteModalPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the RequestCompleteModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var RequestCompleteModalPage = (function () {
    function RequestCompleteModalPage(appCtrl, viewCtrl, navCtrl, navParams) {
        this.appCtrl = appCtrl;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    RequestCompleteModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrderCompleteModalPage');
    };
    RequestCompleteModalPage.prototype.returnHome = function () {
        this.viewCtrl.dismiss();
    };
    return RequestCompleteModalPage;
}());
RequestCompleteModalPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Component */])({
        selector: 'page-request-complete-modal',template:/*ion-inline-start:"C:\Users\kolawole\Documents\freelance\Matimba\app\src\pages\request-complete-modal\request-complete-modal.html"*/'<!--\n  Generated template for the OrderCompleteModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n      <ion-title>Request Received</ion-title>\n    </ion-navbar>\n\n  </ion-header>\n\n\n  <ion-content padding style="text-align: center">\n  <ion-icon name="checkmark-circle" color="secondary" style="font-size:48px;"></ion-icon>\n  <h1 ion-text color="secondary">Wohooo!</h1>\n  <p>We received your request, we will get back to you, keep an eye on your inbox!</p>\n  </ion-content>\n\n  <ion-footer>\n    <ion-toolbar>\n\n        <button ion-button color="success" block (click)="returnHome()">\n          Awesome!\n        </button>\n\n    </ion-toolbar>\n  </ion-footer>\n'/*ion-inline-end:"C:\Users\kolawole\Documents\freelance\Matimba\app\src\pages\request-complete-modal\request-complete-modal.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* App */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
], RequestCompleteModalPage);

//# sourceMappingURL=request-complete-modal.js.map

/***/ })

});
//# sourceMappingURL=0.main.js.map