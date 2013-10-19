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

var messages = [];

var sendResponse = module.exports.sendResponse = function(response, message, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(message);
};

module.exports.handleRequest = function (req, res) {
  if( url.parse(req.url).pathname === "/classes/room" ){
    if( req.method === "OPTIONS" ){
      sendResponse(res, '');
    }else if( req.method === "GET" ){
      sendResponse(res, JSON.stringify(messages));
    }else if( req.method === "POST" ){
      var data = "";
      req.on('data', function(chunk){
        data += chunk;
      });
      req.on('end', function(){
        var message = JSON.parse(data);
        console.log('message: ', message);
        // objectID++;
        // message.objectID = objectID;
        // message.createdAt = Date();
        messages.push(message);
        sendResponse(res, "", 201);
      });
    }
  }else{
    sendResponse(res, "URL does not exist", 404);
  }
};
