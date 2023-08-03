const connection = require('../db');

const auditTrailDB = {
    // ===============================
    // Audit Log Table
    // create Audit log
    createAuditLog: async (timestamp, userID, actionTypeID, itemId, newValue, oldValue) => {
        let sql = `INSERT INTO auditLog(timestamp, userID, actionTypeID, itemId, newValue, oldValue) VALUES (?,?,?,?,?,?)`;

        return connection.promise()
            .query(sql, [timestamp, userID, actionTypeID, itemId, newValue, oldValue])
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },

    // get all audit Log
    getAuditLogs: async () => {
        let sql = `SELECT AL.id, AL.timestamp, AL.userID, U.name,R.role, AL.actionTypeID, AT.actionType, AT.tableName, AT.itemIDType, AT.valueChanged_fieldName, AL.itemId, AL.newValue, AL.oldValue
                    FROM auditLog AL, actionType AT, user U, role R
                    WHERE AL.actionTypeID = AT.id
                    AND AL.userID = U.userID
                    AND U.roleID = R.roleID
                    ORDER BY id asc`;

        return connection.promise()
            .query(sql)
            .then((result) => {
                if (result[0] == 0) {
                    return null;
                }
                else {
                    return result[0];
                }
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },

    // get audit log by item ID
    getAuditLogByItemID: async (actionTypeID, itemId, newValue) => {
        let sql = `SELECT AL.id, AL.timestamp, AL.userID, AL.actionTypeID,AT.actionType, AT.tableName, AT.itemIDType, AL.itemId, AT.valueChanged_fieldName, AL.newValue, AL.oldValue
                    FROM auditLog AL, actionType AT
                    WHERE AL.actionTypeID = AT.id
                    AND AL.actionTypeID = ?
                    AND AL.itemId = ?
                    AND AL.newValue = ?`;

        return connection.promise()
            .query(sql, [actionTypeID, itemId, newValue])
            .then((result) => {
                if (result[0] == 0) {
                    return null;
                }
                else {
                    return result[0];
                };
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },


    // ===============================
    // Action Type Table
    // create Action type
    createActionType: async (actionType, tableName, itemIDType, fieldName) => {
        let sql = `INSERT INTO actionType(actionType, tableName, itemIDType, valueChanged_fieldName) VALUES (?,?,?)`;

        return connection.promise()
            .query(sql, [actionType, tableName, itemIDType, fieldName])
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },

    // get all item
    getAllItem: async () => {
        let sql = `SELECT I.itemID, I.itemName, I.unitPrice, I.supplierID, S.supplierName
                    FROM item I, supplier S
                    WHERE I.supplierID = S.supplierID
                    ORDER BY itemID asc`;

        return connection.promise()
            .query(sql)
            .then((result) => {
                if (result[0] == 0) {
                    return null;
                }
                else {
                    return result[0];
                }
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },

    // get item by itemID
    getItemByItemID: async (itemID) => {
        let sql = `SELECT I.itemID, I.itemName, I.unitPrice, I.supplierID, S.supplierName
                    FROM item I, supplier S
                    WHERE I.supplierID = S.supplierID
                    AND I.itemID = ?
                    ORDER BY itemID asc`;

        return connection.promise()
            .query(sql, [itemID])
            .then((result) => {
                if (result[0] == 0) {
                    return null;
                }
                else {
                    return result[0];
                }
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },

    // update item
    updateItemByItemID: async (itemName, description, supplierID, unitPrice, itemID) => {
        let sql = `UPDATE item SET itemName = ?, description = ?, supplierID = ?, unitPrice = ?
                    WHERE itemID = ?`;

        return connection.promise()
            .query(sql, [itemName, description, supplierID, unitPrice, itemID])
            .then((result) => {
                if (result[0] == 0) {
                    return null;
                }
                else {
                    return result[0];
                }
            })
            .catch((err) => {
                console.log(err);
                throw err;
            })
    }
};

module.exports = auditTrailDB;