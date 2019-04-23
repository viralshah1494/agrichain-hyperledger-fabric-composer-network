function generateProductId(type, farmer){
	var type = arguments[0];
  	var farmer = arguments[1];
  	var min = 1
    var max = 1000
  	var random = Math.floor(Math.random() * (+max - +min)) + +min; 
    var today = new Date();
  	var res =  "P" + random + farmer.slice(1) + type.slice(0,2) + today.getDate() + today.getMonth() + today.getFullYear() ;
    return res;
}

function generateRandom(min,max){
	var random = Math.floor(Math.random() * (+max - +min)) + +min;
  	return random;
}

/**
 * Send Product Details Transaction
 * @param {org.example.mynetwork.createProduct} productTx - Specifies product to be created
 * @transaction
*/

async function createProduct(productTx){
	
  	var factory = getFactory();
  	var productId = generateProductId(productTx.type,productTx.farmer.ID);
  	var product = factory.newResource('org.example.mynetwork', 'Product',productId);
  
  
  	product.type = productTx.type;
  	product.quantity = productTx.quantity;
  	product.owner = productTx.farmer;
  	let assetRegistry = await getAssetRegistry('org.example.mynetwork.Product');
  	await assetRegistry.add(product);
}

async function CreateShipmentAndContractAuxiliar(shipmentAndContract) {
    var factory = getFactory();
    var shipment = factory.newResource('org.example.mynetwork', 'Shipment', shipmentAndContract.shipmentId);
    var contract = factory.newResource('org.example.mynetwork', 'OrderContract', shipmentAndContract.orderId);
    
    
    //MANDATORY SHIPMENT PARAMETERS
    shipment.shipmentId = shipmentAndContract.shipmentId;
    shipment.trackingNumber = shipmentAndContract.trackingNumber;
    shipment.message = shipmentAndContract.message;
    shipment.owner = shipmentAndContract.farmer;
    shipment.holder = shipmentAndContract.apmc;
    shipment.productExchanged = shipmentAndContract.product;
    //OPTIONAL SHIPMENT PARAMETERS
    if (shipmentAndContract.status != '' && shipmentAndContract.status != null) {
        shipment.status = shipmentAndContract.status;
    }
    else {
        shipmentAndContract.status = 'NEW';
    }

    if (shipmentAndContract.message == '' || shipmentAndContract.message == null) {
        shipmentAndContract.message = '';
    }else{
        shipment.message = shipmentAndContract.message;
    }
  
    //MANDATORY CONTRACT PARAMETERS
    
    console.log("Contract: " + contract);
    contract.orderId = shipmentAndContract.orderId;
    contract.buyer = shipmentAndContract.apmc;
    contract.seller = shipmentAndContract.farmer;
    contract.arrivalDateTime = shipmentAndContract.arrivalDateTime;
    contract.payOnArrival = shipmentAndContract.payOnArrival;
    contract.paymentPrice = shipmentAndContract.paymentPrice;
   
    shipment.contract = contract;

  	let assetRegistry = await getAssetRegistry('org.example.mynetwork.OrderContract');
  	await assetRegistry.add(contract);
  
  	assetRegistry = await getAssetRegistry('org.example.mynetwork.Shipment');
  	await assetRegistry.add(shipment);
    
   
}


async function supplyMemberExists(supplyChainMember){
  

    if(supplyChainMember === undefined){
        return false;
    }
    
    var memberID = supplyChainMember.getIdentifier();
    var memberType = supplyChainMember.getType();

    if(memberID === undefined || memberID == '' || memberID === null ){
        return false;
    }else{
        return getParticipantRegistry('org.example.mynetwork.' + memberType)
        .then(function (participantRegistry) {
        // Determine if the specific driver exists in the driver participant registry.
        return participantRegistry.exists(memberID);
        })
        .then(function (exists) {
        // Process the the boolean result.
        return exists;
        })
        .catch(function (error) {
        // Add optional error handling here.
        });
    }
}

/**
 * Send Product Details Transaction
 * @param {org.example.mynetwork.sendProductDetails} shipmentAndContract - Create the shipment and the order
 * @transaction
*/

