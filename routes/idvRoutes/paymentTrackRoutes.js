const express = require('express');
const router = express.Router();

const multer = require('multer')
const upload = multer({
    storage: multer.memoryStorage()
});

const checkUser = require('../../auth/checkUser');
const paymentTrackController = require('../../controller/paymentTrackController');

//  to test in postman 
//  --> http://localhost:3000/api/[refer main route]/[id if have]
//  --> ensure that individual routes does not have verbs
//  ---> example: http://localhost:3000/api/user/
//  ---> example2: http://localhost:3000/api/user/:id


//create status
router.post('/', checkUser.verifyUserToken, checkUser.verifyRole(['Admin', 'Finance']), paymentTrackController.createPaymentStatus);
//get status by id
router.get('/:paymentStatusID', paymentTrackController.getPaymentStatusById);
//get all status 
router.get('/', checkUser.verifyUserToken, paymentTrackController.getAllPaymentStatus);
//update status by id
router.put('/:paymentStatusID', checkUser.verifyUserToken, checkUser.verifyRole(['Admin', 'Finance', 'Supplier']), paymentTrackController.updatePaymentStatusByID);
//delete status by id
router.delete('/:paymentStatusID', checkUser.verifyUserToken, checkUser.verifyRole(['Admin']), paymentTrackController.deletePaymentStatusByID);
//get supplier info by name
router.get('/supplier/:supplierName', paymentTrackController.getSupplierInformationByName);
//get supplier info by id
router.get('/supplier/info/:supplierID', paymentTrackController.getSupplierInformationByID);  //? fetch
//get supplierid by pr
router.get('/supplier/pr/:prID', paymentTrackController.getSIDbyPRID);  //? fetch
//get id by status
router.get('/status/:paymentStatus', checkUser.verifyUserToken, checkUser.verifyRole(['Admin', 'Finance']), paymentTrackController.getIDbyStatus);
//saving receipt 
router.put('/productDetails/:prID/receipt',checkUser.verifyUserToken, upload.single('file'), paymentTrackController.saveReceipt);
router.get('/productDetails/:prID/receipt', paymentTrackController.getFile);
//delete receipt
router.put('/productDetails/:prID/remove', checkUser.verifyUserToken, checkUser.verifyRole(['Finance']), paymentTrackController.removeReceipt);

module.exports = router;

