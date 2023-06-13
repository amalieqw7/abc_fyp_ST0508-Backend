const connection = require('../db');

const trackOrderDB = {
  //get all track order to display
  getAllTrackOrder: async () => {
    let sql = `SELECT PR.prID, U.name, S.supplierName
              FROM purchaseRequest PR, user U, supplier S
              WHERE PR.userID = U.userID
              AND PR.supplierID = S.supplierID
              AND PR.prStatusID = 2
              ORDER BY prID asc`;

    return connection.promise()
      .query(sql)
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
      });

  },

};

module.exports = trackOrderDB;