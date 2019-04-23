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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ProductComponent } from './Product/Product.component';
import { ShipmentComponent } from './Shipment/Shipment.component';
import { OrderContractComponent } from './OrderContract/OrderContract.component';

import { FarmerComponent } from './Farmer/Farmer.component';
import { APMCComponent } from './APMC/APMC.component';
import { EntryOperatorComponent } from './EntryOperator/EntryOperator.component';
import { AssyingOperatorComponent } from './AssyingOperator/AssyingOperator.component';
import { SalesOperatorComponent } from './SalesOperator/SalesOperator.component';

import { createProductComponent } from './createProduct/createProduct.component';
import { sendProductDetailsComponent } from './sendProductDetails/sendProductDetails.component';
import { sendForEntryComponent } from './sendForEntry/sendForEntry.component';
import { generateEntryComponent } from './generateEntry/generateEntry.component';
import { assayProductComponent } from './assayProduct/assayProduct.component';
import { salesApprovalComponent } from './salesApproval/salesApproval.component';
import { publishTransactionComponent } from './publishTransaction/publishTransaction.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    ShipmentComponent,
    OrderContractComponent,
    FarmerComponent,
    APMCComponent,
    EntryOperatorComponent,
    AssyingOperatorComponent,
    SalesOperatorComponent,
    createProductComponent,
    sendProductDetailsComponent,
    sendForEntryComponent,
    generateEntryComponent,
    assayProductComponent,
    salesApprovalComponent,
    publishTransactionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
