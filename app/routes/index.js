const express = require('express');
const serverController = require('../controllers/serverController');

const router = express.Router();

/**
 * @api {post} /consume/ Accumulate call data
 * @apiName Consume
 * @apiGroup User
 *
 * @apiParam {Number} callId Call unique ID.
 * @apiParam {Number} price Calculated price.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "data": "Call was successfully updated "
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "error": "Invalid request data"
 *     }
 */
router.post('/consume', (req, res) => {
  console.log('t');
  serverController.consume(req, res);
});

// the catch all route
router.all('*', (req, res) => {
  res.status(404).send({
    data: '',
    error: 'Not found',
  });
});

module.exports = router;
