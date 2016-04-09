/**
 * Created by dhnhan on 4/8/2016.
 * @type {*|exports|module.exports}
 */
var express = require('express');
var mysql = require('mysql');
var md5 = require('MD5');
var rest = require('./REST.js');
var app = express();
var bodyParser = require('body-parser');


function REST(){
    var self = this;
    self.connectionMySQL();
    self.configIndex();
};

REST.prototype.connectionMySQL = function(){
    var self = this;
    var pool = mysql.createPool({
        connectionLimit : 100,
        host            : 'localhost',
        user            : 'root',
        password        : '',
        database        : 'music',
        debug           : false
    });
    pool.getConnection(function(err,connection){
        if (err){
            self.stop(err);
        } else {
            self.configureExpress(connection);
        }
    });
}

REST.prototype.configureExpress = function(connection){
    var self = this;
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    var router = express.Router();
    app.use('/api', router);
    var rest_router = new rest(router,connection,md5);
    self.startServer();
}

REST.prototype.configIndex = function(){
    app.use(express.static('public'));
    app.get('/', function (req, res) {
        res.sendFile( __dirname + "/" + "index.html" );
    });
}

REST.prototype.startServer = function(){
    app.listen(8080, function(){
        console.log('Server running...');
    })
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL \n" + err);
    process.exit(1);
}

new REST();

