import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.mynetwork{
   export enum ProductType {
      WHEAT,
      RICE,
   }
   export enum ShipmentStatus {
      INITIAL,
      NEW,
      GENERATED,
      VERIFIED,
      APPROVED,
      AVAILABLE,
      REJECTED,
   }
   export class Product extends Asset {
      productId: string;
      type: ProductType;
      quantity: number;
      owner: supplyChainMember;
   }
   export class Shipment extends Asset {
      shipmentId: string;
      trackingNumber: string;
      message: string;
      status: ShipmentStatus;
      owner: supplyChainMember;
      holder: supplyChainMember;
      contract: OrderContract;
      productExchanged: Product;
   }
   export class OrderContract extends Asset {
      orderId: string;
      buyer: supplyChainMember;
      seller: supplyChainMember;
      payOnArrival: boolean;
      arrivalDateTime: Date;
      paymentPrice: number;
   }
   export class Address {
      city: string;
      state: string;
      country: string;
      street: string;
      zip: string;
   }
   export abstract class supplyChainMember extends Participant {
      ID: string;
      firstName: string;
      lastName: string;
      email: string;
      accountBalance: number;
   }
   export class Farmer extends supplyChainMember {
   }
   export class APMC extends supplyChainMember {
   }
   export class EntryOperator extends supplyChainMember {
   }
   export class AssyingOperator extends supplyChainMember {
   }
   export class SalesOperator extends supplyChainMember {
   }
   export class createProduct extends Transaction {
      type: ProductType;
      quantity: number;
      farmer: Farmer;
   }
   export class sendProductDetails extends Transaction {
      product: Product;
      farmer: Farmer;
      apmc: APMC;
      arrivalDateTime: Date;
      shipmentId: string;
      trackingNumber: string;
      status: ShipmentStatus;
      orderId: string;
      payOnArrival: boolean;
      paymentPrice: number;
   }
   export class sendForEntry extends Transaction {
      shipment: Shipment;
      entryOperator: EntryOperator;
   }
   export class generateEntry extends Transaction {
      shipment: Shipment;
      assayOperator: AssyingOperator;
   }
   export class assayProduct extends Transaction {
      shipment: Shipment;
      salesOperator: SalesOperator;
   }
   export class salesApproval extends Transaction {
      shipment: Shipment;
      apmc: APMC;
   }
   export class publishTransaction extends Transaction {
      shipment: Shipment;
   }
// }
