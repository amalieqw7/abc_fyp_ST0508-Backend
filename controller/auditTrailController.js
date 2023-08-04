const auditTrailModel = require('../model/auditTrail');

// ===============================
// Audit Log Table
// create Audit log
module.exports.createAuditLog = async (req, res, next) => {
    let timestamp = req.body.timestamp;
    let userID = req.body.userID;
    let actionTypeID = req.body.actionTypeID;
    let itemId = req.body.itemId;
    let newValue = req.body.newValue;
    let oldValue = req.body.oldValue;

    return auditTrailModel
        .createAuditLog(timestamp, userID, actionTypeID, itemId, newValue, oldValue)
        .then(() => {
            return res.status(201).send(`Audit Log Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Unknown Error`);
        });
};

// get all audit Log
module.exports.getAuditLogs = async (req, res, next) => {
    return auditTrailModel
        .getAuditLogs()
        .then((result) => {
            if (result == null) {
                res.status(404).send(`There are no Audit Logs Available`);
            }
            else {
                res.status(200).send(result);
            }
        });
};

// get audit log by item ID
module.exports.getAuditLogByItemID = async (req, res, next) => {
    let actionTypeID = req.body.actionTypeID;
    let itemId = req.body.itemId;
    let newValue = req.body.newValue;

    if (isNaN(itemId)) {
        res.status(400).send(`Item ID provided is not a number!`);
        return;
    };

    return auditTrailModel
        .getAuditLogByItemID(actionTypeID, itemId, newValue)
        .then((result) => {
            if (result == null) {
                res.status(404).send(`#${itemId} does not have an audit log yet!`);
            }
            else {
                res.status(200).send(result);
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(`Unknown Error`);
        });
};

// ===============================
// Action Type Table
// create Action type
module.exports.createActionType = async (req, res, next) => {
    let actionType = req.body.actionType;
    let tableName = req.body.tableName;
    let itemIDType = req.body.itemIDType;
    let fieldName = req.body.fieldName;

    return auditTrailModel
        .createActionType(actionType, tableName, itemIDType, fieldName)
        .then(() => {
            return res.status(201).send(`Action Type Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Unknown Error`);
        });

};

// ===============================
// get transaction data
module.exports.getALLTransactions = async (req, res, next) => {
    return auditTrailModel
        .getALLTransactions()
        .then((result) => {
            if (result == null) {
                res.status(404).send(`There are no Transactions Available!`);
            }
            else {
                res.status(200).send(result);
            }
        });
};