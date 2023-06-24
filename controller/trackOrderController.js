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

// add purchase order
module.exports.addPurchaseOrder = async(req, res, next) => {
  let prID = req.body.prID;

  return trackOrderModel
  .addPurchaseOrder(prID)
  .then(() => {
      return res.status(201).send(`Purchase Order Successful!`);
  })
  .catch((err) => {
      console.log(err);
      if(err.code === 'ER_DUP_ENTRY'){
        console.log("DUPLICATE");
        return res.status(409).send(`Duplicate Purchase Order!`);
      }
      else{
        return res.status(500).send(`Unknown Error`);
      }
  });
};
