const express = require('express');
const router = express.Router();

const checkUser = require('../auth/checkUser');
const userController = require('../controller/userController');

// Create User
router.post('/user', userController.createUser);

// user login
router.post('/login', userController.userLogin);

// get all users
router.get('/', checkUser.verifyUserToken, userController.getAllUsers);

// get user details
router.get('/:id', userController.getUserDetailsByID);

// get user details
router.get('/:id/role', userController.getUserRoleByID);

// create role
router.post('/role', userController.createRole);

// get all roles
router.get('/role/all', checkUser.verifyUserToken, userController.getAllRoles);

// get role by rolename
router.get('/role/ByRole', userController.getRoleIDByRole);

// update user role
router.put('/role/:id', checkUser.verifyUserToken, userController.updateUserRole);

module.exports = router;