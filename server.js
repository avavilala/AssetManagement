var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var objectID = require('mongodb').ObjectID;
var bodyparser = require('body-parser');
var url = "mongodb://ashweeza:ashweeza@ds044587.mlab.com:44587/mydatabase";
app.use(express.static(__dirname + "/"));
app.use(bodyparser.json())
var server = app.listen(8082, function(req, res) {
    var host = server.address().address
    var port = server.address().port
    console.log('Server listening at %s:%s', host, port);
});

app.get('/', function(req, res) {
    console.log("hahaha");
    res.sendfile('./public/index.html');
});

app.get('/show_assets', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("assets").find({}).toArray(function(err, result) {
            if (err) throw err;
            // console.log(result);
            res.json(result);
            db.close();
        });
        //res.send("this is the response from /sample")
    })
});
app.post('/delete_asset/', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var id = req.body._id;
        console.log("ID in delete:" + id);
        db.collection("assets").deleteOne({ "_id": objectID(id) }, function(err, resul) {
            if (err) throw err;
            console.log("1 document deleted");
            console.log("Error:" + err);
            res.send("Deleted")
            db.close();
        });
    });
});
app.put('/update_asset/:id', function(req, rese) {
    //console.log(req.params._id);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var id = req.body._id;
        var item = {
            assetname: req.body.assetname,
            assetID: req.body.assetID
        };
        console.log("ID in update" + id);
        console.log("New Data" + item);
        db.collection("assets").updateOne({ "_id": objectID(id) }, { $set: item }, function(err, resa) {
            if (err) throw err;
            console.log("1 document updated");
            console.log("RES IN UPDATE:" + resa.result.n);
            console.log("Error:" + err);
            db.close();
        });
    });
});
app.post('/add_asset', function(reqq, res) {

    console.log(reqq.body);
    response = {
        assetname: reqq.body.assetname,
        assetID: reqq.body.assetID
    }
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        // db.createCollection("assets", function(errs, res) {
        //     if (errs) throw errs;
        //     console.log('Collection Created Succesfully');
        //     db.close();

        // });

        db.collection("assets").insertOne(reqq.body, function(errv, resl) {
            if (errv) throw errv;
            //console.log(response);
            console.log('Document Created Succesfully');
            console.log(resl);
            res.send('Document Created Succesfully')
            db.close();
        })

    })
})