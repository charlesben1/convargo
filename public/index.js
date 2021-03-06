'use strict';

//list of truckers
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL steps
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(truckers);
console.log(deliveries);
console.log(actors);


deliveries.forEach(function(delivery){

  truckers.forEach(function(truck){
    if(truck.id == delivery.truckerId)
    {


     if (delivery.volume >= 25)
     {
      delivery.price = truck.pricePerKm*delivery.distance + (truck.pricePerVolume*delivery.volume)*0.5;

    }
    else if (delivery.volume >= 10)
    {
      delivery.price = truck.pricePerKm*delivery.distance + (truck.pricePerVolume*delivery.volume)*0.7;

    }
    else if (delivery.volume >= 5)
    {
      delivery.price = truck.pricePerKm*delivery.distance + ((truck.pricePerVolume*delivery.volume)*0.9);

    }

    else {delivery.price = truck.pricePerKm*delivery.distance + truck.pricePerVolume*delivery.volume;
    }

    

    var commission = delivery.price*0.3;
    delivery.commission.insurance=commission*0.5;
    delivery.commission.treasury= Math.ceil(delivery.distance / 500);
    delivery.commission.convargo = (commission - delivery.commission.insurance - delivery.commission.treasury);
       
   
    var deductibleoption;
    deductibleoption = 0; 
    if(delivery.options.deductibleReduction == true )
    {
      deductibleoption = delivery.volume;
      delivery.price = delivery.price + deductibleoption;
    }
    
    actors.shipper = delivery.price;
    actors.trucker = delivery.price - commission - deductibleoption;
    actors.treasury = delivery.commission.treasury;
    actors.insurance = delivery.commission.insurance;
    actors.convargo = delivery.commission.convargo + deductibleoption;  

    console.log("delivery#  " + delivery.id);
    console.log("Total price:  "+delivery.price);
    console.log("insurance fees= "+ delivery.commission.insurance);
    console.log("treasury fees= " + delivery.commission.treasury);
    console.log("convargo fees= " + delivery.commission.convargo);
    console.log("Shipper pays: " + actors.shipper);
    console.log("Trucker receives: " + actors.trucker);
    console.log("Treasury receives: " + actors.treasury);
    console.log("Insurance receives: " + actors.insurance);
    console.log("Convargo finally wins: " + actors.convargo);

  }
  
});

})
