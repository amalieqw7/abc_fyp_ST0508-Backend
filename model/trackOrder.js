const connection = require('../db');

const trackOrderDB = {
    // get all track order to display
    getAllTrackOrder: async () => {
        let sql = `SELECT PO.poID, PR.prID, DATE_FORMAT(PR.requestdate, "%d %M %Y") as requestDate, U.name, S.supplierName, PO.purchaseStatusID, PS.purchaseStatus
              FROM purchaseRequest PR, user U, supplier S, purchaseOrder PO, purchaseStatus PS
              WHERE PR.userID = U.userID
              AND PR.supplierID = S.supplierID
              AND PR.prStatusID = 2
              AND PO.prID = PR.prID
              AND PO.purchaseStatusID = PS.purchaseStatusID
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
        let sql = `SELECT * FROM purchaseStatus`;

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
    addPurchaseOrder: async (prID) => {
        let sql = `INSERT INTO purchaseOrder(prID) VALUES (?);`;

        return connection.promise()
            .query(sql, [prID])
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },

    // update PO Total Price //? for adhoc purchases
    updatePOTotalPrice: async (totalPrice, prID) => {
        let sql = `UPDATE purchaseOrder SET totalPrice = ? 
                    WHERE prID = ?`;

        return connection.promise()
            .query(sql, [totalPrice, prID])
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
    getPODByPRID: async (prID) => {
        let sql = `SELECT PO.poID, PR.prID, PR.requestDate, U.name, S.supplierName, B.branchName, payM.paymentMode, PR.remarks, PO.purchaseStatusID, PS.purchaseStatus, PO.paymentStatusID, PTS.paymentStatus, PO.totalPrice
              FROM purchaseOrder PO, purchaseRequest PR, user U, supplier S, branch B, paymentMode payM, deliveryLocation DL, purchaseStatus PS, paymentStatus PTS
              WHERE PR.prID = DL.prID
              AND DL.branchID = B.branchID
              AND PR.paymentModeID = payM.paymentModeID
              AND PR.supplierID = S.supplierID
              AND PO.prID = PR.prID
              AND U.userID = PR.userID
              AND DL.prID = PR.prID
              AND PO.purchaseStatusID = PS.purchaseStatusID
              AND PO.paymentStatusID = PTS.paymentStatusID
              AND PO.prID = ?
              `;

        return connection.promise()
            .query(sql, [prID])
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
        let sql = `SELECT I.itemName, Li.quantity, I.unitPrice, Li.totalUnitPrice, PO.qtyReceived, PR.remarks
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

    // update PO dropdown status by id
    updatePOByPoId: async (purchaseStatusID, poID) => {
        let sql = `UPDATE purchaseOrder 
        SET purchaseStatusID = ?
        WHERE poID = ?`

        return connection.promise()
            .query(sql, [purchaseStatusID, poID])
            .then((result) => {
                console.log(result);
                if (result.length == 0) {
                    return null;
                }
                else {
                    console.log(result[0]);
                    return result[0];
                }
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },

    getPOstatusbyID: async (poID) => {
        let sql = `SELECT PS.purchaseStatusID, PS.purchaseStatus
            FROM purchaseOrder PO, purchaseStatus PS
            WHERE PO.purchaseStatusID = PS.purchaseStatusID
            AND PO.poID = ?
            `;

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

    // add quantity received (full or partial received)
    updateQtyReceived: async (qtyReceived, poID) => {
        let sql = `UPDATE purchaseOrder 
        SET qtyReceived = ?
        WHERE poID = ?`;

        return connection.promise()
            .query(sql, [qtyReceived, poID])
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },

    // get purchase statuses
    getPurchaseStatuses: async () => {
        let sql = `SELECT PS.purchaseStatus, 
            COUNT(*) AS order_count
            FROM purchaseOrder PO, purchaseStatus PS
            WHERE PO.purchaseStatusID = PS.purchaseStatusID
            GROUP BY PO.purchaseStatusID
            ORDER BY PS.purchaseStatusID
            `;

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

    // get number of PR as of date
    getPRAmount: async () => {
        let sql = `SELECT COUNT(*) AS PR_count
                    FROM purchaseRequest PR
                    `;

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

    // get number of PO as of date
    getPOAmount: async () => {
        let sql = `SELECT COUNT(*) AS PO_count
                    FROM purchaseOrder PO
                    `;

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

    // search bar
    searchBar: async (searchValue) => {
        let sql = `SELECT *
                  FROM purchaseOrder PO
                  WHERE prID LIKE '${searchValue}'`;

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
    //saving invoice
    saveInvoice: async (fileBuffer, prID) => {
        const sql = `UPDATE purchaseOrder SET invoice = ? WHERE prID = ?`;

        return connection.promise()
            .query(sql, [fileBuffer, prID])
            .then(() => {
                console.log('Invoice saved successfully');
            })
            .catch((err) => {
                console.error('Error saving invoice:', err);
            });
    },

    //saving DO
    saveDOrder: async (fileBuffer, prID) => {
        const sql = `UPDATE purchaseOrder SET deliveryOrder = ? WHERE prID = ?`;

        return connection.promise()
            .query(sql, [fileBuffer, prID])
            .then(() => {
                console.log('Delivery Order saved successfully');
            })
            .catch((err) => {
                console.error('Error saving Delivery Order:', err);
            });
    },

    //fetch invoice 
    getInvoice: async (prID) => {
        const sql = `SELECT invoice FROM purchaseOrder WHERE prID = ?`;

        return connection.promise()
            .query(sql, [prID])
            .then(([rows]) => {
                if (rows.length === 0) {
                    return null;
                }
                return rows[0].invoice;
            })
            .catch((err) => {
                console.error('error fetching invoice', err);
                throw err;
            });
    }


};

module.exports = trackOrderDB;