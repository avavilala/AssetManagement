var express = require('express');
var app = express();


app.use(express.static(__dirname + "/"));
app.get('/', function(req, res) {
    console.log("haha");
    res.sendfile('./public/index.html');
});

app.get('/add_assets', function(req, res) {

    response = {
        assetname: req.query.assetname,
        assetID: req.query.assetID
    }
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.createCollection("assets", function(err, res) {
            if (err) throw err;
            console.log('Collection Created Succesfully');
            db.close();

        })

        db.collection("assets").insertOne(response, function(err, res) {
            if (err) throw err;
            console.log('Document Created Succesfully');
            console.log(res.insertedCount);
            db.close();
        })

    })
})

// app.get('/show_assets', function(req, res) {
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         db.collection("assets").find({}).toArray(function(err, result) {
//             if (err) throw err;
//             console.log(result);
//             db.close();
//         });
//     })
// })
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://ashweeza:ashweeza@ds044587.mlab.com:44587/mydatabase";