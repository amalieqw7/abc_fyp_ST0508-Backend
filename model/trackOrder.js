const connection = require('../db');

const trackOrderDB = {
    // get all track order to display
    getAllTrackOrder: async () => {
        let sql = `SELECT PO.poID, PR.prID, DATE_FORMAT(PR.requestdate, "%d %M %Y") as requestDate, U.name, S.supplierName
              FROM purchaseRequest PR, user U, supplier S, purchaseOrder PO
              WHERE PR.userID = U.userID
              AND PR.supplierID = S.supplierID
              AND PR.prStatusID = 2
              AND PO.prID = PR.prID
              ORDER BY PO.poID`;

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

    // add purchase status
    addPurchaseStatus: async (purchaseStatus) => {
        let sql = `INSERT INTO purchaseStatus(purchaseStatus) VALUES (?)`;

        return connection.promise()
            .query(sql, [purchaseStatus])
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },

    // get all purchase statuses
    getAllPurchaseStatus: async () => {
        let sql = `SELECT purchaseStatus FROM purchaseStatus`;

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

    // insert data into purchase order
    addPurchaseOrder: async (prID, paymentStatusID, purchaseStatusID, ptRemarks) => {
        let sql = `INSERT INTO purchaseOrder(prID) VALUES (?);`;

        return connection.promise()
            .query(sql, [prID])
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },


    // get PO by PO ID
    getPOByPOID: async (poID) => {
        let sql = `SELECT *
                FROM purchaseOrder PO
                WHERE PO.poID = ?
                
                `;

        // SELECT PR.prID, I.itemName, LI.quantity, I.unitPrice, LI.totalUnitPrice
        // FROM purchaseRequest PR, item I, lineItem LI
        // WHERE PR.prID = LI.prID
        // AND LI.itemID = I.itemID
        // ORDER BY LI.prID;

        return connection.promise()
            .query(sql, [poID])
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

    // get purchase order details by PO ID
    getPODByPOID: async (poID) => {
        let sql = `SELECT PR.requestDate, U.name, S.supplierName, B.branchName, payM.paymentMode, PR.remarks
              FROM purchaseOrder PO, purchaseRequest PR, user U, supplier S, branch B, paymentMode payM, deliveryLocation DL
              WHERE PR.prID = DL.prID
              AND DL.branchID = B.branchID
              AND PR.paymentModeID = payM.paymentModeID
              AND PR.supplierID = S.supplierID
              AND PO.prID = PR.prID
              AND U.userID = PR.userID
              AND DL.prID = PR.prID
              AND PO.poID = ?
              `;

        // SELECT PR.prID, I.itemName, LI.quantity, I.unitPrice, LI.totalUnitPrice
        // FROM purchaseRequest PR, item I, lineItem LI
        // WHERE PR.prID = LI.prID
        // AND LI.itemID = I.itemID
        // ORDER BY LI.prID;

        return connection.promise()
            .query(sql, [poID])
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

    // get product details by PO ID
    getPDByPOID: async (poID) => {
        let sql = `SELECT I.itemName, Li.quantity, I.unitPrice, Li.totalUnitPrice, PR.remarks
              FROM item I, lineItem Li, purchaseRequest PR, purchaseOrder PO
              WHERE PR.prID = Li.prID
              AND PO.prID = PR.prID
              AND Li.itemID = I.itemID
              AND PO.poID = ?
              `;

        // SELECT PR.prID, I.itemName, LI.quantity, I.unitPrice, LI.totalUnitPrice
        // FROM purchaseRequest PR, item I, lineItem LI
        // WHERE PR.prID = LI.prID
        // AND LI.itemID = I.itemID
        // ORDER BY LI.prID;

        return connection.promise()
            .query(sql, [poID])
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

    // hello

};

module.exports = trackOrderDB;