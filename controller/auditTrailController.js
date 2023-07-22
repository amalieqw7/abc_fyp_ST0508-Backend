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


// ===============================
// Action Type Table
// create Action type
module.exports.createActionType = async (req, res, next) => {
    let actionType = req.body.actionType;
    let tableName = req.body.tableName;
    let fieldName = req.body.fieldName;

    return auditTrailModel
        .createActionType(actionType, tableName, fieldName)
        .then(() => {
            return res.status(201).send(`Action Type Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Unknown Error`);
        });

};