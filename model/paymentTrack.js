const connection = require('../db');

const paymentTrackDB = {
    //create status
    createPaymentStatus: async(status) => {
        let sql = 'INSERT INTO paymentStatus (paymentStatus) VALUES (?)';
        return connection.promise()
        .query(sql, [status])
        .catch((err) => {
            console.log(err)
            throw err;
        })
    },

    //get payment status by id
    getPaymentStatusById: async(statusid) => {
        let sql = 'SELECT paymentStatus FROM paymentStatus WHERE paymentStatusID = ?';

        return connection.promise()
        .query(sql, [statusid])
        .then((result) => {
            if (result.length == 0) {
                return null;
            }
            else {
                return result[0]
            }
        })
        .catch((err) => {
            console.log(err);
            return err;
        })
    },

    //get all payment status
    getAllPaymentStatus: async() => {
        let sql = 'SELECT paymentStatus from paymentStatus';

        return connection.promise()
        .query(sql)
        .then((result) => {
            console.log("gets all statuses");

            if (result.length == 0) {
                return null;
            }
            else {
                return result[0];
            }
        })
        .catch((err) => {
            console.log(err);
            return err;
        })
    },

    //update payment status
    updatePaymentStatusByID: async(statusID, paymentStatus) => {
        let sql = 'UPDATE paymentStatus SET paymentStatus = ? WHERE paymentStatusID = ?';

        return connection.promise()
        .query(sql, [paymentStatus, statusID, ])
        .catch((err) => {
            console.log(err);
            throw err;
        })
    },

    //delete payment status 
    deletePaymentStatusByID: async(statusid) => {
        let sql = 'DELETE FROM paymentStatus WHERE paymentStatusID = ?';

        return connection.promise()
        .query(sql, [statusid])
        .then((result) => {
            if (result.length == 0) {
                return null;
            } 
            else {
                return result[0]
            }
        })
        .catch((err) => {
            console.log(err);
            return err
        })
    },

    //get supplier information 
    getSupplierInformationByName: async(supplierName) => {
        const sql = `SELECT s.supplierName, s.contactPersonName, s.phoneNum, s.email, s.bankAccountNum, s.officeNum, s.address, GROUP_CONCAT(c.categoryName SEPARATOR ', ') as categoryName
        FROM supplier s
        JOIN suppliersCategory sc ON s.supplierID = sc.fkSupplier_id
        JOIN category c ON sc.fkCategory_id = c.categoryID
        WHERE s.supplierName = ?
        GROUP BY s.supplierID`

        return connection.promise()
        .query(sql, [supplierName])
        .then((result) => {
            if (result.length == 0) {
                return null;
            }
            else {
                return result[0]
            }
        })
        .catch((err) => {
            console.log(err);
            return err;
        })
    },

    getSupplierInformationByID: async(id) =>{
        const sql = `SELECT s.supplierName, s.contactPersonName, s.phoneNum, s.email, s.bankAccountNum, s.officeNum, s.address, b.bankName as bankNamee, GROUP_CONCAT(c.categoryName SEPARATOR ', ') as categoryName
        FROM supplier s
        JOIN suppliersCategory sc ON s.supplierID = sc.fkSupplier_id
        JOIN category c ON sc.fkCategory_id = c.categoryID
        JOIN bank b ON s.bankID = b.bankID 
        WHERE s.supplierID = 2
        GROUP BY s.supplierID`;

        return connection.promise()
        .query(sql, [id])
        .then((result) => {
            if (result.length == 0) {
                return null;
            }
            else {
                return result[0]
            }
        })
        .catch((err) => {
            console.log(err)
            return err;
        })
    },

    getSIDbyPRID: async(prID) => {
        const sql = `SELECT s.supplierID, s.supplierName
        FROM purchaseRequest AS pr
        JOIN supplier AS s ON pr.supplierID = s.supplierID
        WHERE pr.prID = ?`;

        return connection.promise()
        .query(sql, [prID])
        .then((result) => {
            if (result.length == 0) {
                return null;
            } else {
                return result[0]
            }
        })
        .catch((err) => {
            console.log(err)
            return err;
        })
    },

    getIDbyStatus: async(status) => {
        const sql = `SELECT PaymentStatusID FROM paymentStatus WHERE paymentStatus = ?`;

        return connection.promise()
        .query(sql, [status])
        .then((result) => {
            if (result.length == 0) {
                return null;
            } else {
                return result[0]
            }
        })
        .catch((err) => {
            console.log(err)
            return err;
        })
    },


    saveReceipt: async(prID, pdfData) => {
        const sql = `UPDATE purchaseOrder SET ptReceipt = ? WHERE prID = ? `;

        return connection.promise()
        .query(sql, [prID, pdfData])
        .then(() => {
            console.log('receipt  saved successfully');
        })
        .catch((err) => {
            console.error('error saving receipt: ', err);
        })
    },


}

module.exports = paymentTrackDB;