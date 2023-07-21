const moment = require('moment');
const purchaseRequestModel = require('../model/purchaseRequest');

// ===============================
// PR
// add PR
module.exports.addPR = async (req, res, next) => {
    let purchaseTypeID = req.body.purchaseTypeID;
    let targetDeliveryDate = req.body.targetDeliveryDate;
    let userId = req.body.userID;
    let supplierId = req.body.supplierID;
    let paymentModeId = req.body.paymentModeID;
    let remarks = req.body.remarks;

    return purchaseRequestModel
        .addPR(purchaseTypeID, targetDeliveryDate, userId, supplierId, paymentModeId, remarks)
        .then(() => {
            if (purchaseTypeID === 1) {
                return res.status(201).send(`Purchase Request Created!`);
            }
            else if (purchaseTypeID === 2) {
                return res.status(201).send(`Ad-Hoc Purchase Created!`);
            }

        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Unknown Error`);
        });
};

// get all PR
module.exports.getAllPR = async (req, res, next) => {
    return purchaseRequestModel
        .getAllPR()
        .then((result) => {
            if (result == null) {
                res.status(404).send(`There are no Purchase Requests Available`);
            }
            else {
                res.status(200).send(result);
            }
        });
};

// get PR by userid
module.exports.getPRByUserID = async (req, res, next) => {
    let userId = parseInt(req.params.id);

    if (isNaN(userId)) {
        res.status(400).send(`UserId provided is not a number!`);
        return;
    }

    return purchaseRequestModel
        .getPRByUserID(userId)
        .then((result) => {
            if (result == null) {
                res.status(404).send(`Purchase Requests Do not exist!`);
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

// get PR by PR status

// get PR by PR ID
module.exports.getPRByPRID = async (req, res, next) => {
    let data = [];

    let prId = parseInt(req.params.id);

    if (isNaN(prId)) {
        res.status(400).send(`Purchase Request ID provided is not a number!`);
        return;
    }

    await purchaseRequestModel
        .getPRByPRID(prId)
        .then((result) => {
            if (result == null) {
                return res.status(404).send(`Purchase Request #${prId} does not exist!`);
            }
            else {
                // data.PRDetails = result[0];
                data.push(result[0]);
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Unknown Error`);
        });

    // check if have PR details result
    if (Object.keys(data).length === 1) {
        // const reqDate = moment(data.PRDetails.requestDate).format();
        const reqDate = moment(data[0].requestDate).format();

        await purchaseRequestModel
            .getPRGST(reqDate)
            .then((result) => {
                // data.GST = result[0];
                // data.push(result[0]);
                data[0].GST = result[0];
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).send(`Unknown Error`);
            });

        // return final data(PR details + GST)
        return res.status(200).send(data);
    };

};

// get latest PR ID created
module.exports.getLatestPRIDByUserID = async (req, res, next) => {
    let userId = parseInt(req.params.id);

    if (isNaN(userId)) {
        res.status(400).send(`UserId provided is not a number!`);
        return;
    }

    return purchaseRequestModel
        .getLatestPRIDByUserID(userId)
        .then((result) => {
            if (result == null) {
                res.status(404).send(`Latest PR ID does not exist!`);
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

// update PR by PR ID (Approver) ------> approver remarks?
module.exports.updatePRStatus = async (req, res, next) => {
    let prId = parseInt(req.params.id);
    let prStatusId = req.body.prStatusID;
    let apprUserID = req.body.apprUserID;

    if (isNaN(prId)) {
        res.status(400).send(`Purchase Request ID provided is not a number!`);
        return;
    };

    return purchaseRequestModel
        .updatePRStatus(prStatusId, apprUserID, prId)
        .then((result) => {
            if (result.affectedRows == 0) {
                res.status(404).send(`Purchase Request #${prId} does not exist!`);
            }
            else {
                res.status(201).send(`Purchase Request Status Updated!`);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown error`);
        });
};

// update PR by PR ID (Approver) ------> approver remarks?
module.exports.updatePRApprover = async (req, res, next) => {
    let prId = parseInt(req.params.id);
    let apprRemarks = req.body.comments;
    let prStatusId = req.body.prStatusID;
    let apprUserID = req.body.apprUserID;

    if (isNaN(prId)) {
        res.status(400).send(`Purchase Request ID provided is not a number!`);
        return;
    };

    return purchaseRequestModel
        .updatePRApprover(apprRemarks, prStatusId, apprUserID, prId)
        .then((result) => {
            if (result.affectedRows == 0) {
                res.status(404).send(`Purchase Request #${prId} does not exist!`);
            }
            else {
                res.status(201).send(`Purchase Request Status Updated!`);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown error`);
        });
};

// update approver comments
module.exports.updateApprComments = async (req, res, next) => {
    let prId = parseInt(req.params.id);
    let apprRemarks = req.body.comments;

    if (isNaN(prId)) {
        res.status(400).send(`Purchase Request ID provided is not a number!`);
        return;
    };

    return purchaseRequestModel
        .updateApprComments(apprRemarks, prId)
        .then((result) => {
            if (result.affectedRows == 0) {
                res.status(404).send(`Purchase Request #${prId} does not exist!`);
            }
            else {
                res.status(201).send(`Purchase Request Status Updated!`);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown error`);
        });
};

// delete PR
module.exports.deletePRById = async (req, res, next) => {
    let prId = parseInt(req.params.id);

    if (isNaN(prId)) {
        res.status(400).send(`Purchase Request ID provided is not a number!`);
        return;
    };

    return purchaseRequestModel
        .deletePR(prId)
        .then((result) => {
            if (result.affectedRows == 0) {
                res.status(404).send(`Purchase Request #${prId} does not exist!`);
            }
            else {
                res.status(201).send(`Purchase Request #${prId} has been deleted!`);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown error`);
        });
};

// get All Ad Hoc Purchases
module.exports.getAllAdHoc = async (req, res, next) => {
    return purchaseRequestModel
        .getAllAdHoc()
        .then((result) => {
            if (result == null) {
                res.status(404).send(`There are no Ad-Hoc Purchases Available`);
            }
            else {
                res.status(200).send(result);
            }
        });
};

// get ad hoc purchases by userid
module.exports.getAdHocByUserID = async (req, res, next) => {
    let userId = parseInt(req.params.id);

    if (isNaN(userId)) {
        res.status(400).send(`UserId provided is not a number!`);
        return;
    }

    return purchaseRequestModel
        .getAdHocByUserID(userId)
        .then((result) => {
            if (result == null) {
                res.status(404).send(`User ID #${userId}has not made any Ad-Hoc Purchases!`);
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

// get ad hoc purchases by PR ID
module.exports.getAdHocByPRID = async (req, res, next) => {
    let prId = parseInt(req.params.id);

    if (isNaN(prId)) {
        res.status(400).send(`Ad Hoc ID provided is not a number!`);
        return;
    };

    await purchaseRequestModel
        .getAdHocByPRID(prId)
        .then((result) => {
            if (result == null) {
                return res.status(404).send(`Ad Hoc Purchase #${prId} does not exist!`);
            }
            else {
                return res.status(200).send(result);
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Unknown Error`);
        });
};

// get both PR and adHoc Purchases together
module.exports.getAllPRnAH = async (req, res, next) => {
    const allPurchases = [];

    await purchaseRequestModel
        .getAllPR()
        .then((result) => {
            console.log(result);
            if (result == null) {
                throw res.status(404).send(`There are no Purchase Requests Available`);
            }
            else {
                // res.status(200).send(result);
                // allPurchases.push(result);
                result.forEach((item, index) => {
                    allPurchases.push(item);
                })
                console.log("pushed", allPurchases);
            }
        });

    await purchaseRequestModel
        .getAllAdHoc()
        .then((result) => {
            console.log("adhoc results", result);
            if (result == null) {
                throw res.status(404).send(`There are no Ad-Hoc Purchases Available`);
            }
            else {
                // res.status(200).send(result);
                // allPurchases.push(result);
                result.forEach((item, index) => {
                    allPurchases.push(item);
                })
                console.log("pushed AH", allPurchases);
            }
        });

        allPurchases.sort(dynamicSort('prID')).sort(dynamicSort('prStatusID'))

    // return Promise.resolve(allPurchases);
    return res.status(200).send(allPurchases);
};

function dynamicSort(property) {
    return function(a, b) {
        return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    }
}

// ===============================
// Line Items
// add line item
module.exports.addLineItem = async (req, res, next) => {
    let prId = req.body.prID;
    let itemId = req.body.itemID;
    let quantity = req.body.quantity;
    let totalUnitPrice = req.body.totalUnitPrice;

    return purchaseRequestModel
        .addLineItem(prId, itemId, quantity, totalUnitPrice)
        .then(() => {
            return res.status(201).send(`Line Item Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Unknown Error`);
        });
};

// get line item by PR ID
// get PR by PR ID
module.exports.getLineItemByPRID = async (req, res, next) => {
    let prId = parseInt(req.params.id);

    if (isNaN(prId)) {
        res.status(400).send(`Purchase Request ID provided is not a number!`);
        return;
    }

    return purchaseRequestModel
        .getLineItemByPRID(prId)
        .then((result) => {
            if (result == null) {
                res.status(404).send(`Line Item does not exist in Purchase Request #${prId}!`);
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

// update qtyReceived in lineItems table
module.exports.updateQtyReceived = async (req, res, next) => {
    let lineItemID = parseInt(req.params.id);
    let qtyReceived = req.body.qtyReceived;

    if (isNaN(lineItemID)) {
        res.status(400).send(`Line Item ID provided is not a number!`);
        return;
    };

    return purchaseRequestModel
        .updateQtyReceived(qtyReceived, lineItemID)
        .then((result) => {
            if (result.affectedRows == 0) {
                res.status(404).send(`Line Item ID #${prId} does not exist!`);
            }
            else {
                res.status(201).send(`Quantity Received Updated!`);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown error`);
        });
};

// ===============================
// GST
// add gst
module.exports.addGST = async (req, res, next) => {
    let gst = req.body.GST;

    return purchaseRequestModel
        .addGST(gst)
        .then(() => {
            return res.status(201).send(`GST Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Unknown Error`);
        });
};

// get gst by pr created date
module.exports.getPRGST = async (req, res, next) => {
    let date = req.body.requestDate;

    return purchaseRequestModel
        .getPRGST(date)
        .then((result) => {
            if (result == null) {
                res.status(404).send(`GST does not exist for Purchase Request!`);
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

// get PR by PR ID
module.exports.getGSTByID = async (req, res, next) => {
    let id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400).send(`GST ID provided is not a number!`);
        return;
    }

    return purchaseRequestModel
        .getGSTByID(id)
        .then((result) => {
            if (result == null) {
                res.status(404).send(`GST does not exist in Purchase Request #${prId}!`);
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

// ===============================
// Payment Mode
// add payment mode
module.exports.addPaymentMode = async (req, res, next) => {
    let paymentMode = req.body.paymentMode;

    return purchaseRequestModel
        .addPaymentMode(paymentMode)
        .then(() => {
            return res.status(201).send(`Payment Mode Type Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Unknown Error`);
        });
};

// get all payment modes
module.exports.getAllPaymentMode = async (req, res, next) => {
    return purchaseRequestModel
        .getAllPaymentMode()
        .then((result) => {
            if (result == null) {
                res.status(404).send(`There are no Payment Modes Available`);
            }
            else {
                res.status(200).send(result);
            }
        });
};

// ===============================
// Branch
// add branch
module.exports.addBranch = async (req, res, next) => {
    let branchName = req.body.branchName;
    let branchPrefix = req.body.branchPrefix;
    let address = req.body.address;
    let unitNum = req.body.unitNum;
    let postalCode = req.body.postalCode;
    let officeNum = req.body.officeNum;
    let officeEmail = req.body.officeEmail;

    return purchaseRequestModel
        .addBranch(branchName, branchPrefix, address, unitNum, postalCode, officeNum, officeEmail)
        .then(() => {
            return res.status(201).send(`Branch Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Unknown Error`);
        });
};

// get all branch
module.exports.getAllBranch = async (req, res, next) => {
    return purchaseRequestModel
        .getAllBranch()
        .then((result) => {
            if (result == null) {
                res.status(404).send(`There are no Branches Available`);
            }
            else {
                res.status(200).send(result);
            }
        });
};

// get branch by id

// ===============================
// Delivery Location
// add delivery Location
module.exports.addDeliveryLocation = async (req, res, next) => {
    let prID = req.body.prID;
    let branchID = req.body.branchID;

    return purchaseRequestModel
        .addDeliveryLocation(prID, branchID)
        .then(() => {
            return res.status(201).send(`Delivery Location Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Unknown Error`);
        });
};

// get all Delivery Location
module.exports.getAllDeliveryLocation = async (req, res, next) => {
    return purchaseRequestModel
        .getAllDeliveryLocation()
        .then((result) => {
            if (result == null) {
                res.status(404).send(`There are no Delivery Locations Available`);
            }
            else {
                res.status(200).send(result);
            }
        });
};

// get Delivery Location by PR ID
module.exports.getDeliveryLocationByPRID = async (req, res, next) => {
    let prId = parseInt(req.params.id);

    if (isNaN(prId)) {
        res.status(400).send(`Purchase Request ID provided is not a number!`);
        return;
    }

    return purchaseRequestModel
        .getDeliveryLocationByPRID(prId)
        .then((result) => {
            if (result == null) {
                res.status(404).send(`Delivery Location does not exist in Purchase Request #${prId}!`);
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

// ===============================
// PR status
// add PR status
module.exports.addPRStatusType = async (req, res, next) => {
    let prStatus = req.body.prStatus;

    return purchaseRequestModel
        .addPRStatusType(prStatus)
        .then(() => {
            return res.status(201).send(`Purchase Order Status Type Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Unknown Error`);
        });
};


// get all PR status
module.exports.getAllPRStatusType = async (req, res, next) => {
    return purchaseRequestModel
        .getAllPRStatusType()
        .then((result) => {
            if (result == null) {
                res.status(404).send(`There are no Purchase Request Status Types Available`);
            }
            else {
                res.status(200).send(result);
            }
        });
};

// get status by id 

// ===============================
// Search Function
// Search All columns FOR admin / approver
module.exports.searchPRAll = async (req, res, next) => {
    let searchValue = req.body.searchValue;

    return purchaseRequestModel
        .searchPRAll(searchValue)
        .then((result) => {
            if (result == null) {
                res.status(404).send(`Purchase Requests with "${searchValue}" Do not exist!`);
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

// Search All columns for Purchaser by User ID
module.exports.searchPRByUserID = async (req, res, next) => {
    let userId = parseInt(req.params.id);
    let searchValue = req.body.searchValue;

    if (isNaN(userId)) {
        res.status(400).send(`UserId provided is not a number!`);
        return;
    }

    return purchaseRequestModel
        .searchPRByUserID(searchValue, userId)
        .then((result) => {
            if (result == null) {
                res.status(404).send(`Purchase Requests with "${searchValue}" Do not exist!`);
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

// Dynamic Search
module.exports.searchPRDynamic = async (req, res, next) => {
    let searchValue = req.body.searchValue;
    let ByUserID = req.body.ByUserID;
    let UserID = req.body.UserID;
    let PurchaseType = req.body.PurchaseType;
    let PTID = req.body.PTID;
    let ByUserName = req.body.ByUserName;
    let ByReqDate = req.body.ByReqDate;
    let ByTargetDate = req.body.ByTargetDate;
    let ByBranchName = req.body.ByBranchName;
    let BySupplierName = req.body.BySupplierName;
    let ByPaymentMode = req.body.ByPaymentMode;
    let ByPRStatus = req.body.ByPRStatus;
    let ByRemarks = req.body.ByRemarks;

    return purchaseRequestModel
        .searchPRDynamic(searchValue, ByUserID, UserID, PurchaseType, PTID, ByUserName, ByReqDate, ByTargetDate, ByBranchName, BySupplierName, ByPaymentMode, ByRemarks, ByPRStatus)
        .then((result) => {
            if (result == null) {
                console.log(result)
                res.status(404).send(`Purchase Requests with "${searchValue}" Do not exist!`);
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
