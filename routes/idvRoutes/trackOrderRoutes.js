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
// create status
router.post('/purchaseStatus', trackOrderController.addPurchaseStatus);
// get all purchase status
router.get('/purchaseStatus/all', trackOrderController.getAllPurchaseStatus);
// create purchase order
router.post('/purchaseOrder', trackOrderController.addPurchaseOrder);

module.exports = router;