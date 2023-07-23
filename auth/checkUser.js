const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

// checked if user is logged in
const verifyUserToken = (req, res, next) => {
    // console.log("Request to view restricted content");
    const authHeader = req.headers.authorization;

    //check for token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send(`Unable to locate valid token.`);
    };

    //replaces front part of token
    const token = authHeader.replace('Bearer ', '');

    jwt.verify(
        token,
        JWT_SECRET,
        {
            algorithms: ["HS256"],
            expiresIn: 86400
        },
        (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.status(401).send(`Not Authenticated, Invalid Token!`);
                return;
            }

            req.decodedToken = decodedToken; //payload

            // console.log(req.decodedToken);
            // {
            //     userID: 2,
            //     email: 'johnWatt@purchaser.com',
            //     roleID: 2,
            //     role: 'User',
            //     iat: 1690097489,
            //     exp: 1690183889
            // }

            next();
        }
    );
};

// get user id from token
const getClientUserId = (req, res, next) => {
    // console.log('http header - user ', req.decodedToken.userID);
    req.params.id = req.decodedToken.userID;

    // console.log(JSON.stringify(req.headers));

    // console.log('Inspect user id which is planted inside the request header : ', req.params.id);
    if (req.params.id != null) {
        next();
        return;
    } else {
        res.status(403).send(`Unauthorized Access`);
        return;
    };
};

//check if account role is allowed
const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        const roleID = req.decodedToken.roleID;
        const userRole = req.decodedToken.role;

        // console.log("IS ROLE ALLOWED?", !allowedRoles.includes(userRole));

        // Check if the user role is allowed to access the API
        // only allows if !allowedRoles.includes(userRole) returns as true
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: `Unauthorized Access` });
        };

        next();
    };
};

module.exports = {
    verifyUserToken,
    getClientUserId,
    verifyRole
};