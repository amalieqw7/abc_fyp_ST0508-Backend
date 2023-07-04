const connection = require('../db');

const purchaseOrderDB = {
    //get all purchase order to display
    getAllPO: async () => {
        let sql = `SELECT purchaseRequest.prID, purchaseRequest.requestDate, (SUM(lineItem.totalUnitPrice) * 1.08) AS 'Price',
        paymentMode.paymentMode, supplier.supplierName, COALESCE(paymentStatus.paymentStatus, 'Pending') AS 'Status'
 FROM purchaseRequest
 INNER JOIN paymentMode ON purchaseRequest.paymentModeID = paymentMode.paymentModeID
 INNER JOIN supplier ON purchaseRequest.supplierID = supplier.supplierID
 LEFT JOIN lineItem ON purchaseRequest.prID = lineItem.prID
 LEFT JOIN purchaseOrder ON purchaseRequest.prID = purchaseOrder.prID
 LEFT JOIN paymentStatus ON purchaseOrder.paymentStatusID = paymentStatus.paymentStatusID
 WHERE purchaseRequest.prStatusID = 2
 GROUP BY purchaseRequest.prID;`;

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

    getPObyID: async (poID) => {
        let sql = `SELECT purchaseRequest.prID, purchaseRequest.requestDate, (SUM(lineItem.totalUnitPrice) * 1.08) AS 'Price',
        paymentMode.paymentMode, supplier.supplierName, COALESCE(paymentStatus.paymentStatus, 'Pending') AS 'Status'
 FROM purchaseRequest
 INNER JOIN paymentMode ON purchaseRequest.paymentModeID = paymentMode.paymentModeID
 INNER JOIN supplier ON purchaseRequest.supplierID = supplier.supplierID
 LEFT JOIN lineItem ON purchaseRequest.prID = lineItem.prID
 LEFT JOIN purchaseOrder ON purchaseRequest.prID = purchaseOrder.prID
 LEFT JOIN paymentStatus ON purchaseOrder.paymentStatusID = paymentStatus.paymentStatusID
 WHERE purchaseRequest.prID = ? AND purchaseRequest.prStatusID = 2
 GROUP BY purchaseRequest.prID;`;

        return connection.promise()
            .query(sql, [poID])
            .then((result) => {
                if (result[0] == 0) {
                    return null;
                }
                else {
                    return result[0]
                }
            })
            .catch((err) => {
                console.log(err)
                throw err;
            });

    },

    savePO: async (poID) => {
        let sql = `INSERT INTO purchaseOrder (poID, prID, paymentStatusID, purchaseStatusID, invoice, deliveryOrder, qtyReceived, ptRemarks, ptReceipt)
        VALUES (?,?,?,?,?,?,?,?,?)`;

        return connection.promise()
            .query(sql, [poID, prID, paymentStatusID, purchaseStatusID, invoice, deliveryOrder, qtyReceived, ptRemarks, ptReceipt])
            .catch((err) => {
                console.log(err)
            })
    },

    updatePaymentStatus: async (paymentStatusID,prID) => {
        let sql = `UPDATE purchaseOrder SET paymentStatusID = ? WHERE prID = ?`;

        return connection.promise()
            .query(sql, [paymentStatusID, prID])
            .then((result) => {
                if (result[0] == 0) {
                    return null;
                }
                else {
                    return result[0];
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },

    updateRemarks: async (ptRemarks, prID) => {
        let sql = `UPDATE purchaseOrder SET ptRemarks = ? WHERE prID = ?`;

        return connection.promise()
            .query(sql, [ptRemarks, prID])
            .then((result) => {
                if (result[0] == 0) {
                    return null;
                }
                else {
                    return result[0];
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },

    getRemarks: async (prID) => {
        let sql = `SELECT ptRemarks FROM purchaseOrder WHERE prID = ?`

        return connection.promise()
        .query(sql, [prID])
        .then((result) => {
            if(result[0] == 0) {
                return null;
            }
            else {
                return result[0];
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    
};

module.exports = purchaseOrderDB;