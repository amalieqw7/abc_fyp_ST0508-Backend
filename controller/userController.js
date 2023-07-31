const userModel = require('../model/user');
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

// create user account within database
module.exports.createUser = async (req, res, next) => {
    let roleID = req.body.roleID;
    let name = req.body.name;
    let email = req.body.email;

    return userModel
        .createUser(roleID, name, email)
        .then(() => {
            return res.status(201).send(`User Created!`);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(`Unknown Error`);
        });

};

// user login
module.exports.userLogin = async (req, res, next) => {
    let email = req.body.email;

    return userModel
        .userLogin(email)
        .then((result) => {
            if ((result == null)) {
                return res.status(404).send(`Account does not exist!`);
            }
            else {
                // return res.status(200).send(result);

                console.log(result[0])

                const payload = {
                    "userID": result[0].userID,
                    "email": result[0].email,
                    "roleID": result[0].roleID,
                    "role": result[0].role
                };

                const data = {
                    id: result[0].userID,
                    username: result[0].name,
                    roleID: result[0].roleID,
                    role: result[0].role,
                    token: jwt.sign(
                        payload,
                        JWT_SECRET,
                        {
                            algorithm: "HS256",
                            expiresIn: 86400 //Expires in 24 hrs
                        }
                    )
                };

                return res.status(200).send(data);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Unknown error");
        })
};

// get all users
module.exports.getAllUsers = async (req, res, next) => {

    return userModel
        .getAllUsers()
        .then((result) => {
            if (result == null) {
                res.status(404).send(`Users do not exist!`);
            }
            else {
                res.status(200).send(result);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown Error`);
        });
};

// get User details by id
module.exports.getUserDetailsByID = async (req, res, next) => {
    let userId = parseInt(req.params.id);

    if (isNaN(userId)) {
        res.status(400).send(`User ID provided is not a number!`);
        return;
    }

    return userModel
        .getUserDetailsByID(userId)
        .then((result) => {
            if (result == null) {
                res.status(404).send(`User #${userId} does not exist!`);
            }
            else {
                res.status(200).send(result);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown Error`);
        });
};

// create role
module.exports.createRole = async (req, res, next) => {
    try{
        let role = req.body.role;

        const createRole = await userModel.createRole(role);

        if(createRole){
            const getNewRole = await userModel.getRoleIDByRole(role);
            if(getNewRole){
                return res.status(200).json(getNewRole[0]);
            };
        };

    } catch(err){
        return res.status(500).send(`Unknown Error`);
    }
};

// get all roles
module.exports.getAllRoles = async (req, res, next) => {

    return userModel
        .getAllRoles()
        .then((result) => {
            if (result == null) {
                res.status(404).send(`Roles do not exist!`);
            }
            else {
                res.status(200).send(result);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown Error`);
        });
};

// get role by rolename
module.exports.getRoleIDByRole = async (req, res, next) => {
    let role = req.body.role;

    return userModel
        .getRoleIDByRole(role)
        .then((result) => {
            if (result == null) {
                res.status(404).send(`Role does not exist!`);
            }
            else {
                res.status(200).send(result);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown Error`);
        });
};


// update qtyReceived in lineItems table
module.exports.updateUserRole = async (req, res, next) => {
    let userID = parseInt(req.params.id);
    let roleID = req.body.roleID;

    if (isNaN(userID)) {
        res.status(400).send(`User ID provided is not a number!`);
        return;
    };

    return userModel
        .updateUserRole(roleID, userID)
        .then((result) => {
            if (result.affectedRows == 0) {
                res.status(404).send(`User ID #${userID} does not exist!`);
            }
            else {
                res.status(201).send(`Role Updated!`);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(`Unknown error`);
        });
};