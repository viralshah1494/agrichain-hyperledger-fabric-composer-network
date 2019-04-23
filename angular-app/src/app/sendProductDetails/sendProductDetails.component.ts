/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { sendProductDetailsService } from './sendProductDetails.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-sendproductdetails',
  templateUrl: './sendProductDetails.component.html',
  styleUrls: ['./sendProductDetails.component.css'],
  providers: [sendProductDetailsService]
})
export class sendProductDetailsComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  product = new FormControl('', Validators.required);
  farmer = new FormControl('', Validators.required);
  apmc = new FormControl('', Validators.required);
  arrivalDateTime = new FormControl('', Validators.required);
  shipmentId = new FormControl('', Validators.required);
  trackingNumber = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  orderId = new FormControl('', Validators.required);
  payOnArrival = new FormControl('', Validators.required);
  paymentPrice = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private servicesendProductDetails: sendProductDetailsService, fb: FormBuilder) {
    this.myForm = fb.group({
      product: this.product,
      farmer: this.farmer,
      apmc: this.apmc,
      arrivalDateTime: this.arrivalDateTime,
      shipmentId: this.shipmentId,
      trackingNumber: this.trackingNumber,
      status: this.status,
      orderId: this.orderId,
      payOnArrival: this.payOnArrival,
      paymentPrice: this.paymentPrice,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicesendProductDetails.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the transaction field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.example.mynetwork.sendProductDetails',
      'product': this.product.value,
      'farmer': this.farmer.value,
      'apmc': this.apmc.value,
      'arrivalDateTime': this.arrivalDateTime.value,
      'shipmentId': this.shipmentId.value,
      'trackingNumber': this.trackingNumber.value,
      'status': this.status.value,
      'orderId': this.orderId.value,
      'payOnArrival': this.payOnArrival.value,
      'paymentPrice': this.paymentPrice.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'product': null,
      'farmer': null,
      'apmc': null,
      'arrivalDateTime': null,
      'shipmentId': null,
      'trackingNumber': null,
      'status': null,
      'orderId': null,
      'payOnArrival': null,
      'paymentPrice': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.servicesendProductDetails.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'product': null,
        'farmer': null,
        'apmc': null,
        'arrivalDateTime': null,
        'shipmentId': null,
        'trackingNumber': null,
        'status': null,
        'orderId': null,
        'payOnArrival': null,
        'paymentPrice': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.example.mynetwork.sendProductDetails',
      'product': this.product.value,
      'farmer': this.farmer.value,
      'apmc': this.apmc.value,
      'arrivalDateTime': this.arrivalDateTime.value,
      'shipmentId': this.shipmentId.value,
      'trackingNumber': this.trackingNumber.value,
      'status': this.status.value,
      'orderId': this.orderId.value,
      'payOnArrival': this.payOnArrival.value,
      'paymentPrice': this.paymentPrice.value,
      'timestamp': this.timestamp.value
    };

    return this.servicesendProductDetails.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
      this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  deleteTransaction(): Promise<any> {

    return this.servicesendProductDetails.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.servicesendProductDetails.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'product': null,
        'farmer': null,
        'apmc': null,
        'arrivalDateTime': null,
        'shipmentId': null,
        'trackingNumber': null,
        'status': null,
        'orderId': null,
        'payOnArrival': null,
        'paymentPrice': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.product) {
        formObject.product = result.product;
      } else {
        formObject.product = null;
      }

      if (result.farmer) {
        formObject.farmer = result.farmer;
      } else {
        formObject.farmer = null;
      }

      if (result.apmc) {
        formObject.apmc = result.apmc;
      } else {
        formObject.apmc = null;
      }

      if (result.arrivalDateTime) {
        formObject.arrivalDateTime = result.arrivalDateTime;
      } else {
        formObject.arrivalDateTime = null;
      }

      if (result.shipmentId) {
        formObject.shipmentId = result.shipmentId;
      } else {
        formObject.shipmentId = null;
      }

      if (result.trackingNumber) {
        formObject.trackingNumber = result.trackingNumber;
      } else {
        formObject.trackingNumber = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.orderId) {
        formObject.orderId = result.orderId;
      } else {
        formObject.orderId = null;
      }

      if (result.payOnArrival) {
        formObject.payOnArrival = result.payOnArrival;
      } else {
        formObject.payOnArrival = null;
      }

      if (result.paymentPrice) {
        formObject.paymentPrice = result.paymentPrice;
      } else {
        formObject.paymentPrice = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
      this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'product': null,
      'farmer': null,
      'apmc': null,
      'arrivalDateTime': null,
      'shipmentId': null,
      'trackingNumber': null,
      'status': null,
      'orderId': null,
      'payOnArrival': null,
      'paymentPrice': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
