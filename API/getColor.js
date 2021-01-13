const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");

app.use(function (req, res, next) {  
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain to make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

const uri = require("../config/dbSort").MongoURI;

app.get("/getColor", (req, res) => {
  MongoClient.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },

    (err, db) => {
      if (err) console.log(err);

      let mydb = db.db("Search"); //your DB name
      let config = mydb.collection("Config"); //your DB collection config for colors

      config.find({}).toArray((err, docs) => {
        res.send(docs);
        if (err) throw err;
      });
    }
  );
});

module.exports = app;
