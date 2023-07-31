const connection = require('../db');

const purchaseReqDB = {
    // ===============================
    // PR
    // add PR / Adhoc
    addPR: async (purchaseTypeID, targetDeliveryDate, userID, supplierID, paymentModeID, remarks) => {
        if (purchaseTypeID === 1) {
            let sql = `INSERT INTO purchaseRequest(purchaseTypeID,targetDeliveryDate, userID, supplierID, paymentModeID, remarks) VALUES (?,?,?,?,?,?)`;

            return connection.promise()
                .query(sql, [purchaseTypeID, targetDeliveryDate, userID, supplierID, paymentModeID, remarks])
                .catch((err) => {
                    console.log(err);
                    throw err;
                });
        }
        else if (purchaseTypeID === 2) {
            let sql = `INSERT INTO purchaseRequest(purchaseTypeID, userID, remarks) VALUES (?,?,?)`;

            return connection.promise()
                .query(sql, [purchaseTypeID, userID, remarks])
                .catch((err) => {
                    console.log(err);
                    throw err;
                });
        }
    },

    // get all PR
    getAllPR: async () => {
        let sql = `SELECT PR.purchaseTypeID, PT.purchaseType, PR.requestDate, PR.prID, U.name, PR.targetDeliveryDate, GROUP_CONCAT(B.branchName) AS branchName, S.supplierName, PR.prStatusID, PRS.prStatus, PR.apprRemarks
                    FROM purchaseRequest PR, user U, branch B, deliveryLocation DL, supplier S, prStatus PRS, purchaseType PT
                    WHERE PR.userID = U.userID
                    AND PR.purchaseTypeID = PT.purchaseTypeID
                    AND PR.prID = DL.prID
                    AND DL.branchID = B.branchID
                    AND PR.supplierID = S.supplierID
                    AND PR.prStatusID = PRS.prStatusID
                    AND PR.purchaseTypeID = 1
                    GROUP BY PR.prID
                    ORDER BY prID asc;`;

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

    // get PR by userid
    getPRByUserID: async (userID) => {
        let sql = `SELECT PR.purchaseTypeID, PT.purchaseType, PR.requestDate, PR.prID, PR.userID, U.name, PR.targetDeliveryDate, GROUP_CONCAT(B.branchName) AS branchName, S.supplierName, PR.prStatusID, PRS.prStatus, PR.apprRemarks
                    FROM purchaseRequest PR, user U, branch B, deliveryLocation DL, supplier S, prStatus PRS, purchaseType PT
                    WHERE PR.userID = U.userID
                    AND PR.purchaseTypeID = PT.purchaseTypeID
                    AND PR.prID = DL.prID
                    AND DL.branchID = B.branchID
                    AND PR.supplierID = S.supplierID
                    AND PR.prStatusID = PRS.prStatusID
                    AND PR.purchaseTypeID = 1
                    AND PR.userID = ?
                    GROUP BY PR.prID
                    ORDER BY prID asc;`;

        return connection.promise()
            .query(sql, [userID])
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

    // get PR by PR ID
    getPRByPRID: async (prID) => {
        let sql = `SELECT PR.prID, PR.requestDate, PR.targetDeliveryDate, PR.userID, U.name, GROUP_CONCAT(B.branchID) AS branchIDs, GROUP_CONCAT(B.branchName) AS branchName, PR.supplierID, S.supplierName, PR.paymentModeID, PM.paymentMode, PR.remarks, PR.prStatusID, PRS.prStatus, PR.apprRemarks, S.contactPersonName AS SPerson, S.email AS SEmail, S.phoneNum AS SPhoneNum, S.officeNum AS SOfficeNum, S.address AS SAddress, GROUP_CONCAT(B.address) AS branchAddress, GROUP_CONCAT(B.branchPrefix) AS branchPrefix, GROUP_CONCAT(B.unitNum) AS branchUnitNum, GROUP_CONCAT(B.postalCode) AS branchPostalCode, GROUP_CONCAT(B.officeNum) AS branchContact, GROUP_CONCAT(B.officeEmail) AS branchEmail, U.email AS UEmail
                    FROM purchaseRequest PR, user U, branch B, deliveryLocation DL, supplier S, paymentMode PM, prStatus PRS
                    WHERE PR.userID = U.userID
                    AND PR.prID = DL.prID
                    AND DL.branchID = B.branchID
                    AND PR.supplierID = S.supplierID
                    AND PR.paymentModeID = PM.paymentModeID
                    AND PR.prStatusID = PRS.prStatusID
                    AND PR.purchaseTypeID = 1
                    AND PR.prID = ?
                    GROUP BY PR.prID
                    ORDER BY prID asc;`;

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

    // get latest PR ID created
    getLatestPRIDByUserID: async (userID) => {
        let sql = `SELECT MAX(prID) AS prID, userID
                    FROM purchaseRequest
                    WHERE userID = ?`;

        return connection.promise()
            .query(sql, [userID])
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

    // update PR by PR ID (Approver) ------> approver remarks?
    updatePRStatus: async (prStatusID, apprUserID, prID) => {
        let sql = `UPDATE purchaseRequest SET prStatusID = ?, apprUserID = ? 
                    WHERE prID = ?`;

        return connection.promise()
            .query(sql, [prStatusID, apprUserID, prID])
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

    // update PR remarks and status by PR ID (Approver)
    updatePRApprover: async (apprRemarks, prStatusID, apprUserID, prID) => {
        let sql = `UPDATE purchaseRequest SET apprRemarks = ? , prStatusID = ?, apprUserID = ? 
                    WHERE prID = ?`;

        return connection.promise()
            .query(sql, [apprRemarks, prStatusID, apprUserID, prID])
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

    // update approver comments
    updateApprComments: async (apprRemarks, prID) => {
        let sql = `UPDATE purchaseRequest SET apprRemarks = ?
                    WHERE prID = ?`;

        return connection.promise()
            .query(sql, [apprRemarks, prID])
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

    // delete PR
    deletePR: async (prID) => {
        let sql = 'DELETE FROM purchaseRequest WHERE prID = ?';

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

    // get All Ad Hoc Purchases
    getAllAdHoc: async () => {
        let sql = `SELECT PR.purchaseTypeID, PT.purchaseType, PR.requestDate, PR.prID, U.name, PR.targetDeliveryDate, PR.remarks, PR.prStatusID, PRS.prStatus, PR.apprRemarks
                    FROM purchaseRequest PR, user U, prStatus PRS, purchaseType PT
                    WHERE PR.userID = U.userID
                    AND PR.purchaseTypeID = PT.purchaseTypeID
                    AND PR.prStatusID = PRS.prStatusID
                    AND PR.purchaseTypeID = 2
                    ORDER BY prID asc;`;

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

    // get ad hoc purchases by userid
    getAdHocByUserID: async (userId) => {
        let sql = `SELECT PR.purchaseTypeID, PT.purchaseType, PR.requestDate, PR.prID, U.name, PR.targetDeliveryDate, PR.remarks, PR.prStatusID, PRS.prStatus, PR.apprRemarks
                    FROM purchaseRequest PR, user U, prStatus PRS, purchaseType PT
                    WHERE PR.userID = U.userID
                    AND PR.purchaseTypeID = PT.purchaseTypeID
                    AND PR.prStatusID = PRS.prStatusID
                    AND PR.purchaseTypeID = 2
                    AND PR.userID = ?
                    ORDER BY prID asc;`;

        return connection.promise()
            .query(sql, [userId])
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

    // get ad hoc purchases by PR ID
    getAdHocByPRID: async (prID) => {
        let sql = `SELECT PR.prID, PR.requestDate, PR.targetDeliveryDate, PR.userID, U.name, PR.remarks, PR.prStatusID, PRS.prStatus, PO.totalPrice
                    FROM purchaseRequest PR, user U, prStatus PRS, purchaseOrder PO
                    WHERE PR.userID = U.userID
                    AND PR.prStatusID = PRS.prStatusID
                    AND PR.prID = PO.prID
                    AND PR.prID = ?`;

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

    // ===============================
    // Line Items
    // add line item
    addLineItem: async (prID, itemID, quantity, totalUnitPrice) => {
        let sql = `INSERT INTO lineItem(prID, itemID, quantity, totalUnitPrice) VALUES (?,?,?,?)`;

        return connection.promise()
            .query(sql, [prID, itemID, quantity, totalUnitPrice])
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

    // get line item by PR ID
    getLineItemByPRID: async (prID) => {
        let sql = `SELECT LI.lineItemID, LI.prID, LI.itemID, I.itemName, LI.quantity, I.unitPrice, LI.totalUnitPrice, LI.qtyReceived
                    FROM lineItem LI, item I
                    WHERE LI.itemID = I.itemID
                    AND LI.prID = ?
                    ORDER BY lineItemID asc`;

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

    // update qtyReceived in lineItems table
    updateQtyReceived: async (qtyReceived, lineItemID) => {
        let sql = `UPDATE lineItem SET qtyReceived = ?
                    WHERE lineItemID = ?`;

        return connection.promise()
            .query(sql, [qtyReceived, lineItemID])
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

    // ===============================
    // GST
    // add gst
    addGST: async (gst) => {
        let sql = `INSERT INTO gst(gst) VALUES (?)`;

        return connection.promise()
            .query(sql, [gst])
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

    // get gst by pr created date
    getPRGST: async (date) => {
        let sql = `SELECT *
                    FROM gst
                    WHERE '${date}' >= startDate
                    AND ('${date}' <= endDate OR endDate IS NULL);`;

        return connection.promise()
            .query(sql)
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

    // get gst by ID
    getGSTByID: async (id) => {
        let sql = `SELECT *
                    FROM gst
                    WHERE id = ?`;

        return connection.promise()
            .query(sql, [id])
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
    // Payment Mode
    // add payment mode
    addPaymentMode: async (paymentMode) => {
        let sql = `INSERT INTO paymentMode(paymentMode) VALUES (?)`;

        return connection.promise()
            .query(sql, [paymentMode])
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },

    // get all payment modes
    getAllPaymentMode: async () => {
        let sql = `SELECT * FROM paymentMode
                    ORDER BY paymentModeID asc`;

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

    // ===============================
    // Branch
    // add branch
    addBranch: async (branchName, branchPrefix, address, unitNum, postalCode, officeNum, officeEmail) => {
        let sql = `INSERT INTO branch(branchName, branchPrefix, address, unitNum, postalCode, officeNum, officeEmail) VALUES (?,?,?,?,?,?,?)`;

        return connection.promise()
            .query(sql, [branchName, branchPrefix, address, unitNum, postalCode, officeNum, officeEmail])
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },

    // get all branch
    getAllBranch: async () => {
        let sql = `SELECT * FROM branch
                    ORDER BY branchID asc`;

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

    // get branch by id

    // ===============================
    // Delivery Location
    // add deliveryLocation
    addDeliveryLocation: async (prID, branchID) => {
        let sql = `INSERT INTO deliveryLocation(prID, branchID) VALUES (?,?)`;

        return connection.promise()
            .query(sql, [prID, branchID])
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },

    // get all deliveryLocation
    getAllDeliveryLocation: async () => {
        let sql = `SELECT * FROM deliveryLocation
                    ORDER BY deliveryLocationID asc`;

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

    // get branch by PR ID
    getDeliveryLocationByPRID: async (prID) => {
        let sql = `SELECT PR.prID, DL.branchID, B.branchName
                    FROM deliveryLocation DL, branch B, purchaseRequest PR
                    WHERE PR.prID = DL.prID
                    AND DL.branchID = B.branchID
                    AND DL.prID = ?
                    ORDER BY branchID asc`;

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


    // ===============================
    // PR status
    // add PR status
    addPRStatusType: async (prStatus) => {
        let sql = `INSERT INTO prStatus(prStatus) VALUES (?)`;

        return connection.promise()
            .query(sql, [prStatus])
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },

    // get all PR status
    getAllPRStatusType: async () => {
        let sql = `SELECT * FROM prStatus
                    ORDER BY prStatusID asc`;

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

    // get status by id 


    // ===============================
    // Search Function
    // Search All columns FOR admin / approver
    searchPRAll: async (searchValue) => {

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


    // Search All columns for Purchaser by User ID
    searchPRByUserID: async (searchValue, userID) => {

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

    // Dynamic search 
    searchPRDynamic: async (searchValue, ByUserID, UserID, PurchaseType, PTID, ByUserName, ByReqDate, ByTargetDate, ByBranchName, BySupplierName, ByPaymentMode, ByRemarks, ByPRStatus) => {

        let selectSQL = ``;

        if (PTID === 1) {
            selectSQL += `SELECT PR.prID, PR.purchaseTypeID, PT.purchaseType, PR.requestDate, U.name, PR.targetDeliveryDate, GROUP_CONCAT(B.branchName) AS branchName, S.supplierName, PM.paymentMode, PR.prStatusID, PRS.prStatus
                            FROM purchaseRequest PR, purchaseType PT, user U, branch B, deliveryLocation DL, supplier S, prStatus PRS, paymentMode PM
                            WHERE PR.prID = DL.prID
                            AND PR.purchaseTypeID = PT.purchaseTypeID
                            AND DL.branchID = B.branchID
                            AND PR.userID = U.userID
                            AND PR.supplierID = S.supplierID
                            AND PR.paymentModeID = PM.paymentModeID
                            AND PR.prStatusID = PRS.prStatusID`;
        }
        else if (PTID === 2) {
            selectSQL += `SELECT PR.prID, PR.purchaseTypeID, PT.purchaseType, PR.requestDate, U.name, PR.targetDeliveryDate, PR.remarks, PR.prStatusID, PRS.prStatus
                            FROM purchaseRequest PR, purchaseType PT, user U, prStatus PRS
                            WHERE PR.purchaseTypeID = PT.purchaseTypeID
                            AND PR.userID = U.userID
                            AND PR.prStatusID = PRS.prStatusID`;
        };

        if (ByUserID === true) {
            selectSQL += ` \n AND PR.userID = ${UserID}`;
        };

        if (PurchaseType === true) {
            selectSQL += ` \n AND PR.purchaseTypeID = ${PTID}`;
        };

        selectSQL += ` \n GROUP BY PR.prID;`;

        // Check if temp table exists
        const checkPRTempTableQuery = `DROP TABLE IF EXISTS pr_temp_table;`;
        connection.promise().query(checkPRTempTableQuery);

        // QL to create temp table
        const createTempTableQuery = `CREATE TEMPORARY TABLE pr_temp_table AS ${selectSQL}`;
        connection.promise().query(createTempTableQuery);

        // SQL to search
        let searchQuery = `SELECT * FROM pr_temp_table 
                                WHERE prID LIKE '%${searchValue}%'`;

        if (ByUserName === true) {
            searchQuery += ` \n OR name LIKE '%${searchValue}%'`;
        };

        if (ByReqDate === true) {
            searchQuery += ` \n OR requestDate LIKE '%${searchValue}%'`;
        };

        if (ByTargetDate === true) {
            searchQuery += ` \n OR targetDeliveryDate LIKE '%${searchValue}%'`;
        };

        if (ByBranchName === true) {
            searchQuery += ` \n OR branchName LIKE '%${searchValue}%'`;
        };

        if (BySupplierName === true) {
            searchQuery += ` \n OR supplierName LIKE '%${searchValue}%'`;
        };

        if (ByPaymentMode === true) {
            searchQuery += ` \n OR paymentMode LIKE '%${searchValue}%'`;
        };

        if (ByPRStatus === true) {
            searchQuery += ` \n OR prStatus LIKE '%${searchValue}%'`;
        };

        if (ByRemarks === true) {
            searchQuery += ` \n OR remarks LIKE '%${searchValue}%'`;
        };

        searchQuery += ` \n ORDER BY prID asc;`;

        console.log(searchQuery)

        return connection.promise()
            .query(searchQuery, [searchValue])
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
};

module.exports = purchaseReqDB;