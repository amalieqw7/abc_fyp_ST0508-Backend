const express = require('express');
const router = express.Router();

const checkUser = require('../../auth/checkUser');
const purchaseReqController = require('../../controller/purchaseReqController');

//  to test in postman 
//  --> http://localhost:3000/api/[refer main route]/[id if have]
//  --> ensure that individual routes does not have verbs
//  ---> example: http://localhost:3000/api/user/
//  ---> example2: http://localhost:3000/api/user/:id

// PR
router.post('/', checkUser.verifyUserToken, purchaseReqController.addPR);
router.get('/', checkUser.verifyUserToken, purchaseReqController.getAllPR);
router.get('/:id', checkUser.verifyUserToken, checkUser.getClientUserId, checkUser.verifyRole(['Admin', 'User']), purchaseReqController.getPRByUserID);
router.get('/PR/:id', purchaseReqController.getPRByPRID); //? fetch
router.get('/latestPRID/:id', checkUser.verifyUserToken, checkUser.getClientUserId, purchaseReqController.getLatestPRIDByUserID);
router.put('/PR/:id', checkUser.verifyUserToken, purchaseReqController.updatePRApprover);
router.put('/PR/ApprComment/:id', checkUser.verifyUserToken, purchaseReqController.updateApprComments);
router.delete('/PR/:id', checkUser.verifyUserToken, purchaseReqController.deletePRById);

// Ad Hoc
router.get('/adhoc/purchases', checkUser.verifyUserToken, purchaseReqController.getAllAdHoc);
router.get('/adhoc/:id', checkUser.verifyUserToken, checkUser.getClientUserId, purchaseReqController.getAdHocByUserID);
router.get('/adhoc/viewBy/:id', purchaseReqController.getAdHocByPRID); //? fetch

// get both PR & adhoc sorted by status & prid
router.get('/PR/AH/all', checkUser.verifyUserToken, purchaseReqController.getAllPRnAH);

// Line Item
router.post('/lineItem', checkUser.verifyUserToken, purchaseReqController.addLineItem);
router.get('/lineItem/:id', purchaseReqController.getLineItemByPRID); //? fetch
router.put('/lineItem/:id', purchaseReqController.updateQtyReceived);

// GST
router.post('/gst', purchaseReqController.addGST);
router.post('/gst/filter', purchaseReqController.getPRGST);
router.get('/gst/:id', purchaseReqController.getGSTByID);

// Payment Mode
router.post('/paymentMode', purchaseReqController.addPaymentMode);
router.get('/paymentMode/all', purchaseReqController.getAllPaymentMode); //? fetch

// Branch
router.post('/branch', purchaseReqController.addBranch);
router.get('/branch/all', purchaseReqController.getAllBranch); //? fetch

// Delivery Location
router.post('/deliveryLocation', checkUser.verifyUserToken, purchaseReqController.addDeliveryLocation);
router.get('/deliveryLocation/show/all', purchaseReqController.getAllDeliveryLocation);
router.get('/deliveryLocation/:id', purchaseReqController.getDeliveryLocationByPRID);

// PR Status Types
router.post('/PRStatus', purchaseReqController.addPRStatusType);
router.get('/PRStatus/all', purchaseReqController.getAllPRStatusType);

// Search
router.post('/search', checkUser.verifyUserToken, purchaseReqController.searchPRAll);
router.post('/search/:id', checkUser.verifyUserToken, checkUser.getClientUserId, purchaseReqController.searchPRByUserID);
router.post('/DynamicSearch', checkUser.verifyUserToken, purchaseReqController.searchPRDynamic);

module.exports = router;