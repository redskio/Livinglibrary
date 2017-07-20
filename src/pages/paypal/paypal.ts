import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from 'ionic-native';


/**
 * Generated class for the PaypalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-paypal',
  templateUrl: 'paypal.html',
})
export class PaypalPage {
  payment: PayPalPayment = new PayPalPayment('10.10', 'USD', 'TV', 'sale');
	currencies = ['KOR', 'USD'];
	payPalEnvironment: string = 'payPalEnvironmentSandbox';

	makePayment() {
    var payPalEnvironmentSandbox = 'AbpxqNgj4BrH8zSOKWVCacFYatJuAujMh2TtwmzRD9kI5QY5Wdog2575tu58wNPwL4J0Z8lY88kVRkHZ';
	  var payPalEnvironmentProduction = 'AdM032KL1Wc4WXxzcc7eRPp1Xn8Pz-gMC3BngHejDbiisgzMy82KAFGZD9YRmzAghqP_i1noe7Z0doKA';
		PayPal.init({
			PayPalEnvironmentProduction: payPalEnvironmentProduction,
			PayPalEnvironmentSandbox: payPalEnvironmentSandbox
		}).then(() => {
			PayPal.prepareToRender(this.payPalEnvironment, new PayPalConfiguration({})).then(() => {
				PayPal.renderSinglePaymentUI(this.payment).then((response) => {
					alert(`Successfully paid. Status = ${response.response.state}`);
					console.log(response);
				}, () => {
					console.error('Error or render dialog closed without being successful');
				});
			}, () => {
				console.error('Error in configuration');
			});
		}, () => {
			console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
		});
	}
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

}
