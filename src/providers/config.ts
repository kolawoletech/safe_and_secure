import { Injectable } from '@angular/core';

@Injectable()
export class Config {
	static SERVER_URL = "http://localhost:5000/";
	// Paypal
	static payPalEnvironmentSandbox = 'AXg409-ZD7lFcgk2JdHkLkggX8u7LnT7cfkGL2AG0y7bx5OAvOmErpKKz5D68kzXRxbfe_KRlFf681rk';
	static payPalEnvironmentProduction = '';
}