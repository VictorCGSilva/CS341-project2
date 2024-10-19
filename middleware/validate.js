const validator = require('../helpers/validate');
const saveContact = (req, res, next) => {
  const validationRule = {
    console_id: 'required|integer',
    name: 'required|string',
    manufacturer: 'required|string',
    generation: 'required|string',
    unitSold: 'string',
    yearRelease: 'required|string',
    yearDiscont: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};
module.exports = {
  saveContact
};