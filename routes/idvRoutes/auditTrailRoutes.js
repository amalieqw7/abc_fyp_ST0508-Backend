const express = require('express');
const router = express.Router();

const auditTrailController = require('../../controller/auditTrailController');

//  to test in postman 
//  --> http://localhost:3000/api/[refer main route]/[id if have]
//  --> ensure that individual routes does not have verbs
//  ---> example: http://localhost:3000/api/user/
//  ---> example2: http://localhost:3000/api/user/:id

// Audit Log
router.post('/', auditTrailController.createAuditLog);
router.get('/', auditTrailController.getAuditLogs);

// Action Type
router.post('/actionType', auditTrailController.createActionType);

module.exports = router;