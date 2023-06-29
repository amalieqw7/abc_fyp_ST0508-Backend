const express = require('express');

const router = express.Router();

const supplierController = require('../../controller/supplierController');

//  to test in postman 
//  --> http://localhost:3000/api/[refer main route]/[id if have]
//  --> ensure that individual routes does not have verbs
//  ---> example: http://localhost:3000/api/user/
//  ---> example2: http://localhost:3000/api/user/:id

// insert bank name
router.post('/bank', supplierController.insertBank);

// create category
router.post('/category', supplierController.createCategory);

// get all categories
router.get('/category/all', supplierController.getAllCategories);

// create supplier
router.post('/', supplierController.createSupplier);

// create supplierscategory
router.post('/suppliersCategory', supplierController.createSuppliersCategory);

// update supplier category
//router.put('/suppliersCategory/:supplierID', supplierController.updateSupplierDetails);

// retrieve all suppliers (id, name, contact person & number, categories)
router.get('/all', supplierController.getAllSuppliers);

// retrieve full supplier details by supplierID
router.get('/:supplierID', supplierController.getFullSupplierDetailsByID);

// update supplier
router.put('/:supplierID', supplierController.updateSupplierDetails);

// delete supplier
router.delete('/:supplierID', supplierController.deleteSupplier);

module.exports = router;