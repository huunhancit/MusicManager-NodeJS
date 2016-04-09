/**
 * Created by dhnhan on 4/8/2016.
 */
var mysql = require("mysql");

function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRouters(router, connection, md5);
}

REST_ROUTER.prototype.handleRouters = function (router, connection, md5) {
    var self = this;

    function parseObjectMusic(rows) {
        var musics = [];
        var music;
        for (var i = 0; i < rows.length; i++) {
            music = {};
            music.ID = rows[i].ID;
            music.NAME = rows[i].NAME;
            music.AUTHOR = rows[i].AUTHOR;
            music.NAME_TYPE = rows[i].NAME_TYPE;
            musics.push(music);
        }
        return musics;
    }

    router.get('/music', function (req, res) {
        var query = "SELECT A.ID, A.NAME, A.AUTHOR, B.NAME_TYPE FROM ?? A JOIN ?? B ON A.ID_MUSIC_TYPE = B.ID";
        var table = ["MUSIC", "MUSIC_TYPE"];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({"Error": true, "Data": "Error executing MySQL query"});
            } else {
                res.json({"Error": false, "Data": parseObjectMusic(rows)});
            }
        });
    });

    router.post('/music', function (req, res) {
        var query = "INSERT INTO MUSIC (NAME,AUTHOR,ID_MUSIC_TYPE) VALUES(?,?,?)";
        var table = [req.body.NAME, req.body.AUTHOR, req.body.TYPE];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({"Error": true, "Message": "Error executing MySQL query"});
            } else {
                res.json({"Error": false, "Message": "Music Added !"});
            }
        })
    });

    function parseObjectMusicType(rows) {
        var music_types = [];
        var music_type;
        for (var i = 0; i < rows.length; i++) {
            music_type = {};
            music_type.ID = rows[i].ID;
            music_type.NAME = rows[i].NAME_TYPE;
            music_types.push(music_type);
        }
        return music_types;
    }

    router.get('/music_type', function (req, res) {
        var query = "SELECT ID,NAME_TYPE FROM MUSIC_TYPE";
        var table = [];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({"Error": true, "Data": "Error executing MySQL query"});
            } else {
                res.json({"Error": false, "Data": parseObjectMusicType(rows)});
            }
        });
    });

    function parseObjectMusicByID(rows) {
        var music = {};
        if (rows.length > 0) {
            music.ID = rows[0].ID;
            music.NAME = rows[0].NAME;
            music.AUTHOR = rows[0].AUTHOR;
            music.TYPE = rows[0].ID_MUSIC_TYPE;
        }
        return music;
    }

    router.get('/music/:id', function (req, res) {
        var query = "SELECT ID, NAME, AUTHOR, ID_MUSIC_TYPE FROM MUSIC WHERE ID = ?";
        var table = [req.params.id];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({"Error": true, "Data": "Error executing MySQL query"});
            } else {
                res.json({"Error": false, "Data": parseObjectMusicByID(rows)});
            }
        });
    });

    router.put('/music', function (req, res) {
        var query = "UPDATE MUSIC SET NAME = ?, AUTHOR = ?, ID_MUSIC_TYPE = ? WHERE ID = ?";
        var table = [req.body.NAME, req.body.AUTHOR, req.body.TYPE, req.body.ID];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({"Error": true, "Message": "Error executing MySQL query"});
            } else {
                res.json({"Error": false, "Message": "Music Updated!"});
            }
        })
    });

    router.delete('/music/:id', function (req, res) {
        var query = "DELETE FROM MUSIC WHERE ID = ?";
        var table = [req.params.id];
        query = mysql.format(query, table);
        console.log(query);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({"Error": true, "Message": "Error executing MySQL query"});
            } else {
                res.json({"Error": false, "Message": "Music Deleted!"});
            }
        });
    });

    router.delete('/music/all/:ids', function (req, res) {
        var query = "DELETE FROM MUSIC WHERE ID IN (" + req.params.ids + ")";
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({"Error": true, "Message": "Error executing MySQL query"});
            } else {
                res.json({"Error": false, "Message": "Music Deleted!"});
            }
        })
    });

    router.post('/music_type', function (req, res) {
        var query = "INSERT INTO MUSIC_TYPE(NAME_TYPE, DESCRIPTION) VALUES (?, ?)";
        var table = [req.body.NAME, req.body.DESCRIPTION];
        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
                res.json({"Error": true, "Message": "Error executing MySQL query"});
            } else {
                res.json({"Error": false, "Message": "Music Deleted!"});
            }
        })
    });

    router.get('/music/filter/:typeID', function (req, res) {
        var query = "SELECT A.ID, A.NAME, A.AUTHOR, B.NAME_TYPE FROM MUSIC A JOIN MUSIC_TYPE B ON A.ID_MUSIC_TYPE = B.ID WHERE A.ID_MUSIC_TYPE = ?";
        var table = [req.params.typeID];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows){
            if (err) {
                res.json({"Error": true, "Data": "Error executing MySQL query"});
            } else {
                res.json({"Error": false, "Data": parseObjectMusic(rows)});
            }
        });
    });

}

module.exports = REST_ROUTER;

