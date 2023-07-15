const userModel = require('../model/user');
// const jwt         = require("jsonwebtoken");
// const JWT_SECRET  = require("../../config");

//login
module.exports.userLogin = async (req, res, next) => {
    let email = req.body.email;
    // let password = req.body.password;

    return userModel
        .userLogin(email)
        .then((result) => {
            if ((result == null)) {
                res.status(404).send(`Account does not exist!`);
            }
            else {
                return res.status(200).send(result);
                // if (password === result[0].password){

                //     const payload = {
                //         "user_Id": result[0].user_id,
                //         "role_id": result[0].fk_role_id,
                //         "role": result[0].role_name
                //     }

                //     const data = {
                //         user_id: result[0].user_id,
                //         role: result[0].role_name,
                //         token: jwt.sign(
                //             payload,
                //             JWT_SECRET,
                //             { 
                //                 algorithm: "HS256",
                //                 expiresIn: 86400 //Expires in 24 hrs
                //             }
                //         )
                //     }

                //     return res.status(200).send(data);
                // }
                // else{
                //     res.status(403).send(`Login failed: Your password is incorrect!`);
                // }
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Unknown error");
        })
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