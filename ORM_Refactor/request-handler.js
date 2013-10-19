var mysql = require('mysql');
var url = require('url');
var http = require('http');
var Sequelize = require("sequelize");

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-Type": "application/json"
};

var sequelize = new Sequelize("chat_kh0107", "root");

var Messages = sequelize.define('Messages', {
  username: Sequelize.STRING,
  text: Sequelize.TEXT,
  roomname: Sequelize.STRING
});

var sendResponse = module.exports.sendResponse = function(response, message, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(message);
};

module.exports.handleRequest = function (req, res) {
  var messages = [];
  Messages.sync();

  if( url.parse(req.url).pathname === "/classes/room" ){
    if( req.method === "OPTIONS" ){
      sendResponse(res, '');
    }else if( req.method === "GET" ){
      Messages.findAll().success(function(results){
        for(var i = 0; i < results.length; i++){
          messages.push(results[i].dataValues);
        }
        sendResponse(res, JSON.stringify(messages));
      });
    }else if( req.method === "POST" ){
      var data = "";
      req.on('data', function(chunk){
        data += chunk;
      });
      req.on('end', function(){
        var message = JSON.parse(data);
        var newMessage = Messages.build(message);
        newMessage.save().success(function(){
          console.log("SUCCESS!");
        });
        sendResponse(res, "", 201);
      });
    }
  }else{
    sendResponse(res, "URL does not exist", 404);
  }
};
