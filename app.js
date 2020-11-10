var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var app = express();
var authRouter = require("./routes/auth.routes");
var usersRouter = require("./routes/user.routes");
var mongoose = require("mongoose");

//const db = require("./models/index");
const authJwt = require("./middlewares/auth");

app.use(logger("dev"));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use('/', authRouter);
const db = require("./models");
const Role = db.role;

db.mongoose
  .connect("mongodb://127.0.0.1:27017/jwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ instrucciones: "Por medio de postman, crear una cuenta. Usar ejemplo de json del final y signup, para ingresar se usa sign in. Para probar que sirvan los roles, mirar user.routes",
  "username":"Usuario",
  "password": "12345678",
  "roles": ["user", "moderator", "admin"]});
});
app.use("/api/test", usersRouter);
app.use("/api/auth", authRouter);

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

module.exports = app;
