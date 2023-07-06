const purchaseOrderModel = require('../model/purchaseOrder');

//get all PO
module.exports.getAllPO = async(req, res, next) => {
    return purchaseOrderModel
    .getAllPO()
    .then((result) => {
        if (result == null) {
            res.send(404).send(`There are no Purchase Orders Currently.`)
        }
        else {
            res.status(200).send(result);
        }
    });
}

//get PO by PO ID
module.exports.getPObyID = async(req, res, next) => {
    let poID = req.params.prID;

    if(isNaN(poID)) {
        res.status(400).send(`Please input a number`);
        return;
    }

    return purchaseOrderModel
    .getPObyID(poID)
    .then((result) => {
        if(result == null){
            res.status(400).send(`Purchase Order No. ${poID} does not exist`)
        }
        else {
            res.status(200).send(result);
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).send(`Unknown error`)
    });
}


//update PO by PO ID
module.exports.updatePaymentStatus = async(req, res, next) => {
    let prID = req.params.prID; 
    let paymentStatusID = req.body.paymentStatusID;

    return purchaseOrderModel
    .updatePaymentStatus(paymentStatusID, prID)
    .then(() => {
        res.status(200).send(`PO with ID : ${prID} successfully updated`)
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send(`unknown error`);
    })
}

module.exports.updateRemarks = async(req, res, next) => {
    let prID = req.params.prID;
    let ptRemarks = req.body.ptRemarks;

    return purchaseOrderModel
    .updateRemarks(ptRemarks, prID)
    .then(() => {
        res.status(200).send(`Remarks from ${prID} successfully updated`);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send(`unknown error`);
    })
}

module.exports.getRemarks = async(req, res, next) => {
    let prID = req.params.prID;

    return purchaseOrderModel
    .getRemarks(prID)
    .then((result) => {
        res.status(200).send(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send(`unknown error`);
    })
}