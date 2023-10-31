const mysql2 = require("mysql2/promise");
const util = require("util");
const dbhost = "localhost";
const dbuser = "root";
const dbpass = "";
const dbname = "p2c";

async function connect() {
    if (global.connection && global.connection.state !== "disconnected") {
      return global.connection;
    }
  
    try {
        const connection = await mysql2.createConnection({
        host: dbhost,
        user: dbuser,
        password: dbpass,
        database: dbname,
      });
      console.log("Conectou no MySQL!");
      global.connection = connection;
      return connection;
    } catch (e) {
      console.log("Ocorreu um erro ao conectar no MySQL!", e);
    }

  }
  module.exports = {connect};