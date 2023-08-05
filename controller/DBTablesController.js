// DB Tables creations
const DBTablesModel = require('../model/DBTables');

// MAIN
// Role Table
module.exports.roleTable = async (req, res, next) => {
    return DBTablesModel
        .initRoleTable()
        .then(() => {
            return res.status(201).send(`Role Table Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Table Creation Failed`);
        });
};

// User Table
module.exports.userTable = async (req, res, next) => {
    return DBTablesModel
        .initUserTable()
        .then(() => {
            return res.status(201).send(`User Table Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Table Creation Failed`);
        });
};

// PURCHASE REQUESTS
// Payment Mode Table
module.exports.paymentModeTable = async (req, res, next) => {
    return DBTablesModel
        .initPaymentModeTable()
        .then(() => {
            return res.status(201).send(`Payment Mode Table Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Table Creation Failed`);
        });
};

// Branch Table
module.exports.branchTable = async (req, res, next) => {
    return DBTablesModel
        .initBranchTable()
        .then(() => {
            res.status(201).send(`Branch Table Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Table Creation Failed`);
        });
};

// PR Status Table
module.exports.prStatusTable = async (req, res, next) => {
    return DBTablesModel
        .initPRStatusTable()
        .then(() => {
            return res.status(201).send(`Purchase Request Status Table Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Table Creation Failed`);
        });
};

// Purchase Type Table
module.exports.purchaseTypeTable = async (req, res, next) => {
    return DBTablesModel
        .initPurchaseTypeTable()
        .then(() => {
            return res.status(201).send(`Purchase Type Table Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Table Creation Failed`);
        });
};

// Purchase Request Table
module.exports.purchaseRequestTable = async (req, res, next) => {
    return DBTablesModel
        .initPurchaseRequestTable()
        .then(() => {
            return res.status(201).send(`Purchase Request Table Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Table Creation Failed`);
        });
};

// Delivery Location
module.exports.deliveryLocationTable = async (req, res, next) => {
    return DBTablesModel
        .initDeliveryLocationTable()
        .then(() => {
            return res.status(201).send(`Delivery Location Table Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Table Creation Failed`);
        });
};

// Item Table
module.exports.itemTable = async (req, res, next) => {
    return DBTablesModel
        .initItemTable()
        .then(() => {
            return res.status(201).send(`Item Table Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Table Creation Failed`);
        });
};

// Inventory Table
module.exports.inventoryTable = async (req, res, next) => {
    return DBTablesModel
        .initInventoryTable()
        .then(() => {
            return res.status(201).send(`Inventory Table Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Table Creation Failed`);
        });
};

// Line Item Table
module.exports.lineItemTable = async (req, res, next) => {
    return DBTablesModel
        .initlineItemTable()
        .then(() => {
            return res.status(201).send(`Line Item Table Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Table Creation Failed`);
        });
};

// GST Table
module.exports.gstTable = async (req, res, next) => {
    return DBTablesModel
        .initGSTTable()
        .then(() => {
            return res.status(201).send(`GST Table Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Table Creation Failed`);
        });
};

// SUPPLIER DETAILS
// Suppliers
module.exports.supplierTable = (req, res, next) => {
    return DBTablesModel
        .initSupplierTable()
        .then(() => {
            return res.status(201).send(`Supplier table created!`);
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({ error: "Failed to create Supplier table" });
        });
};

// Category
module.exports.categoryTable = (req, res, next) => {
    return DBTablesModel
        .initCategoryTable()
        .then(() => {
            return res.status(201).send(`Category table created!`);
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({ error: "Failed to create Category table" });
        });
};

// Suppliers Category
module.exports.suppliersCategoryTable = (req, res, next) => {
    return DBTablesModel
        .initSuppliersCategoryTable()
        .then(() => {
            return res.status(201).send(`Suppliers Category table created!`);
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({ error: "Failed to create Suppliers Category table" });
        });
};

// Bank
module.exports.bankTable = (req, res, next) => {
    return DBTablesModel
        .initBankTable()
        .then(() => {
            return res.status(201).send(`Bank table created!`);
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({ error: "Failed to create Bank table" });
        });
};

// PURCHASE ORDERING
// Purchase Order Table
module.exports.purchaseOrderTable = async (req, res, next) => {
    return DBTablesModel
        .initPurchaseOrderTable()
        .then(() => {
            return res.status(201).send(`Purchase Order Table Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Table Creation Failed`);
        });
};

// Payament Status Table
module.exports.paymentStatusTable = (req, res, next) => {
    return DBTablesModel
        .initpaymentStatusTable()
        .then(() => {
            return res.status(201).send(`Payment Status Table Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Failed to create Payment Status Table`);
        })
}

// Purchase Status Table
module.exports.purchaseStatusTable = (req, res, next) => {
    return DBTablesModel
        .initpurchaseStatusTable()
        .then(() => {
            return res.status(201).send(`Purchase Status Table Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Failed to create Purchase Status Table`);
        })
}


// PURCHASE PLANNER
// Planner Table
module.exports.purchasePlanningTable = (req, res, next) => {
    return DBTablesModel
        .initplannerTable()
        .then(() => {
            return res.status(201).send(`Purchase Planning Table Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Failed to create Purchase Planning Table`);
        })
}

// Plan view Access Table
module.exports.planViewAccessTable = (req, res, next) => {
    return DBTablesModel
    .initplanViewAccessTable()
    .then(() => {
        return res.status(201).send(`planViewAccess Table Created!`);
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).send(`Failed to create planViewAccess Table`);
    })
}

// AUDIT LOGS
// Audit Trail Table
module.exports.auditLogTable = async (req, res, next) => {
    return DBTablesModel
        .initAuditLogTable()
        .then(() => {
            return res.status(201).send(`Audit Log Table Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Table Creation Failed`);
        });
};

// Action Type Table
module.exports.actionTypeTable = async (req, res, next) => {
    return DBTablesModel
        .initActionTypeTable()
        .then(() => {
            return res.status(201).send(`Action Type Table Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Table Creation Failed`);
        });
};