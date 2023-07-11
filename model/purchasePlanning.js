const connection = require('../db');

const purchasePlanningDB = {
  // get all events 
  getAllEvents: async () => {
      let sql = `SELECT *
            FROM purchasePlanning`;

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
  addEvent: async(title, start_datetime, end_datetime, description) => {
    let sql = `INSERT INTO purchasePlanning(title, start_datetime, end_datetime, description) VALUES (?,?,?,?)`;

    return connection.promise()
    .query(sql, [title, start_datetime, end_datetime, description])
    .catch((err) => {
        console.log(err);
        throw err;
    })
},

  // delete event
  deleteEvent: async(eventID) => {
    let sql = 'DELETE FROM purchasePlanning WHERE eventID = ?';

    return connection.promise()
    .query(sql, [eventID])
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