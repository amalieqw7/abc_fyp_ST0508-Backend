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
    createSuppliersCategory: async (fkSupplier_id, fkCategory_id) => {
        const sql = `INSERT INTO suppliersCategory (fkSupplier_id, fkCategory_id) VALUES (?,?)`;

        return connection.promise()
            .query(sql, [fkSupplier_id, fkCategory_id])
            .catch((err) => {
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
        const sql = `SELECT s.supplierID, s.supplierName, s.contactPersonName, s.email, s.phoneNum, s.officeNum, s.address, s.webAddress, s.bankAccountNum, b.bankName, s.bankAccName,
                    GROUP_CONCAT(c.categoryName SEPARATOR ', ') AS "Category"
                    FROM supplier s
                    JOIN suppliersCategory sc ON s.supplierID = sc.fkSupplier_id
                    JOIN category c ON sc.fkCategory_id = c.categoryID
                    JOIN bank b ON s.bankID = b.bankID
                    WHERE supplierID = ?
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

    // retireve all categories
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
                throw err;
            })
    },

    // delete supplier
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
    }
};

module.exports = supplierDB;