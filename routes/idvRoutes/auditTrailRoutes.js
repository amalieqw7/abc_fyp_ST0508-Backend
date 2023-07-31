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
router.get('/', checkUser.verifyUserToken, auditTrailController.getAuditLogs);
router.get('/ID', auditTrailController.getAuditLogByItemID);

// Action Type
router.post('/actionType', auditTrailController.createActionType);

module.exports = router;