async function sendProductDetails(shipmentAndContract){
	
  	return supplyMemberExists(shipmentAndContract.farmer).then(function(exists){
        console.log("Exists? " + exists);
        if (!exists)
            throw 'Farmer does not exist.'
        else   
            return supplyMemberExists(shipmentAndContract.apmc);
    }).then(function(exists){
        console.log("Exists? " + exists);
        if (!exists)
            throw 'APMC does not exist.' 
    }).then(function(exists){
        // Check if shipment owner is also the owner of all the assets
        
        
        if (shipmentAndContract.product.owner.ID != shipmentAndContract.farmer.ID) {
        	throw 'The shipment owner is not the owner of the product in the shipment (check if all the commodities exist).';
     	}
        
		
        //Checking that the actual arrival date is AFTER the current date
        var now = new Date();
        if (shipmentAndContract.arrivalDateTime <= now) {
            throw 'Arrival Date is set to before the current date.';
        }
        
        console.log("before creating");
        //after all the checks
        CreateShipmentAndContractAuxiliar(shipmentAndContract);

        //return getAssetRegistry('org.example.mynetwork.Shipment')
    
    });   
}

/**
 * Send Product Details Transaction
 * @param {org.example.mynetwork.sendForEntry} shipmentTx - Create the shipment and the order
 * @transaction
*/

async function sendForEntry(shipmentTx){
  
  	var shipment = shipmentTx.shipment
	return supplyMemberExists(shipment.owner).then(function(exists){
    	console.log("Exists? " + exists);
        if (!exists)
            throw 'Farmer does not exist.'
        else   
            return supplyMemberExists(shipment.holder)
    }).then(function(exists){
    	if(!exists)
          	throw 'APMC does not exist.'
      	else
          	return supplyMemberExists(shipmentTx.entryOperator)
    }).then(async function(exists){
    	if(!exists)
          	throw 'Entry Operator does not exist.'
      	else{
			shipment.holder = shipmentTx.entryOperator
          	shipment.status = 'NEW';
          
          	const shipmentAssetRegistry = await getAssetRegistry('org.example.mynetwork.Shipment');
			await shipmentAssetRegistry.update(shipment);
        }
          	
    });
}


/**
 * Send Product Details Transaction
 * @param {org.example.mynetwork.generateEntry} shipmentTx - Create the shipment and the order
 * @transaction
*/

async function generateEntry(shipmentTx){
  
  	var shipment = shipmentTx.shipment
	return supplyMemberExists(shipment.owner).then(function(exists){
    	console.log("Exists? " + exists);
        if (!exists)
            throw 'Farmer does not exist.'
        else   
            return supplyMemberExists(shipment.holder)
    }).then(function(exists){
    	if(!exists)
          	throw 'APMC Operator does not exist.'
      	else
          	return supplyMemberExists(shipmentTx.assayOperator)
    }).then(async function(exists){
    	if(!exists)
          	throw 'Assaing Operator does not exist.'
      	else{
			shipment.holder = shipmentTx.assayOperator
          	shipment.status = 'GENERATED';
          
          	const shipmentAssetRegistry = await getAssetRegistry('org.example.mynetwork.Shipment');
			await shipmentAssetRegistry.update(shipment);
        }
          	
    });
}


/**
 * Send Product Details Transaction
 * @param {org.example.mynetwork.assayProduct} shipmentTx - Create the shipment and the order
 * @transaction
*/

async function assayProduct(shipmentTx){
  
  	var shipment = shipmentTx.shipment
	return supplyMemberExists(shipment.owner).then(function(exists){
    	console.log("Exists? " + exists);
        if (!exists)
            throw 'Farmer does not exist.'
        else   
            return supplyMemberExists(shipment.holder)
    }).then(function(exists){
    	if(!exists)
          	throw 'Assaying Operator does not exist.'
      	else
          	return supplyMemberExists(shipmentTx.salesOperator)
    }).then(async function(exists){
    	if(!exists)
          	throw 'Sales Operator does not exist.'
      	else{
			shipment.holder = shipmentTx.salesOperator
          	shipment.status = 'VERIFIED';
          
          	const shipmentAssetRegistry = await getAssetRegistry('org.example.mynetwork.Shipment');
			await shipmentAssetRegistry.update(shipment);
        }
          	
    });
}

