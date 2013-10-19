var mysql = require('mysql');
var http = require("http");
var url = require("url");
var requestHandler = require("./request-handler.js");

var port = 8081;
var ip = "127.0.0.1";

var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat_rr1012"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */

var router = {"/classes/room": requestHandler};
var server = http.createServer(requestHandler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
