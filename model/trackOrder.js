const connection = require('../db');

const trackOrderDB = {
  // get all track order to display
  getAllTrackOrder: async () => {
    let sql = `SELECT PR.prID, DATE_FORMAT(PR.requestdate, "%d %M %Y") as requestDate, U.name, S.supplierName
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

  // add purchase status
  addPurchaseStatus: async (purchaseStatus) => {
    let sql = `INSERT INTO purchaseStatus(purchaseStatus) VALUES (?)`;

    return connection.promise()
      .query(sql, [purchaseStatus])
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },

  // get all purchase statuses
  getAllPurchaseStatus: async () => {
    let sql = `SELECT * FROM purchaseStatus
              ORDER BY purchaseStatusID asc`;

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

  // insert data into purchase order
  addPurchaseOrder: async (prID, paymentStatusID, purchaseStatusID, ptRemarks) => {
    let sql = `INSERT INTO purchaseOrder(prID) VALUES (?);`;                           

    return connection.promise()
      .query(sql, [prID])
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },


};

module.exports = trackOrderDB;