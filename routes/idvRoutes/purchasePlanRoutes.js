const express = require('express');

const router = express.Router();

const checkUser = require('../../auth/checkUser');
const purchasePLanController = require('../../controller/purchasePlanController');

//  to test in postman 
//  --> http://localhost:3000/api/[refer main route]/[id if have]
//  --> ensure that individual routes does not have verbs
//  ---> example: http://localhost:3000/api/user/
//  ---> example2: http://localhost:3000/api/user/:id

// get all event
router.get('/', checkUser.verifyUserToken, purchasePLanController.getAllEvents);
// insert new event
router.post('/purchasePlan', purchasePLanController.addEvent);
// delete
router.delete('/purchasePlan/:id', purchasePLanController.deleteEvent);

module.exports = router;