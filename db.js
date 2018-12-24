var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    port: process.env.DB_PORT,
    options: {
        database: process.env.DB_NAME,
        encrypt: true
    }
};

var connection = new Connection(config);

connection.on('connect', function(err) {
    if (err) {
        console.log(err);
    }
});
module.exports = {
    updateCall: function(callId, price) {
        request = new Request('' +
            'UPDATE ib_call_table ' +
            'SET price=' + price + ' ' +
            'WHERE call_id=' + callId, function (err, rowCount) {
            if (err) {
                return err;
            } else {
                console.log(rowCount + ' rows');
            }
        });

        connection.execSql(request);
    }

};