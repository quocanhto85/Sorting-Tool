const express = require("express");
const app = express();
const mongoose = require("mongoose");
const getColor = require("./API/getColor");
const getDataSort = require("./API/getDataSort");
const userRegister = require("./routes/user");
const sort = require("./API/sort");
const port = 8000;
const dbUser = require("./config/dbUser").MongoURI;


mongoose.connect(dbUser, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connecting to User Database"))
      .catch(err => console.log(err));

app.use("/", getColor);
app.use("/", getDataSort);
app.use("/", sort);
app.use("/", userRegister);
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});