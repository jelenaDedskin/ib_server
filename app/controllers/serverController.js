require('dotenv').config();
const responseHandler = require('../helpers/responseHandler');
const db = require('../db');

module.exports = {
  consume: async (req, res) => {
    const { callId } = req.body;
    const { price } = req.body;

    if (typeof callId === 'undefined' || typeof price === 'undefined') {
      responseHandler.errorResponse(res, 'Invalid request data');
    } else {
      await db.updateCall(callId, price);
      responseHandler.successResponse(res, 'Call was updated');
    }
  },
};
