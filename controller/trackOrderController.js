const trackOrderModel = require('../model/trackOrder');

// get all track orders
module.exports.getAllTrackOrder = async(req, res, next) => {
  return trackOrderModel
  .getAllTrackOrder()
  .then((result) => {
      if (result == null) {
          res.send(404).send(`There are no Track Orders available.`)
      }
      else {
          res.status(200).send(result);
      }
  });
}

// add purchase status
module.exports.addPurchaseStatus = async(req, res, next) => {
  let purchaseStatus = req.body.purchaseStatus;

  return trackOrderModel
  .addPurchaseStatus(purchaseStatus)
  .then(() => {
      return res.status(201).send(`Purchase Status Created!`);
  })
  .catch((err) => {
      console.log(err);
      return res.status(500).send(`Unknown Error`);
  });
};

// get all purchase statuses
module.exports.getAllPurchaseStatus = async(req, res, next) => {
  return trackOrderModel
  .getAllPurchaseStatus()
  .then((result) => {
      if (result == null){
          res.send(404).send(`There are no Purchase Status Type available`);
      }
      else{
          res.status(200).send(result);
      }
  });
};

// get PO by PO ID
module.exports.getPOByPOID = async(req, res, next) => {
    let poId = parseInt(req.params.id);

    if(isNaN(poId)){
        res.status(400).send(`Purchase Order ID provided is not a number!`);
        return;
    }

    return trackOrderModel
    .getPOByPOID(poId)
    .then((result) => {
        if(result == null){
            res.status(404).send(`Purchase Order #${poId} does not exist!`);
        }
        else{
            res.status(200).send(result);
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send(`Unknown Error`);
    });
};

// get purchase order detials by PO ID
module.exports.getPODByPOID = async(req, res, next) => {
    let poId = parseInt(req.params.id);

    if(isNaN(poId)){
        res.status(400).send(`Purchase Order ID provided is not a number!`);
        return;
    }

    return trackOrderModel
    .getPODByPOID(poId)
    .then((result) => {
        if(result == null){
            res.status(404).send(`Purchase Order #${poId} does not exist!`);
        }
        else{
            res.status(200).send(result);
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send(`Unknown Error`);
    });
};

// get product details by PO ID
module.exports.getPDByPOID = async(req, res, next) => {
    let poId = parseInt(req.params.id);

    if(isNaN(poId)){
        res.status(400).send(`Purchase Order ID provided is not a number!`);
        return;
    }

    return trackOrderModel
    .getPDByPOID(poId)
    .then((result) => {
        if(result == null){
            res.status(404).send(`Purchase Order #${poId} does not exist!`);
        }
        else{
            res.status(200).send(result);
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send(`Unknown Error`);
    });
};
