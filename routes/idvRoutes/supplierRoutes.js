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
router.get('/bank/all', checkUser.verifyUserToken, supplierController.getAllBankNames);

// create category
router.post('/category', supplierController.createCategory);

// get all categories
router.get('/category/all', checkUser.verifyUserToken, supplierController.getAllCategories);

// create supplier
router.post('/', checkUser.verifyUserToken, checkUser.verifyRole(['Approver']), supplierController.createSupplier);

// create suppliers category
router.post('/suppliersCategory', checkUser.verifyUserToken, checkUser.verifyRole(['Approver', 'Supplier']), supplierController.createSuppliersCategory);

// update suppliers category
router.put('/suppliersCategory/:fkSupplier_id', checkUser.verifyUserToken, checkUser.verifyRole(['Approver', 'Supplier']), supplierController.editSuppliersCategory);

// retrieve the latest supplierID and name
router.get('/supplierid', checkUser.verifyUserToken, supplierController.getLatestSupplierID);

// retrieve all suppliers (id, name, contact person & number, categories)
router.get('/all', supplierController.getAllSuppliers); //? fetch

// retrieve full supplier details by supplierID
router.get('/:supplierID', supplierController.getFullSupplierDetailsByID); //? fetch

// update supplier
router.put('/:supplierID', checkUser.verifyUserToken, checkUser.verifyRole(['Approver', 'Supplier']), supplierController.updateSupplierDetails);

// delete supplier
router.put('/delete/:supplierID', checkUser.verifyUserToken, checkUser.verifyRole(['Approver']), supplierController.deleteSupplier);

// delete suppliers category
router.put('/delete/category/:fkSupplier_id', checkUser.verifyUserToken, supplierController.deleteSuppliersCategory);

// get supplier MOQ & DTL
router.get('/supplierPurchaseInfo/:supplierID', checkUser.verifyUserToken, supplierController.getMOQDTL);
module.exports = router;