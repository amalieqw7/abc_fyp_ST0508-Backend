const purchasePlanModel = require('../model/purchasePlanning');

// get all events
module.exports.getAllEvents = async (req, res, next) => {
  return purchasePlanModel
      .getAllEvents()
      .then((result) => {
          if (result == null) {
              res.send(404).send(`There are no events available.`)
          }
          else {
              res.status(200).send(result);
          }
      });
};

// insert new event
module.exports.addEvent = async(req, res, next) => {
  let title = req.body.title;
  let start_datetime = req.body.start_datetime;
  let end_datetime = req.body.end_datetime;
  let description = req.body.description;

  return purchasePlanModel
  .addEvent(title, start_datetime, end_datetime, description)
  .then(() => {
      return res.status(201).send(`Event Created!`);
  })
  .catch((err) => {
      console.log(err);
      return res.status(500).send(`Unknown Error`);
  });
};

// delete event
module.exports.deleteEvent = async (req, res, next) => {
  let eventID = parseInt(req.params.id);

  if (isNaN(eventID)) {
      res.status(400).send(`please input a number`);
      return;
  }

  return purchasePlanModel
    .deleteEvent(eventID)
    .then((result) => {
        if(result.affectedRows == 0){
            res.status(404).send(`Event #${eventID} does not exist!`);
        }
        else{
            res.status(201).send(`Event #${eventID} has been deleted!`);
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send(`Unknown error`);
    });
};


