const connection = require('../db');

const trackOrderDB = {
  // get all track order to display
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
    let sql = `INSERT INTO purchaseOrder(prID, paymentStatusID, purchaseStatusID, ptRemarks) 
                SELECT PR.prID, PayS.paymentStatusID, PS.purchaseStatusID, PR.remarks
                FROM purchaseRequest PR, paymentStatus PayS, purchaseStatus PS
                WHERE PR.prStatusID = 2
                AND PayS.paymentStatusID = 1
                AND PS.purchaseStatusID = 1;    
                                `;

    return connection.promise()
      .query(sql, [prID, paymentStatusID, purchaseStatusID, ptRemarks])
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },


};

module.exports = trackOrderDB;