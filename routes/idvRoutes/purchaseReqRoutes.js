const express = require('express');
const router = express.Router();

const purchaseReqController = require('../../controller/purchaseReqController');

//  to test in postman 
//  --> http://localhost:3000/api/[refer main route]/[id if have]
//  --> ensure that individual routes does not have verbs
//  ---> example: http://localhost:3000/api/user/
//  ---> example2: http://localhost:3000/api/user/:id

// PR
router.post('/', purchaseReqController.addPR);
router.get('/', purchaseReqController.getAllPR);
router.get('/:id', purchaseReqController.getPRByUserID);
router.get('/PR/:id', purchaseReqController.getPRByPRID);
router.get('/latestPRID/:id', purchaseReqController.getLatestPRIDByUserID);
router.put('/PR/:id', purchaseReqController.updatePRApprover);
router.delete('/PR/:id', purchaseReqController.deletePRById);
router.get('/adhoc/purchases', purchaseReqController.getAllAdHoc);
router.get('/adhoc/:id', purchaseReqController.getAdHocByUserID);

// Line Item
router.post('/lineItem', purchaseReqController.addLineItem);
router.get('/lineItem/:id', purchaseReqController.getLineItemByPRID);
router.put('/lineItem/:id', purchaseReqController.updateQtyReceived);

// Payment Mode
router.post('/paymentMode', purchaseReqController.addPaymentMode);
router.get('/paymentMode/all', purchaseReqController.getAllPaymentMode);

// Branch
router.post('/branch', purchaseReqController.addBranch);
router.get('/branch/all', purchaseReqController.getAllBranch);

// Delivery Location
router.post('/deliveryLocation', purchaseReqController.addDeliveryLocation);
router.get('/deliveryLocation/show/all', purchaseReqController.getAllDeliveryLocation);
router.get('/deliveryLocation/:id', purchaseReqController.getDeliveryLocationByPRID);

// PR Status Types
router.post('/PRStatus', purchaseReqController.addPRStatusType);
router.get('/PRStatus/all', purchaseReqController.getAllPRStatusType);

// Search
router.post('/search', purchaseReqController.searchPRAll);
router.post('/search/:id', purchaseReqController.searchPRByUserID);

module.exports = router;