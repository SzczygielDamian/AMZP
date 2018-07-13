var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('md5');
var rest = require("./REST.js");
var app  = express();

function REST(){
  var self = this;
  self.connectMysql();
}

REST.prototype.connectMysql = function() {
  var self = this;
  var pool      =    mysql.createPool({
    connectionLimit : 100,
      host : '81.26.6.25',
      user : 'student02',
      password : 'p7Y8i6Hv',
      database : 'student02_db01',
      port : '7021',
      debug : false
  });
  pool.getConnection(function(err,connection){
    if(err) {
      self.stop(err);
    } else {
      self.configureExpress(connection);
    }
  });
};

REST.prototype.configureExpress = function(connection) {
  var self = this;
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  var router = express.Router();
  app.use('/api', router);
  var rest_router = new rest(router,connection,md5);
  self.startServer();
};

REST.prototype.startServer = function() {
  app.listen(3001,function(){
    console.log("Połączono. Port 3001");
  });
};

REST.prototype.stop = function(err) {
  console.log("ISSUE WITH MYSQL n" + err);
  process.exit(1);
};

new REST();
