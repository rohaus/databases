var mysql = require('mysql');
var url = require('url');
var http = require('http');
var Sequelize = require("sequelize");
// var Q = require("q");

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-Type": "application/json"
};

var sequelize = new Sequelize("chat_kh0107", "root");

var Messages = sequelize.define('Messages', {
  text: Sequelize.TEXT
});

var Users = sequelize.define('Users', {
  username: Sequelize.STRING
});

var Rooms = sequelize.define('Rooms', {
  roomname: { type: Sequelize.STRING }
});

Users.hasMany(Messages, {as: 'text'});
Rooms.hasMany(Messages, {as: 'text'});
Messages.belongsTo(Users);
Messages.belongsTo(Rooms);

var sendResponse = module.exports.sendResponse = function(response, message, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(message);
};

module.exports.handleRequest = function (req, res) {
  var messages = [];
  sequelize.sync();

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
        sequelize.sync().success(function(){
          Messages.create({text: message.text}).success(function(msg){
            Users.create({username: message.username}).success(function(user){
              console.log("MSG:", msg);
              console.log("USER:", user);
              msg.updateAttributes({UserId: user.dataValues.id});
            });
            Rooms.create({roomname: message.roomname}).success(function(room){
              msg.updateAttributes({RoomId: room.dataValues.id});
            });
          });
        });
        sendResponse(res, "", 201);
      });
    }
  }else{
    sendResponse(res, "URL does not exist", 404);
  }
};
