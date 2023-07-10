const connection = require('../db');

const supplierDB = {

    // insert bank name
    insertBank: async (bankName) => {
        const sql = `INSERT INTO bank (bankName) VALUES (?)`;

        return connection.promise()
            .query(sql, [bankName])
            .catch((err) => {
                throw err;
            })
    },

    // retireve all bank names
    getAllBankNames: async() => {
        const sql = `SELECT bank.bankID, bank.bankName
                    FROM bank          
                    ORDER BY bankID ASC`;

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
        })
    },

    // create category
    createCategory: async (categoryName) => {
        const sql = `INSERT INTO category (categoryName) VALUES (?)`;

        return connection.promise()
            .query(sql, [categoryName])
            .catch((err) => {
                throw err;
            })
    },

    // create supplier
    createSupplier: async (supplierName, email, officeNum, webAddress, bankAccName, contactPersonName, phoneNum, address, bankAccountNum, bankID) => {
        const sql = `INSERT INTO supplier (supplierName, email, officeNum, webAddress, bankAccName, contactPersonName, phoneNum, address, bankAccountNum, bankID) VALUES (?,?,?,?,?,?,?,?,?,?)`;

        return connection.promise()
            .query(sql, [supplierName, email, officeNum, webAddress, bankAccName, contactPersonName, phoneNum, address, bankAccountNum, bankID])
            .catch((err) => {
                throw err;
            })
    },

    // create suppliers category
    createSuppliersCategory: async (fkSupplier_id, categoryIDs) => {
        const values = categoryIDs.map(fkCategory_id => [fkSupplier_id, fkCategory_id]);
        const sql = `INSERT INTO suppliersCategory (fkSupplier_id, fkCategory_id) VALUES ?`;

        return connection.promise()
            .query(sql, [values])
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

    // update suppliers category
    editSuppliersCategory: async (fkSupplier_id, categoryIDs) => {
        return new Promise((resolve, reject) => {
            // delete current record first then reinsert the updated one
            const sqlDelete = `DELETE FROM suppliersCategory WHERE fkSupplier_id = ?`;
            const id = [fkSupplier_id];

            connection.query(sqlDelete, id, (err) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    const sqlInsert = `INSERT INTO suppliersCategory (fkSupplier_id, fkCategory_id) VALUES ?`;
                    const values = categoryIDs.map(fkCategory_id => [fkSupplier_id, fkCategory_id]);

                    connection.query(sqlInsert, [values], (err) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            resolve();
                        }
                    })
                }
            })
        })
    },

    // retrieve the latest supplierID and name
    getLatestSupplierID: async () => {
        const sql = `SELECT supplierID, supplierName
                    FROM supplier
                    ORDER BY supplierID DESC
                    LIMIT 1`;

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
            })
    },

    // update suppliers category
    // updateSupplierCategory: async(fkCategory_id, fkSupplier_id) => {
    //     const sql = `UPDATE supplier SET fkCategory_id = ? WHERE fkSupplier_id = ?`;

    //     return connection.promise()
    //         .query(sql, [fkCategory_id, fkSupplier_id])
    //         .catch((err) => {
    //             throw err;
    //         })
    // },

    // retrieve full supplier details by supplierID
    getFullSupplierDetailsByID: async (supplierID) => {
        const sql = `SELECT s.supplierID, s.supplierName, s.contactPersonName, s.email, s.phoneNum, s.officeNum, s.address, s.webAddress, s.bankAccountNum, s.bankID, b.bankName, s.bankAccName,
                    GROUP_CONCAT(c.categoryName SEPARATOR ', ') AS "Category"
                    FROM supplier s
                    JOIN suppliersCategory sc ON s.supplierID = sc.fkSupplier_id
                    JOIN category c ON sc.fkCategory_id = c.categoryID
                    JOIN bank b ON s.bankID = b.bankID
                    WHERE supplierID = ?
                    AND s.isDeleted = 0
                    GROUP BY fkSupplier_id`;

        return connection.promise()
            .query(sql, [supplierID])
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

    // retrieve all suppliers - id, supplier name, contact person name & number, category
    getAllSuppliers: async() => {
        const sql = `SELECT s.supplierID, s.supplierName, s.contactPersonName, s.phoneNum, GROUP_CONCAT(c.categoryName SEPARATOR ', ') AS "Category"
                    FROM supplier s
                    JOIN suppliersCategory sc ON s.supplierID = sc.fkSupplier_id
                    JOIN category c ON sc.fkCategory_id = c.categoryID       
                    GROUP BY supplierID
                    ORDER BY supplierID ASC`;

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
        })
    },

    // retrieve all categories
    getAllCategories: async() => {
        const sql = `SELECT category.categoryID, category.categoryName
                    FROM category          
                    ORDER BY categoryID ASC`;

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
        })
    },

    // update supplier details
    updateSupplierDetails: async(supplierName, email, officeNum, webAddress, bankAccName, contactPersonName, phoneNum, address, bankAccountNum, bankID, supplierID) => {
        const sql = `UPDATE supplier SET supplierName = ?, email = ?, officeNum = ?, webAddress = ?, bankAccName = ?, contactPersonName = ?, phoneNum = ?, address = ?, bankAccountNum = ?, bankID = ? WHERE supplierID = ?`;

        return connection.promise()
            .query(sql, [supplierName, email, officeNum, webAddress, bankAccName, contactPersonName, phoneNum, address, bankAccountNum, bankID, supplierID])
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

    // hard delete supplier
    deleteSupplier: async (supplierID) => {
        const sql = `DELETE supplier, suppliersCategory
                    FROM supplier
                    INNER JOIN suppliersCategory ON suppliersCategory.fkSupplier_id = supplier.supplierID
                    WHERE supplier.supplierID = ?`;

        return connection.promise()
            .query(sql, [supplierID])
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

    // soft delete supplier
    testDeleteSupplier: async (supplierID) => {
        const sql = `UPDATE supplier SET isDeleted = 1 WHERE supplierID = ?`;

        return connection.promise()
            .query(sql, [supplierID])
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

    // soft delete suppliers category
    deleteSuppliersCategory: async (fkSupplier_id) => {
        const sql = `UPDATE suppliersCategory SET isDeleted = 1 WHERE fkSupplier_id = ?`;

        return connection.promise()
            .query(sql, [fkSupplier_id])
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

};

module.exports = supplierDB;