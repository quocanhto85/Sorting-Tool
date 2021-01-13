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

      let mydb = db.db("Search"); //your DB name
      let chart = mydb.collection("Chart"); //your DB collection
      const dataSort = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        name: req.body.name,
      };
      let startDate = new Date(dataSort.startDate);
      let endDate = new Date(dataSort.endDate);
      chart
        .find({})
        .sort({ date: 1, name: 1 })
        .collation({ locale: "en_US", numericOrdering: true })
        .toArray((err, docs) => {
          if (err) throw err;
          const { name } = dataSort;
          let response = docs.filter(
            (x) => new Date(x.date) >= startDate && new Date(x.date) <= endDate
          );
          if (name.toLowerCase() !== "tất cả")
            response = response.filter((x) => x.name === name);
          res.write(JSON.stringify(response), () => {
            res.end();
          });
        });
    }
  );
});

module.exports = app;
