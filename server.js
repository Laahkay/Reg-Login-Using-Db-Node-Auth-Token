var express = require("express");
app = express();

const dotenv = require("dotenv").config();
const URI = process.env.MONGO_URI;
const port = process.env.PORT;

User = require("./models/userModel");
  bodyParser = require("body-parser");
  jsonwebtoken = require("jsonwebtoken");

const mongoose = require("mongoose");
var routes = require("./route/userRoute");

mongoose
  .connect(URI)
  .then((res) => console.log("Connected To MongoDb Dabase"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use( (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "MYRESTFULAPIs",
       (err, decode)=> {
        if (err) req.user = undefined || null;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});
routes(app);

app.use( (req, res)=> {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port, () => console.log(`Server Is Active On Port ${port}`));

module.exports = app;
