const connection = require('../db');

const userDB = {
    // create user account within database
    createUser: async (roleID, name, email) => {
        let sql = `INSERT INTO user(roleID, name, email) VALUES (?,?,?)`;

        return connection.promise()
            .query(sql, [roleID, name, email])
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },

    // user login
    userLogin: async (email) => {
        let sql = `SELECT user.userID,user.name, user.email, user.roleID, role.role
                    FROM user, role 
                    WHERE email = ?
                    AND role.roleID = user.roleID`;

        return connection.promise()
            .query(sql, [email])
            .then((result) => {
                console.log(result[0]);
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
    },

    // get all users
    getAllUsers: async () => {
        let sql = `SELECT U.userID,U.roleID , R.role, U.name, U.email 
                        FROM user U, role R
                        WHERE U.roleID = R.roleID`;

        return connection.promise()
            .query(sql)
            .then((result) => {
                if (result[0] == 0) {
                    return null;
                }
                else {
                    return result[0];
                };
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },

    // get User details by id
    getUserDetailsByID: async (userID) => {
        let sql = `SELECT R.role, U.name, U.email 
                    FROM user U, role R
                    WHERE U.roleID = R.roleID
                    AND userID = ?;`;

        return connection.promise()
            .query(sql, [userID])
            .then((result) => {
                if (result[0] == 0) {
                    return null;
                }
                else {
                    return result[0];
                };
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },

    // create role
    createRole: async (role) => {
        let sql = `INSERT INTO role(role) VALUES (?)`;

        return connection.promise()
            .query(sql, [role])
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },

    // get all roles
    getAllRoles: async () => {
        let sql = `SELECT * FROM role`;

        return connection.promise()
            .query(sql)
            .then((result) => {
                if (result[0] == 0) {
                    return null;
                }
                else {
                    return result[0];
                };
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },

    // get role by rolename
    getRoleIDByRole: async (role) => {
        let sql = `SELECT *FROM role WHERE role = ?;`;

        return connection.promise()
            .query(sql, [role])
            .then((result) => {
                if (result[0] == 0) {
                    return null;
                }
                else {
                    return result[0];
                };
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },


    // update user role
    updateUserRole: async (roleID, userID) => {
        let sql = `UPDATE user SET roleID = ?
                        WHERE userID = ?`;

        return connection.promise()
            .query(sql, [roleID, userID])
            .then((result) => {
                if (result[0] == 0) {
                    return null;
                }
                else {
                    return result[0];
                }
            })
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },

};

module.exports = userDB;