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

app.post("/sort", (req, res) => {
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
      const dataSort = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        name: req.body.name,
      };
      // var startDate = new Date(dataSort.startDate);
      // var endDate = new Date(dataSort.endDate);
      var startDate = dataSort.startDate;
      var endDate = dataSort.endDate
      console.log(startDate)
      console.log(endDate)
      chart
        .find({})
        .sort({ date: 1, name: 1 })
        .collation({ locale: "en_US", numericOrdering: true })
        .toArray((err, docs) => {
          if (err) throw err;
          const { name } = dataSort;
          let response = docs.filter(
            (x) => x.date >= startDate && x.date <= endDate
          );
          if (dataSort.name.toLowerCase() !== "tất cả")
            response = response.filter((x) => x.name === name);
          res.write(JSON.stringify(response), () => {
            res.end();
          });
        });
    }
  );
});

module.exports = app;
