const connection = require('../db');

const purchaseReqDB = {
    // ===============================
    // PR
    // add PR
    addPR: async(targetDeliveryDate, userID, supplierID, paymentModeID, remarks) => {
        let sql = `INSERT INTO purchaseRequest(targetDeliveryDate, userID, supplierID, paymentModeID, remarks) VALUES (?,?,?,?,?)`;

        return connection.promise()
        .query(sql, [targetDeliveryDate, userID, supplierID, paymentModeID, remarks])
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },

    // get all PR
    getAllPR: async() => {
        let sql = `SELECT PR.prID, U.name, GROUP_CONCAT(B.branchName) AS branchName, S.supplierName, PR.prStatusID, PRS.prStatus, PR.apprRemarks
                    FROM purchaseRequest PR, user U, branch B, deliveryLocation DL, supplier S, prStatus PRS
                    WHERE PR.userID = U.userID
                    AND PR.prID = DL.prID
                    AND DL.branchID = B.branchID
                    AND PR.supplierID = S.supplierID
                    AND PR.prStatusID = PRS.prStatusID
                    GROUP BY PR.prID
                    ORDER BY prID asc;`;

        return connection.promise()
        .query(sql)
        .then((result) => {
            if(result[0] == 0){
                return null;
            }
            else{
                return result[0];
            }
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },

    // get PR by userid
    getPRByUserID: async(userID) => {
        let sql = `SELECT PR.prID, PR.userID, U.name, GROUP_CONCAT(B.branchName) AS branchName, S.supplierName, PR.prStatusID, PRS.prStatus, PR.apprRemarks
                    FROM purchaseRequest PR, user U, branch B, deliveryLocation DL, supplier S, prStatus PRS
                    WHERE PR.userID = U.userID
                    AND PR.prID = DL.prID
                    AND DL.branchID = B.branchID
                    AND PR.supplierID = S.supplierID
                    AND PR.prStatusID = PRS.prStatusID
                    AND PR.userID = ?
                    GROUP BY PR.prID
                    ORDER BY prID asc;`;

        return connection.promise()
        .query(sql, [userID])
        .then((result) => {
            if(result[0] == 0){
                return null;
            }
            else{
                return result[0];
            }
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },

    // get PR by PR ID
    getPRByPRID: async(prID) => {
        let sql = `SELECT PR.prID, PR.requestDate, PR.targetDeliveryDate, PR.userID, U.name, GROUP_CONCAT(B.branchName) AS branchName, S.supplierName, PM.paymentMode, PR.remarks, PR.prStatusID, PRS.prStatus, PR.apprRemarks
                    FROM purchaseRequest PR, user U, branch B, deliveryLocation DL, supplier S, paymentMode PM, prStatus PRS
                    WHERE PR.userID = U.userID
                    AND PR.prID = DL.prID
                    AND DL.branchID = B.branchID
                    AND PR.supplierID = S.supplierID
                    AND PR.paymentModeID = PM.paymentModeID
                    AND PR.prStatusID = PRS.prStatusID
                    AND PR.prID = ?
                    GROUP BY PR.prID
                    ORDER BY prID asc;`;

                    // SELECT PR.prID, I.itemName, LI.quantity, I.unitPrice, LI.totalUnitPrice
                    // FROM purchaseRequest PR, item I, lineItem LI
                    // WHERE PR.prID = LI.prID
                    // AND LI.itemID = I.itemID
                    // ORDER BY LI.prID;

        return connection.promise()
        .query(sql, [prID])
        .then((result) => {
            if (result[0] == 0){
                return null;
            }
            else{
                return result[0];
            }
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },

    // get latest PR ID created
    getLatestPRIDByUserID: async(userID) => {
        let sql = `SELECT MAX(prID) AS prID, userID
                    FROM purchaseRequest
                    WHERE userID = ?`;

        return connection.promise()
        .query(sql, [userID])
        .then((result) => {
            if(result[0] == 0){
                return null;
            }
            else{
                return result[0];
            }
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },

    // update PR by PR ID (Approver) ------> approver remarks?
    updatePRStatus: async(prStatusID, prID) => {
        let sql = `UPDATE purchaseRequest SET prStatusID = ? 
                    WHERE prID = ?`;

        return connection.promise()
        .query(sql,[prStatusID,prID])
        .then((result) => {
            if(result[0] == 0){
                return null;
            }
            else{
                return result[0];
            }
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })
    },

    // update PR remarks and status by PR ID (Approver)
    updatePRApprover: async(apprRemarks, prStatusID, prID) => {
        let sql = `UPDATE purchaseRequest SET apprRemarks = ? , prStatusID = ? 
                    WHERE prID = ?`;

        return connection.promise()
        .query(sql,[apprRemarks, prStatusID,prID])
        .then((result) => {
            if(result[0] == 0){
                return null;
            }
            else{
                return result[0];
            }
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })
    },

    // delete PR
    deletePR: async(prID) => {
        let sql = 'DELETE FROM purchaseRequest WHERE prID = ?';

        return connection.promise()
        .query(sql, [prID])
        .then((result) => {
            if(result[0] == 0){
                return null;
            }
            else{
                return result[0];
            }
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },

    // ===============================
    // Line Items
    // add line item
    addLineItem: async(prID, itemID, quantity, totalUnitPrice) => {
        let sql = `INSERT INTO lineItem(prID, itemID, quantity, totalUnitPrice) VALUES (?,?,?,?)`;

        return connection.promise()
        .query(sql, [prID, itemID, quantity, totalUnitPrice])
        .catch((err) => {
            console.log(err);
            throw err;
        })
    },

    // get line item by PR ID
    getLineItemByPRID: async(prID) => {
        let sql = `SELECT LI.lineItemID, LI.prID, LI.itemID, I.itemName, LI.quantity, I.unitPrice, LI.totalUnitPrice
                    FROM lineItem LI, item I
                    WHERE LI.itemID = I.itemID
                    AND LI.prID = ?
                    ORDER BY lineItemID asc`;

        return connection.promise()
        .query(sql, [prID])
        .then((result) => {
            if (result[0] == 0){
                return null;
            }
            else{
                return result[0];
            }
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },

    // ===============================
    // Payment Mode
    // add payment mode
    addPaymentMode: async(paymentMode) => {
        let sql = `INSERT INTO paymentMode(paymentMode) VALUES (?)`;

        return connection.promise()
        .query(sql, [paymentMode])
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },

    // get all payment modes
    getAllPaymentMode: async() => {
        let sql = `SELECT * FROM paymentMode
                    ORDER BY paymentModeID asc`;

        return connection.promise()
        .query(sql)
        .then((result) => {
            if(result[0] == 0){
                return null;
            }
            else{
                return result[0];
            }
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },

    // ===============================
    // Branch
    // add branch
    addBranch: async(branchName, address) => {
        let sql = `INSERT INTO branch(branchName, address) VALUES (?,?)`;

        return connection.promise()
        .query(sql, [branchName, address])
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },

    // get all branch
    getAllBranch: async() => {
        let sql = `SELECT * FROM branch
                    ORDER BY branchID asc`;

        return connection.promise()
        .query(sql)
        .then((result) => {
            if(result[0] == 0){
                return null;
            }
            else{
                return result[0];
            }
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },

    // get branch by id

    // ===============================
    // Delivery Location
    // add deliveryLocation
    addDeliveryLocation: async(prID, branchID) => {
        let sql = `INSERT INTO deliveryLocation(prID, branchID) VALUES (?,?)`;

        return connection.promise()
        .query(sql, [prID, branchID])
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },

    // get all deliveryLocation
    getAllDeliveryLocation: async() => {
        let sql = `SELECT * FROM deliveryLocation
                    ORDER BY deliveryLocationID asc`;

        return connection.promise()
        .query(sql)
        .then((result) => {
            if(result[0] == 0){
                return null;
            }
            else{
                return result[0];
            }
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },

    // get branch by PR ID
    getDeliveryLocationByPRID: async(prID) => {
        let sql = `SELECT PR.prID, DL.branchID, B.branchName
                    FROM deliveryLocation DL, branch B, purchaseRequest PR
                    WHERE PR.prID = DL.prID
                    AND DL.branchID = B.branchID
                    AND DL.prID = ?
                    ORDER BY branchID asc`;

        return connection.promise()
        .query(sql, [prID])
        .then((result) => {
            if (result[0] == 0){
                return null;
            }
            else{
                return result[0];
            }
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },


    // ===============================
    // PR status
    // add PR status
    addPRStatusType: async(prStatus) => {
        let sql = `INSERT INTO prStatus(prStatus) VALUES (?)`;

        return connection.promise()
        .query(sql, [prStatus])
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },

    // get all PR status
    getAllPRStatusType: async() => {
        let sql = `SELECT * FROM prStatus
                    ORDER BY prStatusID asc`;

        return connection.promise()
        .query(sql)
        .then((result) => {
            if(result[0] == 0){
                return null;
            }
            else{
                return result[0];
            }
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },

    // get status by id 


    // ===============================
    // Search Function
    // Search All columns FOR admin / approver
    searchPRAll: async(searchValue) => {

        const selectSQL = `SELECT PR.prID, U.name, GROUP_CONCAT(B.branchName) AS branchName, S.supplierName, PR.prStatusID, PRS.prStatus
                            FROM purchaseRequest PR, user U, branch B, deliveryLocation DL, supplier S, prStatus PRS
                            WHERE PR.prID = DL.prID
                            AND DL.branchID = B.branchID
                            AND PR.userID = U.userID
                            AND PR.supplierID = S.supplierID
                            AND PR.prStatusID = PRS.prStatusID
                            GROUP BY PR.prID;`;

        // Chcek if temp table exists
        const checkPRTempTableQuery = `DROP TABLE IF EXISTS pr_temp_table;`;
        connection.promise().query(checkPRTempTableQuery);

        // // SQL to create temp table
        const createTempTableQuery = `CREATE TEMPORARY TABLE pr_temp_table AS ${selectSQL}`;
        connection.promise().query(createTempTableQuery);

        // SQL to search
        const searchQuery = `SELECT * FROM pr_temp_table 
                                WHERE prID LIKE '%${searchValue}%' 
                                OR name LIKE '%${searchValue}%' 
                                OR branchName LIKE '%${searchValue}%'
                                OR supplierName LIKE '%${searchValue}%'
                                OR prStatus LIKE '%${searchValue}%'
                                ORDER BY prID asc;`;

        return connection.promise()
        .query(searchQuery, [searchValue])
        .then((result) => {
            if(result[0] == 0){
                return null;
            }
            else{
                return result[0];
            }
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },


    // Search All columns for Purchaser by User ID
    searchPRByUserID: async(searchValue, userID) => {

        const selectSQL = `SELECT PR.prID, U.name, GROUP_CONCAT(B.branchName) AS branchName, S.supplierName, PR.prStatusID, PRS.prStatus
                            FROM purchaseRequest PR, user U, branch B, deliveryLocation DL, supplier S, prStatus PRS
                            WHERE PR.prID = DL.prID
                            AND DL.branchID = B.branchID
                            AND PR.userID = U.userID
                            AND PR.supplierID = S.supplierID
                            AND PR.prStatusID = PRS.prStatusID
                            AND PR.userID = ?
                            GROUP BY PR.prID;`;

        // Chcek if temp table exists
        const checkPRTempTableQuery = `DROP TABLE IF EXISTS pr_temp_table;`;
        connection.promise().query(checkPRTempTableQuery);

        // // SQL to create temp table
        const createTempTableQuery = `CREATE TEMPORARY TABLE pr_temp_table AS ${selectSQL}`;
        connection.promise().query(createTempTableQuery, [userID]);

        // SQL to search
        const searchQuery = `SELECT * FROM pr_temp_table 
                                WHERE prID LIKE '%${searchValue}%' 
                                OR name LIKE '%${searchValue}%' 
                                OR branchName LIKE '%${searchValue}%'
                                OR supplierName LIKE '%${searchValue}%'
                                OR prStatus LIKE '%${searchValue}%'
                                ORDER BY prID asc;`;

        return connection.promise()
        .query(searchQuery, [searchValue])
        .then((result) => {
            if(result[0] == 0){
                return null;
            }
            else{
                return result[0];
            }
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },
};

module.exports = purchaseReqDB;