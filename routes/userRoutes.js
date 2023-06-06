const  express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

// user login
router.post('/login', userController.userLogin);

module.exports = router;