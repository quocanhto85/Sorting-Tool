const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain to make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
const uri = require("../config/dbSort").MongoURI; //your authentication URI string

app.get("/getDataSort", (req, res) => {
  MongoClient.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },

    (err, db) => {
      if (err) console.log(err);

      var mydb = db.db("Search"); //your DB name
      var chart = mydb.collection("Chart"); //your DB collection
      chart
        .find({})
        .sort({ date: 1, name: 1 })
        .collation({ locale: "en_US", numericOrdering: true })
        .toArray((err, docs) => {
          if (err) throw err;
          else res.send(docs);
        });
    }
  );
});

module.exports = app;
