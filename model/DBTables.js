// DB Tables creations
const connection = require('../db');

const DBTables = {

    // MAIN
    // Role Table
    initRoleTable: async () => {
        const sql =
            `CREATE TABLE role (
            roleID INT auto_increment,
            role VARCHAR(100) NOT NULL UNIQUE,
            PRIMARY KEY (roleID)
        )`;
        return connection.promise()
            .query(sql)
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

    // User Table
    initUserTable: async () => {
        const sql =
            `CREATE TABLE user (
            userID INT auto_increment,
            roleID INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            PRIMARY KEY (userID)
        )`;
        return connection.promise()
            .query(sql)
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

    // PURCHASE REQUESTS
    // Payment Mode Table
    initPaymentModeTable: async () => {
        const sql =
            `CREATE TABLE paymentMode (
            paymentModeID INT auto_increment,
            paymentMode VARCHAR(100) NOT NULL UNIQUE,
            PRIMARY KEY (paymentModeID)
        )`;
        return connection.promise()
            .query(sql)
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

    // Branch Table
    initBranchTable: async () => {
        const sql =
            `CREATE TABLE branch (
            branchID INT auto_increment,
            branchName VARCHAR(255) NOT NULL UNIQUE,
            branchPrefix VARCHAR(10) NOT NULL UNIQUE,
            address VARCHAR(255) NOT NULL UNIQUE,
            unitNum VARCHAR(45) NOT NULL,
            postalCode VARCHAR(45) NOT NULL,
            officeNum VARCHAR(255) NOT NULL,
            officeEmail  VARCHAR(255) NOT NULL,
            PRIMARY KEY (branchID)
        )`;
        return connection.promise()
            .query(sql)
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

    // PR Status Table
    initPRStatusTable: async () => {
        const sql =
            `CREATE TABLE prStatus (
            prStatusID INT auto_increment,
            prStatus VARCHAR(100) NOT NULL UNIQUE,
            PRIMARY KEY (prStatusID)
        )`;
        return connection.promise()
            .query(sql)
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

    // Purchase Type Table
    initPurchaseTypeTable: async () => {
        const sql =
            `CREATE TABLE purchaseType (
            purchaseTypeID INT auto_increment,
            purchaseType VARCHAR(100) NOT NULL UNIQUE,
            PRIMARY KEY (purchaseTypeID)
        )`;
        return connection.promise()
            .query(sql)
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

    // Purchase Request Table
    initPurchaseRequestTable: async () => {
        const sql =
            `CREATE TABLE purchaseRequest (
            prID INT auto_increment,
            purchaseTypeID INT NOT NULL,
            requestDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            userID INT NOT NULL,
            supplierID INT,
            paymentModeID INT,
            targetDeliveryDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            remarks VARCHAR(500),
            apprRemarks VARCHAR(500),
            apprUserID INT,
            prStatusID INT NOT NULL DEFAULT(1),
            PRIMARY KEY (prID)
        )`;
        return connection.promise()
            .query(sql)
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

    // Delivery Location Table
    initDeliveryLocationTable: async () => {
        const sql =
            `CREATE TABLE deliveryLocation (
            deliveryLocationID INT auto_increment,
            prID INT NOT NULL,
            branchID INT NOT NULL,
            PRIMARY KEY (deliveryLocationID)
        )`;
        return connection.promise()
            .query(sql)
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

    // Item Table
    initItemTable: async () => {
        const sql =
            `CREATE TABLE item (
            itemID INT auto_increment,
            itemName VARCHAR(255) NOT NULL,
            description VARCHAR(500),
            supplierID INT NOT NULL,
            unitPrice DECIMAL(4,2) NOT NULL,
            PRIMARY KEY (itemID)
        )`;
        return connection.promise()
            .query(sql)
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

    // Inventory Table
    initInventoryTable: async () => {
        const sql =
            `CREATE TABLE inventory (
            inventoryID INT auto_increment,
            itemID INT NOT NULL,
            inventoryQTY INT DEFAULT(0) NOT NULL,
            PRIMARY KEY (inventoryID)
        )`;
        return connection.promise()
            .query(sql)
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

    // Line Item Table
    initlineItemTable: async () => {
        const sql =
            `CREATE TABLE lineItem (
            lineItemID INT auto_increment,
            prID INT NOT NULL,
            itemID INT NOT NULL,
            quantity INT NOT NULL,
            totalUnitPrice DECIMAL(4,2) NOT NULL,
            qtyReceived INT DEFAULT(0),
            PRIMARY KEY (lineItemID)
        )`;
        return connection.promise()
            .query(sql)
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

    // GST Table
    initGSTTable: async () => {
        const sql =
            `CREATE TABLE gst (
            id INT auto_increment,
            gst INT NOT NULL,
            startDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            endDate TIMESTAMP,
            PRIMARY KEY (id)
        )`;
        return connection.promise()
            .query(sql)
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

    // SUPPLIER DETAILS
    // Supplier
    initSupplierTable: async () => {
        const sql =
            `CREATE TABLE supplier (
            supplierID INT auto_increment,
            supplierName VARCHAR(255) NOT NULL,
            contactPersonName VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phoneNum VARCHAR(255) NOT NULL,
            officeNum VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            webAddress VARCHAR(255) NULL,
            bankAccountNum VARCHAR(255) NOT NULL,
            bankID VARCHAR(255) NOT NULL,
            bankAccName VARCHAR(255) NOT NULL,
            isDeleted INT NOT NULL DEFAULT 0,
            PRIMARY KEY (supplierID)
        )`;
        return connection.promise()
            .query(sql)
            .catch((error) => {
                console.log(error)
                throw error;
            });
    },

    // Category
    initCategoryTable: async () => {
        const sql =
            `CREATE TABLE category (
            categoryID INT auto_increment,
            categoryName VARCHAR(255) NOT NULL,
            PRIMARY KEY (categoryID)
        )`;
        return connection.promise()
            .query(sql)
            .catch((error) => {
                console.log(error)
                throw error;
            });
    },

    // Suppliers Category
    initSuppliersCategoryTable: async () => {
        const sql =
            `CREATE TABLE suppliersCategory (
            id INT auto_increment,
            fkSupplier_id INT NOT NULL,
            fkCategory_id INT NOT NULL,
            isDeleted INT NOT NULL DEFAULT 0,
            PRIMARY KEY (id)
        )`;
        return connection.promise()
            .query(sql)
            .catch((error) => {
                console.log(error)
                throw error;
            });
    },

    // Bank
    initBankTable: async () => {
        const sql =
            `CREATE TABLE bank (
            bankID INT auto_increment,
            bankName VARCHAR(255) NOT NULL,
            PRIMARY KEY (bankID)
        )`;
        return connection.promise()
            .query(sql)
            .catch((error) => {
                console.log(error)
                throw error;
            });
    },

    // PURCHASE ORDERING
    // Purchase Order Table
    initPurchaseOrderTable: async () => {
        const sql =
            `CREATE TABLE purchaseOrder(
            poID INT auto_increment,
            prID INT UNIQUE NOT NULL,
            paymentStatusID INT NOT NULL DEFAULT(1),
            purchaseStatusID INT NOT NULL DEFAULT(1),
            invoice LONGBLOB,
            deliveryOrder LONGBLOB,
            ptRemarks VARCHAR(255),
            ptReceipt LONGBLOB,
            totalPrice  DECIMAL(4,2) NOT NULL DEFAULT(0),
            PRIMARY KEY (poID)
        )`;
        return connection.promise()
            .query(sql)
            .catch((error) => {
                console.log(error)
                throw error;
            });
    },

    // Payment Status Table
    initpaymentStatusTable: () => {
        const sql = `CREATE TABLE paymentStatus (
            paymentStatusID INT auto_increment,
            paymentStatus VARCHAR(255) NOT NULL UNIQUE,
            PRIMARY KEY (paymentStatusID)
        )`;
        return connection.promise()
            .query(sql)
            .catch((error) => {
                console.log(error)
                throw error;
            });
    },

    // Purchase Status Table
    initpurchaseStatusTable: () => {
        const sql = `CREATE TABLE purchaseStatus (
          purchaseStatusID INT auto_increment,
          purchaseStatus VARCHAR(255) NOT NULL UNIQUE,
          PRIMARY KEY (purchaseStatusID)
      )`;
        return connection.promise()
            .query(sql)
            .catch((error) => {
                console.log(error)
                throw error;
            });
    },

    // PURCHASE PLANNER
    // Planner Table
    initplannerTable: () => {
        const sql = `CREATE TABLE planner (
        planID INT auto_increment,
        userID INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        start_datetime DATETIME NOT NULL,
        end_datetime DATETIME NOT NULL,
        description VARCHAR(500),
        viewAccessID INT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (eventID)
      )`;
        return connection.promise()
            .query(sql)
            .catch((error) => {
                console.log(error)
                throw error;
            });
    },

    // Plan view Access Table
    initplanViewAccessTable: () => {
        const sql = `CREATE TABLE planViewAccess (
            viewAccessID INT auto_increment,
            viewAccess VARCHAR(45) NOT NULL UNIQUE
            PRIMARY KEY (viewAccessID)
        )`;
        return connection.promise()
        .query(sql)
        .catch((error) => {
            console.log(error)
            throw error;
        });
    },

    // AUDIT LOGS
    // Audit Trail Table
    initAuditLogTable: async () => {
        const sql =
            `CREATE TABLE auditLog (
            id INT auto_increment,
            timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            userID INT NOT NULL,
            actionTypeID INT NOT NULL,
            itemId INT NOT NULL,
            newValue VARCHAR(100) NOT NULL,
            oldValue VARCHAR(100) NOT NULL,
            PRIMARY KEY (id)
        );`;
        return connection.promise()
            .query(sql)
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

    // Action Type Table
    initActionTypeTable: async () => {
        const sql =
            `CREATE TABLE actionType (
            id INT auto_increment,
            actionType VARCHAR(255) NOT NULL,
            tableName VARCHAR(100) NOT NULL,
            itemIDType VARCHAR(50) NOT NULL,
            valueChanged_fieldName VARCHAR(50) NOT NULL,
            isActive INT DEFAULT(1) NOT NULL,
            PRIMARY KEY (id)
        );`;
        return connection.promise()
            .query(sql)
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },
};

module.exports = DBTables;