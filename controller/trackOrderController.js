const trackOrderModel = require('../model/trackOrder');

//get all track orders
module.exports.getAllTrackOrder = async(req, res, next) => {
  return trackOrderModel
  .getAllTrackOrder()
  .then((result) => {
      if (result == null) {
          res.send(404).send(`There are no Track Orders available.`)
      }
      else {
          res.status(200).send(result);
      }
  });
}