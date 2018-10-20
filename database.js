const mysql = require('mysql');
const password = require('../../../../password.json');

 
module.exports = function handle_db(req, res) {

    var pool = mysql.createPool({
        connectionLimit: 100,
        host: "91.200.100.133",
        user: "thx4fish",
        password: password.password,
        database: "thx4fish"
    });

    pool.getConnection(function (err, connection) {
        if (err) {
            console.error("This is error msg, when connecting to db: " + err);
            connection.release();
            res.json({ "code": 100, "status": "Error in connecting database" });
            return;
        }
        console.log("from db config: connected as id: " + connection.threadId);
        connection.on('error', function (err) {
            res.json({ "code": 100, "status": "Error in connection database" });
            return;
        });
        return connection;
    });
    return pool;
};