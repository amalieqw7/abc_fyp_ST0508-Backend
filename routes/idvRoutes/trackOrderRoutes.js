const express = require('express');

const router = express.Router();

const trackOrderController = require('../../controller/trackOrderController');

//  to test in postman 
//  --> http://localhost:3000/api/[refer main route]/[id if have]
//  --> ensure that individual routes does not have verbs
//  ---> example: http://localhost:3000/api/user/
//  ---> example2: http://localhost:3000/api/user/:id

router.get('/', trackOrderController.getAllTrackOrder);

module.exports = router;