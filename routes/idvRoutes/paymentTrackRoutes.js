const express = require('express');
const router = express.Router();

const multer = require('multer')
const upload = multer({
    storage: multer.memoryStorage()
});

const paymentTrackController = require('../../controller/paymentTrackController');

//  to test in postman 
//  --> http://localhost:3000/api/[refer main route]/[id if have]
//  --> ensure that individual routes does not have verbs
//  ---> example: http://localhost:3000/api/user/
//  ---> example2: http://localhost:3000/api/user/:id


//create status
router.post('/', paymentTrackController.createPaymentStatus);
//get status by id
router.get('/:paymentStatusID', paymentTrackController.getPaymentStatusById);
//get all status 
router.get('/', paymentTrackController.getAllPaymentStatus);
//update status by id
router.put('/:paymentStatusID', paymentTrackController.updatePaymentStatusByID);
//delete status by id
router.delete('/:paymentStatusID', paymentTrackController.deletePaymentStatusByID);
//get supplier info by name
router.get('/supplier/:supplierName', paymentTrackController.getSupplierInformationByName)
//get supplier info by id
router.get('/supplier/info/:supplierID', paymentTrackController.getSupplierInformationByID)
//get supplierid by pr
router.get('/supplier/pr/:prID', paymentTrackController.getSIDbyPRID)
//get id by status
router.get('/status/:paymentStatus', paymentTrackController.getIDbyStatus)
// //saving receipt 
router.put('/productDetails/:prID/receipt', upload.single('file'), paymentTrackController.saveReceipt)
router.get('/productDetails/:prID/receipt', paymentTrackController.getFile);
module.exports = router;

