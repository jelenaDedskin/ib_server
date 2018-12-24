require('dotenv').config();
var db = require('./db.js');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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
app.post('/consume', function (req, res) {
    var callId = req.body.callId;
    var price = req.body.price;

    if (typeof callId === 'undefined' || typeof price === 'undefined') {
        errorResponse(res, "Invalid request data");
    } else {
        try {
            db.updateCall(callId, price);
        } catch (error) {
            errorResponse(res, error);
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            data:  "Call was successfully updated"
        }));
    }

});

app.listen(process.env.PORT, function () {
    console.log('Example app listening on port 3001!');
});

function errorResponse(res, msg) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        error:  msg
    }));
}