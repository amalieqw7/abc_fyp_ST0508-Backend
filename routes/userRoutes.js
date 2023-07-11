const  express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

// user login
router.post('/login', userController.userLogin);

// get user details
router.get('/:id', userController.getUserDetailsByID);

module.exports = router;