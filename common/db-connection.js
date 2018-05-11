const config = require('config');
let host = config.get("db.host");
let port = config.get("db.port");
let name = config.get("db.name");

function db() {
    return "mongodb://" + host + ":" + port + "/" + name
}
module.exports = {
    db: db
}