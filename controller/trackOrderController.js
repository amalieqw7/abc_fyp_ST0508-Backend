const trackOrderModel = require('../model/trackOrder');

// get all track orders
module.exports.getAllTrackOrder = async (req, res, next) => {
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
module.exports.addPurchaseStatus = async (req, res, next) => {
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
module.exports.getAllPurchaseStatus = async (req, res, next) => {
    return trackOrderModel
        .getAllPurchaseStatus()
        .then((result) => {
            if (result == null) {
                res.send(404).send(`There are no Purchase Status Type available`);
            }
            else {
                res.status(200).send(result);
            }
        });
};

// add purchase order
module.exports.addPurchaseOrder = async (req, res, next) => {
    let prID = req.body.prID;

    return trackOrderModel
        .addPurchaseOrder(prID)
        .then(() => {
            return res.status(201).send(`Purchase Order Successful!`);
        })
        .catch((err) => {
            console.log(err);
            if (err.code === 'ER_DUP_ENTRY') {
                console.log("DUPLICATE");
                return res.status(409).send(`Duplicate Purchase Order!`);
            }
            else {
                return res.status(500).send(`Unknown Error`);
            }
        });
};

// get PO by PO ID
module.exports.getPOByPOID = async (req, res, next) => {
    let poId = parseInt(req.params.id);

    if (isNaN(poId)) {
        res.status(400).send(`Purchase Order ID provided is not a number!`);
        return;
    }

    return trackOrderModel
        .getPOByPOID(poId)
        .then((result) => {
            if (result == null) {
                res.status(404).send(`Purchase Order #${poId} does not exist!`);
            }
            else {
                res.status(200).send(result);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown Error`);
        });
};

// get purchase order details by PR ID
module.exports.getPODByPRID = async (req, res, next) => {
    let prId = parseInt(req.params.id);

    if (isNaN(prId)) {
        res.status(400).send(`Purchase Order ID provided is not a number!`);
        return;
    }

    return trackOrderModel
        .getPODByPRID(prId)
        .then((result) => {
            if (result == null) {
                res.status(404).send(`Purchase Order #${prId} does not exist!`);
            }
            else {
                res.status(200).send(result);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown Error`);
        });
};

// get product details by PO ID
module.exports.getPDByPOID = async (req, res, next) => {
    let poId = parseInt(req.params.id);

    if (isNaN(poId)) {
        res.status(400).send(`Purchase Order ID provided is not a number!`);
        return;
    }

    return trackOrderModel
        .getPDByPOID(poId)
        .then((result) => {
            if (result == null) {
                res.status(404).send(`Purchase Order #${poId} does not exist!`);
            }
            else {
                res.status(200).send(result);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown Error`);
        });
};

// update PO dropdown status by id

module.exports.updatePOByPoId = async (req, res, next) => {
    let poID = parseInt(req.params.id);
    let purchaseStatusID = req.body.purchaseStatusID;

    if (isNaN(poID)) {
        res.status(400).send(`Purchase Request ID provided is not a number!`);
        return;
    };

    return trackOrderModel
        .updatePOByPoId(purchaseStatusID, poID)
        .then((result) => {
            if (result.affectedRows == 0) {
                res.status(404).send(`Dropdown not updated.`);
            }
            else {
                res.status(201).send(`Dropdown updated successfully!`);
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Unknown Error`);
        });

};

// get purchase status id
module.exports.getPOstatusbyID = async (req, res, next) => {
    let poId = parseInt(req.params.id);

    if (isNaN(poId)) {
        res.status(400).send(`Purchase Status ID provided is not a number!`);
        return;
    }

    return trackOrderModel
        .getPOstatusbyID(poId)
        .then((result) => {
            if (result == null) {
                res.status(404).send(`Purchase Status does not exist!`);
            }
            else {
                res.status(200).send(result);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown Error`);
        });
};

// add quantity received (full or partial received)
module.exports.updateQtyReceived = async (req, res, next) => {
    let poID = req.params.id;
    let qtyReceived = req.body.qtyReceived;

    if (isNaN(qtyReceived)) {
        res.status(400).send(`Quantity is not a number!`);
        return;
    }
    else if (qtyReceived < 0) {
        res.status(400).send(`Please put in a valid number!`);
        return;
    }

    return trackOrderModel
        .updateQtyReceived(qtyReceived, poID)
        .then(() => {
            return res.status(201).send(`Quantity has been updated!`);
        })
        .catch((err) => {
            console.log(err);
            // if(err.code === 'ER_DUP_ENTRY'){
            //   console.log("DUPLICATE");
            //   return res.status(409).send(`Duplicate Purchase Order!`);
            // }
            // else{
            return res.status(500).send(`Unknown Error`);
            //}
        });


};

// get purchase statuses
module.exports.getPurchaseStatuses = async (req, res, next) => {
    return trackOrderModel
        .getPurchaseStatuses()
        .then((result) => {
            if (result == null) {
                res.send(404).send(`There are no Purchase Status Type available`);
            }
            else {
                res.status(200).send(result);
            }
        });
};

// get PR amount 
module.exports.getPRAmount = async (req, res, next) => {
    return trackOrderModel
        .getPRAmount()
        .then((result) => {
            if (result == null) {
                res.send(404).send(`Error occurred`);
            }
            else {
                res.status(200).send(result);
            }
        });
};

// get PO amount 
module.exports.getPOAmount = async (req, res, next) => {
    return trackOrderModel
        .getPOAmount()
        .then((result) => {
            if (result == null) {
                res.send(404).send(`Error occurred`);
            }
            else {
                res.status(200).send(result);
            }
        });
};

// searchBar
module.exports.searchBar = async(req, res, next) => {
  let searchValue = req.body.searchValue;

  return trackOrderModel
  .searchBar(searchValue)
  .then((result) => {
      if(result == null){
          res.status(404).send(`Purchase Orders with "${searchValue}" does not exist!`);
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
