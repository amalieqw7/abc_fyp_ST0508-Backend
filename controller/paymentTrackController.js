const paymentTrackModel = require('../model/paymentTrack');

module.exports.createPaymentStatus = async (req, res, next) => {
    let status = req.body.paymentStatus;

    return paymentTrackModel
        .createPaymentStatus(status)
        .then(() => {
            return res.status(201).send(` Status : '${status}' successfully created`);
        })
        .catch((err) => {
            console.log(err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).send(` ${status} already exists`);
            }
            else {
                console.log(err)
                return res.status(500).send(`unknown error`);

            }
        })
}

module.exports.getPaymentStatusById = async (req, res, next) => {
    let statusID = req.params.paymentStatusID;

    if (isNaN(statusID)) {
        res.status(400).send(`Please input a number`);
        return;
    };

    return paymentTrackModel
        .getPaymentStatusById(statusID)
        .then((result) => {
            if (result[0] == null) {
                res.send(`Payment Status with ID : ${statusID} does not exist`);
            }
            else {
                res.status(200).send(result);
                return
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown error`);
        })
}

module.exports.getAllPaymentStatus = async (req, res, next) => {
    return paymentTrackModel
        .getAllPaymentStatus()
        .then((result) => {
            if (result[0] == null) {
                res.send(`There are no statuses currently`)
            } else {
                return res.status(200).send(result);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`unknown error`)
        })
}

module.exports.updatePaymentStatusByID = async (req, res, next) => {
    let statusID = req.params.paymentStatusID;
    let paymentStatus = req.body.paymentStatus;

    if (isNaN(statusID)) {
        res.status(400).send(`please input a number`);
        return;
    }

    return paymentTrackModel
        .updatePaymentStatusByID(statusID, paymentStatus)
        .then(() => {
            res.status(200).send(`Status Successfully updated`);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`unknown error `);
        })
}

module.exports.deletePaymentStatusByID = async (req, res, next) => {
    let statusID = req.params.paymentStatusID;

    if (isNaN(statusID)) {
        res.status(400).send(`please input a number`);
        return;
    }

    return paymentTrackModel
        .deletePaymentStatusByID(statusID)
        .then((result) => {
            if (result[0] == null) {
                res.send(` Payment Status with ID : ${statusID} does not exist `);
            }
            else {
                res.status(200).send(``)
            }
        })

}

module.exports.getSupplierInformationByName = async (req, res, next) => {
    let supplierName = req.params.supplierName;

    return paymentTrackModel
        .getSupplierInformationByName(supplierName)
        .then((result) => {
            if (result[0] == null) {
                res.send(`Supplier Named ${supplierName} not found`);
            }
            else {
                res.status(200).send(result)
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown error`);
        })
}

module.exports.getSupplierInformationByID = async (req, res, next) => {
    let id = req.params.supplierID;

    return paymentTrackModel
        .getSupplierInformationByID(id)
        .then((result) => {
            if (result[0] == null) {
                res.send(`Supplier ID ${id} not found`);
            } else {
                res.status(200).send(result)
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown error`);
        })
}


module.exports.getSIDbyPRID = async (req, res, next) => {
    let prID = req.params.prID;

    if (isNaN(prID)) {
        res.status(400).send(`Please input a prID`);
        return;
    }

    return paymentTrackModel
        .getSIDbyPRID(prID)
        .then((result) => {
            if (result[0] == null) {
                res.send(`Purchase Request ID ${prID} not found`);
            } else {
                res.status(200).send(result);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown error`);
        })
}

module.exports.getIDbyStatus = async (req, res, next) => {
    let status = req.params.paymentStatus;

    return paymentTrackModel
        .getIDbyStatus(status)
        .then((result) => {
            if (result[0] == null) {
                res.send(`Payment Status ${status} not found`);
            } else {
                res.status(200).send(result);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown error`);
        })

}


module.exports.saveReceipt = async (req, res, next) => {
    const prID = req.params.prID;
    const fileBuffer = req.file.buffer;

    return paymentTrackModel
        .saveReceipt(fileBuffer, prID)
        .then(() => {
            res.status(200).send('receipt saved successfully');
        })
        .catch((err) => {
            res.status(500).send('failed to save receipt zz');
        })

}


module.exports.getFile = async (req, res, next) => {
    let prID = req.params.prID;
  
    return paymentTrackModel
      .getFile(prID)
      .then((result) => {
        if (!result) {
          return res.status(404).send('Receipt not found');
        }
        res.set('Content-Type', 'application/pdf');
        res.send(result);
      })
      .catch((err) => {
        console.error('Error fetching receipt:', err);
        res.status(500).send('Failed to fetch receipt');
      });
  };
