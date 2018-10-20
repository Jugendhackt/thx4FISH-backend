module.exports = function (app, pool) {
    app.get('/', function (req, res) {
        res.send("Welcome to C-sharp corner Api");
    });
};