const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mysql = require("mysql2");
// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();

const cors = require("cors");
const indexRouter = require("./routes/index");

const app = express();
app.use(cors());

const { DB_PORT } = process.env;

app.locals.con = mysql.createConnection({
  host: "localhost",
  port: DB_PORT,
  user: "billy",
  password: "billyspw",
  database: "planning-poker-billy",
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM users";
  app.locals.con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

module.exports = app;
