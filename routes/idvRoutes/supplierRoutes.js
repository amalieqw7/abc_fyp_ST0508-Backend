const express = require('express');

const router = express.Router();

const checkUser = require('../../auth/checkUser');
const supplierController = require('../../controller/supplierController');

//  to test in postman 
//  --> http://localhost:3000/api/[refer main route]/[id if have]
//  --> ensure that individual routes does not have verbs
//  ---> example: http://localhost:3000/api/user/
//  ---> example2: http://localhost:3000/api/user/:id

// insert bank name
router.post('/bank', supplierController.insertBank);

// retrieve all bank names
router.get('/bank/all', supplierController.getAllBankNames);

// create category
router.post('/category', supplierController.createCategory);

// get all categories
router.get('/category/all', supplierController.getAllCategories);

// create supplier
router.post('/', supplierController.createSupplier);

// create supplier category
router.post('/suppliersCategory', supplierController.createSuppliersCategory);

// update suppliers category
router.put('/suppliersCategory/:fkSupplier_id', supplierController.editSuppliersCategory);

// retrieve the latest supplierID and name
router.get('/supplierid', supplierController.getLatestSupplierID);

// retrieve all suppliers (id, name, contact person & number, categories)
router.get('/all', supplierController.getAllSuppliers);  //? fetch

// retrieve full supplier details by supplierID
router.get('/:supplierID', supplierController.getFullSupplierDetailsByID);

// update supplier
router.put('/:supplierID', supplierController.updateSupplierDetails);

// delete supplier
router.put('/delete/:supplierID', supplierController.deleteSupplier);

// delete suppliers category
router.put('/delete/:fkSupplier_id', supplierController.deleteSuppliersCategory);

module.exports = router;