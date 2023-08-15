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

// update PO Total Price //? for adhoc purchases
module.exports.updatePOTotalPrice = async (req, res, next) => {
    let prID = parseInt(req.params.id);
    let totalPrice = req.body.totalPrice;

    if (isNaN(prID)) {
        res.status(400).send(`Purchase Request ID provided is not a number!`);
        return;
    };

    return trackOrderModel
        .updatePOTotalPrice(totalPrice, prID)
        .then((result) => {
            if (result.affectedRows == 0) {
                res.status(404).send(`Purchase Order #${prID} does not exist!`);
            }
            else {
                res.status(201).send(`Total Price Updated!`);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown error`);
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

//saving invoice pdf
module.exports.saveInvoice = async (req, res, next) => {
    const prID = req.params.prID;
    const fileBuffer = req.file.buffer;

    return trackOrderModel
        .saveInvoice(fileBuffer, prID)
        .then(() => {
            res.status(200).send('Invoice saved successfully');
        })
        .catch((err) => {
            res.status(500).send('Failed to save invoice');
        })
};

//saving DO pdf
module.exports.saveDOrder = async (req, res, next) => {
    const prID = req.params.prID;
    const fileBuffer = req.file.buffer;

    return trackOrderModel
        .saveDOrder(fileBuffer, prID)
        .then(() => {
            res.status(200).send('Delivery Order saved successfully');
        })
        .catch((err) => {
            res.status(500).send('Failed to save delivery Order');
        })
}

//get invoice 
module.exports.getInvoice = async (req, res, next) => {
    let prID = req.params.prID;
  
    return trackOrderModel
      .getInvoice(prID)
      .then((result) => {
        if (!result) {
          return res.status(404).send('Invoice not found');
        }
        res.set('Content-Type', 'application/pdf');
        res.send(result);
      })
      .catch((err) => {
        console.error('Error fetching invoice:', err);
        res.status(500).send('Failed to fetch invoice');
      });
  };

module.exports.getDO = async (req, res, next) => {
let prID = req.params.prID;
  
return trackOrderModel
    .getDO(prID)
    .then((result) => {
    if (!result) {
      return res.status(404).send('Delivery Order not found');
    }
    res.set('Content-Type', 'application/pdf');
    res.send(result);
    })
    .catch((err) => {
        console.error('Error fetching Delivery Order:', err);
        res.status(500).send('Failed to fetch Delivery Order');
    });
};

//insert deliverydate
module.exports.addDDate = async (req, res, next) => {
    let prID = req.params.id;
    let deliveryDate = req.body.deliveryDate;

    return trackOrderModel
        .addDDate(deliveryDate, prID)
        .then(() => {
            res.status(200).send('Delivery Date saved successfully');
        })
        .catch((err) => {
            res.status(500).send('Failed to save Delivery Date');
        })
}

module.exports.getDDateByID = async (req, res, next) => {
    let prID = req.params.prID;

    return trackOrderModel
    .getDDateByID(prID)
    .then((result) => {
        if (result == null) {
            res.status(404).send(`Purchase Order #${prID} does not exist!`);
        }
        else {
            res.status(200).send(result);
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send(`Unknown Error`);
    });
}

module.exports.getIDbyPurchaseStatus = async(req, res, next) => {
    let status = req.params.purchaseStatus;

    return trackOrderModel
    .getIDbyPurchaseStatus(status)
    .then((result) => {
        if (result[0] == null) {
            res.send(`Purchase Status ${status} not found`);
        } else {
            res.status(200).send(result);
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send(`Unknown error`);
    })
}

module.exports.deletePurchaseStatusByID = async (req, res, next) => {
    let statusID = req.params.purchaseStatusID;

    if (isNaN(statusID)) {
        res.status(400).send(`please input a number`);
        return;
    }

    return trackOrderModel
    .deletePurchaseStatusByID(statusID)
    .then((result) => {
        if (result[0] == null) {
            res.send(` Purchase Status with ID : ${statusID} does not exist `);
        }
        else {
            res.status(200).send(``)
        }
    })
}

module.exports.removeInvoice = async (req, res, next) => {
    let prID = req.params.prID;

    return trackOrderModel
    .removeInvoice(prID)
    .then(() => {
        res.send('Invoice deleted succesfully')
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(`Failed to delete Invoice`)
    })
}

module.exports.removeDO = async (req, res, next) => {
    let prID = req.params.prID;

    return trackOrderModel
    .removeDO(prID)
    .then(() => {
        res.send('DO deleted succesfully')
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(`Failed to delete DO`)
    })
}