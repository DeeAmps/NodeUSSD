const pg = require("pg");

require('dotenv').config();
const _conStr = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}

let client = new pg.Pool(_conStr);
module.exports = client;