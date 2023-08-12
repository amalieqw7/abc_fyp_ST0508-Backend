const express = require('express');
const router = express.Router();

const checkUser = require('../../auth/checkUser');
const auditTrailController = require('../../controller/auditTrailController');

//  to test in postman 
//  --> http://localhost:3000/api/[refer main route]/[id if have]
//  --> ensure that individual routes does not have verbs
//  ---> example: http://localhost:3000/api/user/
//  ---> example2: http://localhost:3000/api/user/:id

// Audit Log
router.post('/', checkUser.verifyUserToken, auditTrailController.createAuditLog);
router.get('/', checkUser.verifyUserToken, checkUser.verifyRole(['Admin']), auditTrailController.getAuditLogs);
router.get('/ID', auditTrailController.getAuditLogByItemID);

// Action Type
router.post('/actionType', auditTrailController.createActionType);

// Transactions
router.get('/Transactions', checkUser.verifyUserToken, checkUser.verifyRole(['Admin','Approver', 'Finance']), auditTrailController.getALLTransactions);
router.get('/Transactions/Date', checkUser.verifyUserToken, checkUser.verifyRole(['Admin','Approver', 'Finance']), auditTrailController.getTransactionsByDate);

//timestamp 
router.get('/timestamp/:itemId', checkUser.verifyUserToken, auditTrailController.getTimeStampByItemID);

module.exports = router;