/**
 * Send Product Details Transaction
 * @param {org.example.mynetwork.assayProduct} shipmentTx - Create the shipment and the order
 * @transaction
*/

async function assayProduct(shipmentTx){
  
  	var shipment = shipmentTx.shipment
	return supplyMemberExists(shipment.owner).then(function(exists){
    	console.log("Exists? " + exists);
        if (!exists)
            throw 'Farmer does not exist.'
        else   
            return supplyMemberExists(shipment.holder)
    }).then(function(exists){
    	if(!exists)
          	throw 'Assaying Operator does not exist.'
      	else
          	return supplyMemberExists(shipmentTx.salesOperator)
    }).then(async function(exists){
    	if(!exists)
          	throw 'Sales Operator does not exist.'
      	else{
			shipment.holder = shipmentTx.salesOperator
          	shipment.status = 'VERIFIED';
          
          	const shipmentAssetRegistry = await getAssetRegistry('org.example.mynetwork.Shipment');
			await shipmentAssetRegistry.update(shipment);
        }
          	
    });
}

/**
 * Send Product Details Transaction
 * @param {org.example.mynetwork.salesApproval} shipmentTx - Create the shipment and the order
 * @transaction
*/

async function salesApproval(shipmentTx){
  
  	var shipment = shipmentTx.shipment
	return supplyMemberExists(shipment.owner).then(function(exists){
    	console.log("Exists? " + exists);
        if (!exists)
            throw 'Farmer does not exist.'
        else   
            return supplyMemberExists(shipment.holder)
    }).then(function(exists){
    	if(!exists)
          	throw 'Sales Operator does not exist.'
      	else
          	return supplyMemberExists(shipmentTx.apmc)
    }).then(async function(exists){
    	if(!exists)
          	throw 'APMC does not exist.'
      	else{
			shipment.holder = shipmentTx.apmc
          	shipment.status = 'APPROVED';
          
          	const shipmentAssetRegistry = await getAssetRegistry('org.example.mynetwork.Shipment');
			await shipmentAssetRegistry.update(shipment);
        }
          	
    });
}

/**
 * Send Product Details Transaction
 * @param {org.example.mynetwork.publishTransaction} shipmentTx - Create the shipment and the order
 * @transaction
*/

async function publishTransaction(shipmentTx){
  
  	var shipment = shipmentTx.shipment
    var ordercontract = shipment.contract
    
   	if(!supplyMemberExists(shipment.owner)){
    	throw 'Farmer does not exist.'
    }
  	
  	if(!supplyMemberExists(shipment.holder)){
    	throw 'Sales Operator does not exist.'
    }
	
	var buyer = ordercontract.buyer
    var seller = ordercontract.seller
    var product = shipment.productExchanged
    if(shipment.status == 'APPROVED'){
    	if(buyer.accountBalance >= ordercontract.paymentPrice){
			
          	buyer.accountBalance = buyer.accountBalance - ordercontract.paymentPrice;
          	const participantRegistry = await getParticipantRegistry('org.example.mynetwork.APMC')	
          	await participantRegistry.update(buyer)
            
          	
          	seller.accountBalance = seller.accountBalance + ordercontract.paymentPrice;
          	const participantRegistry1 = await getParticipantRegistry('org.example.mynetwork.Farmer')	  
          	await participantRegistry1.update(seller)      	
          	
          
			product.owner = buyer
            
          	const assetRegistry = await getAssetRegistry('org.example.mynetwork.Product');
  			await assetRegistry.update(product);
          
          	shipment.holder = buyer
          	shipment.status = 'AVAILABLE';
          
          	const shipmentAssetRegistry = await getAssetRegistry('org.example.mynetwork.Shipment');
			await shipmentAssetRegistry.update(shipment);
          
          	
                  
		}
        else{
        	throw 'Insufficient Balance'
        }
    }      	
}
  

