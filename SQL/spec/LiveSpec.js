var mysql = require('mysql');
var request = require("request");

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: "root",
      password: "",
      database: "chat_rr1012"
    });
    dbConnection.connect();
    var tablename = "Messages";

    dbConnection.query("DELETE FROM " + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert posted messages to the DB", function(done) {
    request({method: "POST",
              uri: "http://127.0.0.1:8081/classes/room",
              body: JSON.stringify({username: "Valjean",
                    text: "In mercy's name, three days is all I need."})
            },
            function(error, response, body) {
              var queryString = "SELECT * FROM MESSAGES;";
              dbConnection.query( queryString,
                function(err, results, fields) {
                  expect(results.length).toEqual(1);
                  expect(results[0].username).toEqual("Valjean");
                  expect(results[0].text).toEqual("In mercy's name, three days is all I need.");
                  done();
                });
            });
  });

  it("Should output all messages from the DB", function(done) {
    var queryString = "INSERT into Messages SET ?";
    var queryArgs = {username:"Javert", text:"Men like you can never change!"};
    dbConnection.query( queryString, queryArgs,
      function(err, results, fields) {
        request("http://127.0.0.1:8081/classes/room",
          function(error, response, body) {
            var messageLog = JSON.parse(body);
            expect(messageLog[0].username).toEqual("Javert");
            expect(messageLog[0].text).toEqual("Men like you can never change!");
            done();
          });
      });
  });
});
