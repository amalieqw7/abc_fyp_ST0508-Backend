const supplierModel = require('../model/supplier');

// insert bank name
module.exports.insertBank = async (req, res, next) => {
    let bankName = req.body.bankName;

    return supplierModel
        .insertBank(bankName)
        .then((result) => {
            return res.status(201).send(`${bankName} Bank Created!`);
        })
        .catch((err) => {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(422).send(`Bank already exist`);
            }
            else {
                console.log(err);
                return res.sendStatus(500);
            }
        })
}

// retrieve all bank names 
module.exports.getAllBankNames = async(req, res, next) => {
    return supplierModel
    .getAllBankNames()
    .then((result) => {
        if (result === null) {
          return res.send("Sorry, no banks created");
        }
        else {
          return res.status(200).send(result);
        }  
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    })
}

// create category
module.exports.createCategory = async (req, res, next) => {
    let categoryName = req.body.categoryName;

    return supplierModel
        .createCategory(categoryName)
        .then((result) => {
            return res.status(201).send(`Category ${categoryName} Created!`);
        })
        .catch((err) => {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(422).send(`Category already exist`);
            }
            else {
                console.log(err);
                return res.sendStatus(500);
            }
        })
}

// retrieve all categories
module.exports.getAllCategories = async(req, res, next) => {
    return supplierModel
    .getAllCategories()
    .then((result) => {
        if (result === null) {
          return res.send("Sorry, no categories created");
        }
        else {
          return res.status(200).send(result);
        }  
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    })
}

// create supplier
module.exports.createSupplier = async (req, res, next) => {
    let supplierName = req.body.supplierName;
    let email = req.body.email;
    let officeNum = req.body.officeNum;
    let webAddress = req.body.webAddress;
    let bankAccName = req.body.bankAccName;
    let contactPersonName = req.body.contactPersonName;
    let phoneNum = req.body.phoneNum;
    let address = req.body.address;
    let bankAccountNum = req.body.bankAccountNum;
    let bankID = req.body.bankID;

    return supplierModel
        .createSupplier(supplierName, email, officeNum, webAddress, bankAccName, contactPersonName, phoneNum, address, bankAccountNum, bankID)
        .then((result) => {
            return res.status(201).send(`Supplier ${supplierName} Created!`);
        })
        .catch((err) => {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(422).send(`Supplier already exist`);
            }
            else {
                console.log(err);
                return res.sendStatus(500);
            }
        })
}

// create suppliers category
module.exports.createSuppliersCategory = async (req, res, next) => {
    let {fkSupplier_id, categoryIDs} = req.body;

    // split categoryIDs into an array
    let categoryIDArray = categoryIDs.split(','); 

    return supplierModel
        .createSuppliersCategory(fkSupplier_id, categoryIDArray)
        .then((result) => {
            return res.status(201).send(`Suppliers Category for Supplier ${fkSupplier_id} Created!`);
        })
        .catch((err) => {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(422).send(`Suppliers Category already exist`);
            }
            else {
                console.log(err);
                return res.sendStatus(500);
            }
        })
}

// update suppliers category
module.exports.editSuppliersCategory = async(req, res, next) => {
    const fkSupplier_id = parseInt(req.params.fkSupplier_id);
    const categoryIDs = req.body.categoryIDs;
    const categoryIDArray = categoryIDs.split(',');

    try {
        await supplierModel.editSuppliersCategory(fkSupplier_id, categoryIDArray);
        res.status(200).send(`Supplier ${fkSupplier_id} Category Successfully Updated!`);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

// retrieve the latest supplierID and name
module.exports.getLatestSupplierID = async(req, res, next) => {
    return supplierModel
    .getLatestSupplierID()
    .then((result) => {
        if (result === null) {
          return res.send("Sorry, supplierID does not exist");
        }
        else {
          return res.status(200).send(result);
        }  
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    })
}

// retrieve full supplier details by supplierID
module.exports.getFullSupplierDetailsByID = async (req, res, next) => {
    let supplierID = parseInt(req.params.supplierID);

    if (isNaN(supplierID)) {
        res.status(400).send(`Enter number only`);
        return;
    };

    return supplierModel
        .getFullSupplierDetailsByID(supplierID)
        .then((result) => {
            if (result === null) {
                return res.send(`Supplier does not exist`)
            }
            else {
                return res.status(200).send(result);
            }
        })
        .catch((err) => {
            console.log(err);
            return res.sendStatus(500);
        })
}

// retrieve all suppliers - id, supplier name, contact person name & number, category   
module.exports.getAllSuppliers = async(req, res, next) => {
    return supplierModel
    .getAllSuppliers()
    .then((result) => {
        if (result === null) {
          return res.send("Sorry, no suppliers created");
        }
        else {
          return res.status(200).send(result);
        }  
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    })
}

// update supplier details
module.exports.updateSupplierDetails = async (req, res, next) => {
    let supplierID = parseInt(req.params.supplierID);
    let supplierName = req.body.supplierName;
    let email = req.body.email;
    let officeNum = req.body.officeNum;
    let webAddress = req.body.webAddress;
    let bankAccName = req.body.bankAccName;
    let contactPersonName = req.body.contactPersonName;
    let phoneNum = req.body.phoneNum;
    let address = req.body.address;
    let bankAccountNum = req.body.bankAccountNum;
    let bankID = req.body.bankID;

    if (isNaN(supplierID)) {
        res.status(400).send(`Enter numbers only!`);
        return;
    };

    return supplierModel
        .updateSupplierDetails(supplierName, email, officeNum, webAddress, bankAccName, contactPersonName, phoneNum, address, bankAccountNum, bankID, supplierID)
        .then((result) => {
            if (result === null) {
                return res.send(`Supplier does not exist`);
            }
            else {
                return res.status(200).send(`Supplier ${supplierID} Updated!`);
            }
        })
        .catch((err) => {
            return res.sendStatus(500);
        })
}

// soft delete supplier
module.exports.deleteSupplier = async (req, res, next) => {
    let supplierID = parseInt(req.params.supplierID);

    return supplierModel
        .deleteSupplier(supplierID)
        .then((result) => {
            return res.status(200).send(`Supplier ${supplierID} Deleted`);
        })
        .catch((err) => {
            return res.sendStatus(500);
        })
}

// soft delete suppliers category
module.exports.deleteSuppliersCategory = async (req, res, next) => {
    let fkSupplier_id = parseInt(req.params.fkSupplier_id);

    return supplierModel
        .deleteSuppliersCategory(fkSupplier_id)
        .then((result) => {
            return res.status(200).send(`Supplier ${fkSupplier_id}'s Category Deleted`);
        })
        .catch((err) => {
            return res.sendStatus(500);
        })
}