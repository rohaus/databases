// From Web-historian - Keep this
var mysql = require('mysql');
var url = require('url');
var http = require('http');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-Type": "application/json"
};

var sendResponse = module.exports.sendResponse = function(response, message, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(message);
};

module.exports.handleRequest = function (req, res, connection) {
  var messages = [];

  if( url.parse(req.url).pathname === "/classes/room" ){
    if( req.method === "OPTIONS" ){
      sendResponse(res, '');
    }else if( req.method === "GET" ){
      var readTextSQL = "SELECT text from messages ORDER by id;";
      var readUserSQL = "SELECT username from messages ORDER by id;";
      var readRoomSQL = "SELECT roomname from messages ORDER by id;";

      var textCb = function(rows){
        for( var i = 0; i < rows.length; i++ ){
          messages[i] = messages[i] || {};
          messages[i]['text'] = rows[i]['text'];
        }
      };
      var userCb = function(rows){
        for( var i = 0; i < rows.length; i++ ){
          messages[i] = messages[i] || {};
          messages[i]['username'] = rows[i]['username'];
        }
      };
      var roomCb = function(rows){
        for( var i = 0; i < rows.length; i++ ){
          messages[i] = messages[i] || {};
          messages[i]['roomname'] = rows[i]['roomname'];
        }
      };

      connection.query(readTextSQL, function(errs, rows, fields){
        // console.log("SQL query error:",errs);
        textCb(rows);
      });
      connection.query(readUserSQL, function(errs, rows, fields){
        // console.log("SQL query error:",errs);
        userCb(rows);
      });
      connection.query(readRoomSQL, function(errs, rows, fields){
        // console.log("SQL query error:",errs);
        roomCb(rows);
        sendResponse(res, JSON.stringify(messages));
      });

    }else if( req.method === "POST" ){
      var data = "";
      req.on('data', function(chunk){
        data += chunk;
      });
      req.on('end', function(){
        console.log(data);
        var message = JSON.parse(data);
        escapedMsg = message.text.replace("'","\\'");
        var insertMsgSQL = "INSERT into Messages (Text, Username, Roomname) values ('"+ escapedMsg + "', '" + message.username +"', '"+ message.roomname +"')";
        connection.query(insertMsgSQL, function(errs, rows, fields){
          console.log("SQL query error:",errs);
        });
        // objectID++;
        // message.objectID = objectID;
        // message.createdAt = Date();
        // messages.push(message);
        sendResponse(res, "", 201);
      });
    }
  }else{
    sendResponse(res, "URL does not exist", 404);
  }
};
