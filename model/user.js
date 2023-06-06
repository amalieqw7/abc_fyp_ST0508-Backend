const connection = require('../db');

const userDB = {
    userLogin: async(email) => {
        let sql = `SELECT user.userID,user.name, user.email, user.roleID, role.role
                    FROM user, role 
                    WHERE email = ?
                    AND role.roleID = user.roleID`;

        return connection.promise()
        .query(sql, [email])
        .then((result) => {
            // console.log(result[0]);
            if (result[0].length == 0) {
                return null;
            }
            else {
                return result[0];
            }
        })
        .catch((err) => {
            console.log(err);
            return err;
        })
    }
};

module.exports = userDB;