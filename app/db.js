const { Connection } = require('tedious');
const { Request } = require('tedious');

const config = {
  userName: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  port: process.env.DB_PORT,
  options: {
    database: process.env.DB_NAME,
    encrypt: true,
  },
};

const connection = new Connection(config);

module.exports = {
  updateCall: async (callId, price) => {
    const sqlString = `UPDATE ib_call_table
                     SET price=${price}, status='calculated'
                     WHERE call_id=${callId};`;
    return new Promise((resolve, reject) => {
      const request = new Request(sqlString, (err, rowCount) => {
        if (err) {
          reject(err);
        } else {
          resolve(rowCount);
        }
      });

      connection.execSql(request);
    });
  },
};
