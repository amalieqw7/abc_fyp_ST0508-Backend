const express = require('express');

const router = express.Router();

const trackOrderController = require('../../controller/trackOrderController');

//  to test in postman 
//  --> http://localhost:3000/api/[refer main route]/[id if have]
//  --> ensure that individual routes does not have verbs
//  ---> example: http://localhost:3000/api/user/
//  ---> example2: http://localhost:3000/api/user/:id

// get all track orders
router.get('/', trackOrderController.getAllTrackOrder);
// create purchase status
router.post('/purchaseStatus', trackOrderController.addPurchaseStatus);
// get all purchase status
router.get('/purchaseStatus/all', trackOrderController.getAllPurchaseStatus);
// get purchase order by ID
router.get('/purchaseOrder/:id', trackOrderController.getPOByPOID);
// get purchase order details by ID 
router.get('/purchaseOrderDetails/:id', trackOrderController.getPODByPOID);
// get product details by PO ID 
router.get('/productDetails/:id', trackOrderController.getPDByPOID);

module.exports = router;