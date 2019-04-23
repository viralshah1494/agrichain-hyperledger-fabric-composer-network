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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Product', component: ProductComponent },
  { path: 'Shipment', component: ShipmentComponent },
  { path: 'OrderContract', component: OrderContractComponent },
  { path: 'Farmer', component: FarmerComponent },
  { path: 'APMC', component: APMCComponent },
  { path: 'EntryOperator', component: EntryOperatorComponent },
  { path: 'AssyingOperator', component: AssyingOperatorComponent },
  { path: 'SalesOperator', component: SalesOperatorComponent },
  { path: 'createProduct', component: createProductComponent },
  { path: 'sendProductDetails', component: sendProductDetailsComponent },
  { path: 'sendForEntry', component: sendForEntryComponent },
  { path: 'generateEntry', component: generateEntryComponent },
  { path: 'assayProduct', component: assayProductComponent },
  { path: 'salesApproval', component: salesApprovalComponent },
  { path: 'publishTransaction', component: publishTransactionComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
