const connection = require('../db');
const { connect } = require('../routes/idvRoutes/purchasePlanRoutes');

const purchasePlanningDB = {
  // get all events 
  getAllEvents: async () => {
      let sql = `SELECT *
            FROM planner`;

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

  // insert new event
  addEvent: async(userID, title, start_datetime, end_datetime, description, viewAccessID) => {
    let sql = `INSERT INTO planner(userID, title, start_datetime, end_datetime, description, viewAccessID) VALUES (?,?,?,?,?,?)`;

    return connection.promise()
    .query(sql, [userID, title, start_datetime, end_datetime, description, viewAccessID])
    .catch((err) => {
        console.log(err);
        throw err;
    })
},

  // delete event
  deleteEvent: async(planID) => {
    let sql = 'DELETE FROM planner WHERE planID = ?';

    return connection.promise()
    .query(sql, [planID])
    .then((result) => {
        if(result[0] == 0){
            return null;
        }
        else{
            return result[0];
        }
    })
    .catch((err) => {
        console.log(err);
        throw err;
    });
},

//create new view access 
createViewAcess: async(access) => {
    let sql = 'INSERT into planViewAccess (viewAccess) VALUES (?)';

    return connection.promise()
    .query(sql, [access])
    .catch((err) => {
        console.log(err)
        throw err;
    })
},


getAllViewAccess: async() => {
    let sql = 'SELECT viewAccess from planViewAccess';

    return connection.promise()
    .query(sql)
    .then((result) => {

        if (result.length == 0) {
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

getIDbyVAccess: async(access) => {
    const sql = `SELECT viewAccessID FROM planViewAccess WHERE viewAccess = ?`;

    return connection.promise()
    .query(sql, [access])
    .then((result) => {
        if (result.length == 0) {
            return null;
        } else {
            return result[0]
        }
    })
    .catch((err) => {
        console.log(err)
        return err;
    })
}








//   // update event
//   updateEvent: async(title, start_datetime, end_datetime, description, eventID) => {
//     let sql = `UPDATE purchasePlanning SET title = ? , start_datetime = ?, end_datetime = ?, description = ?
//                 WHERE eventID = ?`;

//     return connection.promise()
//     .query(sql,[title, start_datetime, end_datetime, description, eventID])
//     .then((result) => {
//         if(result[0] == 0){
//             return null;
//         }
//         else{
//             return result[0];
//         }
//     })
//     .catch((err) => {
//         console.log(err);
//         throw err;
//     })
// },



};

module.exports = purchasePlanningDB;