const supplierModel = require('../model/supplier');

// insert bank name
module.exports.insertBank = async (req, res, next) => {
    let bankName = req.body.bankName;

    return supplierModel
        .insertBank(bankName)
        .then((result) => {
            return res.status(201).send(`Bank Name added`);
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

// create category
module.exports.createCategory = async (req, res, next) => {
    let categoryName = req.body.categoryName;

    return supplierModel
        .createCategory(categoryName)
        .then((result) => {
            return res.status(201).send(`Category created`);
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
    let contactPersonName = req.body.contactPersonName;
    let phoneNum = req.body.phoneNum;
    let address = req.body.address;
    let bankAccountNum = req.body.bankAccountNum;
    let bankID = req.body.bankID;

    return supplierModel
        .createSupplier(supplierName, email, officeNum, webAddress, contactPersonName, phoneNum, address, bankAccountNum, bankID)
        .then((result) => {
            return res.status(201).send(`Supplier created`);
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
    let fkSupplier_id = req.body.fkSupplier_id;
    let fkCategory_id = req.body.fkCategory_id;

    return supplierModel
        .createSuppliersCategory(fkSupplier_id, fkCategory_id)
        .then((result) => {
            return res.status(201).send(`Suppliers Category created`);
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

// update supplier category
// module.exports.updateSupplierCategory = async (req, res, next) => {
//     let supplierID = parseInt(req.params.fkSupplier_id);
//     let fkSupplierID = req.body.fkSupplier_id;
//     let categoryID = req.body.fkCategory_id;

//     if (isNaN(supplierID)) {
//         res.status(400).send(`Enter numbers only!`);
//         return;
//     };

//     return supplierModel
//         .updateSupplierCategory(categoryID, fkSupplierID, supplierID)
//         .then((result) => {
//             if (result === null) {
//                 return res.send(`Supplier category does not exist`);
//             }
//             else {
//                 return res.status(200).send(`Supplier category updated!`);
//             }
//         })
//         .catch((err) => {
//             return res.sendStatus(500);
//         })
// }

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

// retrieve all suppliers - id, contact person name & number, supplier name, category
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
    let contactPersonName = req.body.contactPersonName;
    let email = req.body.email;
    let phoneNum = req.body.phoneNum;
    let officeNum = req.body.officeNum;
    let address = req.body.address;
    let webAddress = req.body.webAddress;
    let bankAccountNum = req.body.bankAccountNum;
    let bankID = req.body.bankID;

    if (isNaN(supplierID)) {
        res.status(400).send(`Enter numbers only!`);
        return;
    };

    return supplierModel
        .updateSupplierDetails(supplierName, contactPersonName, email, phoneNum, officeNum, address, webAddress, bankAccountNum, bankID, supplierID)
        .then((result) => {
            if (result === null) {
                return res.send(`Supplier does not exist`);
            }
            else {
                return res.status(200).send(`Supplier updated!`);
            }
        })
        .catch((err) => {
            return res.sendStatus(500);
        })
}

// delete supplier
module.exports.deleteSupplier = async (req, res, next) => {
    let supplierID = parseInt(req.params.supplierID);

    if (isNaN(supplierID)) {
        res.status(400).send(`Enter numbers only!`);
        return;
    };

    return supplierModel
        .deleteSupplier(supplierID)
        .then((result) => {
            if (result === null) {
                return res.send(`Supplier does not exist`);
            }
            else {
                return res.status(200).send(`Supplier deleted!`);
            }
        })
        .catch((err) => {
            return res.sendStatus(500);
        })
}