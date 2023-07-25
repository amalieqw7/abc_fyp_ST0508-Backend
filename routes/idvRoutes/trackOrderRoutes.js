const express = require('express');

const router = express.Router();

const trackOrderController = require('../../controller/trackOrderController');

const multer = require('multer')
const upload = multer({
    storage: multer.memoryStorage()
});

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
// insert data into purchase order table
router.post('/purchaseOrder', trackOrderController.addPurchaseOrder);
// get purchase order by ID
router.get('/purchaseOrder/:id', trackOrderController.getPOByPOID);
// get purchase order details by PR ID 
router.get('/purchaseOrderDetails/:id', trackOrderController.getPODByPRID);
// get product details by PO ID 
router.get('/productDetails/:id', trackOrderController.getPDByPOID);
// update PO status dropdown by PO ID 
router.put('/purchaseOrderStatus/:id', trackOrderController.updatePOByPoId);
// get purchase status by ID
router.get('/purchaseStatus/:id', trackOrderController.getPOstatusbyID);
// insert quantity received into purchase order table
router.put('/purchaseOrder/qty/:id', trackOrderController.updateQtyReceived);
// get purchase statuses
router.get('/purchaseStatuses', trackOrderController.getPurchaseStatuses);
// get no. of PR as of date 
router.get('/prAmnt', trackOrderController.getPRAmount);
// get no. of PO as of date 
router.get('/poAmnt', trackOrderController.getPOAmount);
// search bar 
router.post('/POsearch', trackOrderController.searchBar);
// save invoice 
router.put('/documents/:prID/invoice', upload.single('file'), trackOrderController.saveInvoice);
// save DO
router.put('/documents/:prID/deliveryOrder', upload.single('file'), trackOrderController.saveDOrder);
// fetch invoice
router.get('/documents/:prID/invoice', trackOrderController.getInvoice);
module.exports = router;