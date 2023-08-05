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
  let userID = req.body.userID;
  let title = req.body.title;
  let start_datetime = req.body.start_datetime;
  let end_datetime = req.body.end_datetime;
  let description = req.body.description;
  let viewAccessID = req.body.viewAccessID;

  return purchasePlanModel
  .addEvent(userID, title, start_datetime, end_datetime, description, viewAccessID)
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
  let planID = parseInt(req.params.id);

  if (isNaN(planID)) {
      res.status(400).send(`please input a number`);
      return;
  }

  return purchasePlanModel
    .deleteEvent(planID)
    .then((result) => {
        if(result.affectedRows == 0){
            res.status(404).send(`Event #${planID} does not exist!`);
        }
        else{
            res.status(201).send(`Event #${planID} has been deleted!`);
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send(`Unknown error`);
    });
};


//create new viewaccess 
module.exports.createViewAccess = async (req, res, next) => {
    let access = req.body.viewAccess;

    return purchasePlanModel
    .createViewAcess(access)
    .then(() => {
        return res.status(201).send(`View Access: '${access}' successfully created`);
    })
    .catch((err) => {
        console.log(err);
        if(err.code === 'ER_DUP_ENTRY') {
            return res.status(409).send(` ${access} already exists.`);
        }
        else {
            console.log(err)
            return res.status(500).send(`unknown error`);
        }
    })
}

module.exports.getAllViewAccess = async (req, res, next) => {
    return purchasePlanModel
    .getAllViewAccess()
    .then((result) => {
        if (result[0] == null) {
            res.send(`There are no View access currently`)
        } else {
            return res.status(200).send(result);
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send(`unknown error`)
    })
}

module.exports.getIDbyVAccess = async (req, res, next) => {
    let access = req.params.viewAccess;

    return purchasePlanModel
    .getIDbyVAccess(access)
    .then((result) => {
        if (result[0] == null) {
            res.send(`View Access ${access} not found`);
        } else {
            res.status(200).send(result);
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('unknown error');
    })
}