// DB Tables creations
const express = require('express');
const router = express.Router();

const DBTablesController = require('../controller/DBTablesController');

//  to test in postman 
//  --> http://localhost:3000/api/[refer main route]/[id if have]
//  --> ensure that individual routes does not have verbs
//  ---> example: http://localhost:3000/api/user/
//  ---> example2: http://localhost:3000/api/user/:id

// MAIN
router.post('/role', DBTablesController.roleTable);
router.post('/user', DBTablesController.userTable);

// PURCHASE REQUESTS
router.post('/paymentMode', DBTablesController.paymentModeTable);
router.post('/branch', DBTablesController.branchTable);
router.post('/prStatus', DBTablesController.prStatusTable);
router.post('/purchaseType', DBTablesController.purchaseTypeTable);
router.post('/purchaseReq', DBTablesController.purchaseRequestTable);
router.post('/deliveryLocation', DBTablesController.deliveryLocationTable);
router.post('/item', DBTablesController.itemTable);
router.post('/inventory', DBTablesController.inventoryTable);
router.post('/lineItem',DBTablesController.lineItemTable);
router.post('/gst',DBTablesController.gstTable);

// SUPPLIER DETAILS
// category, suppliers, supplierCategory
router.post('/category', DBTablesController.categoryTable);
router.post('/supplier', DBTablesController.supplierTable);
router.post('/supplierscategory', DBTablesController.suppliersCategoryTable);
router.post('/bank', DBTablesController.bankTable);

// PURCHASE ORDERING
router.post('/purchaseOrder', DBTablesController.purchaseOrderTable);
router.post('/purchaseStatus', DBTablesController.purchaseStatusTable);

// PAYMENT TRACKING
router.post('/paymentStatus', DBTablesController.paymentStatusTable);

// PURCHASE PLANNER
// Planner Table
router.post('/purchasePlanning', DBTablesController.purchasePlanningTable);

// Plan view Access Table

module.exports = router;