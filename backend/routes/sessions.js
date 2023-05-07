const express = require("express");
const mysql = require('mysql2');
const router = express.Router();

const { DB_PORT } = process.env;

var con = mysql.createConnection({
  host: "localhost",
  port: DB_PORT,
  user: "billy",
  password: "billyspw",
  database: "planning-poker-billy",
});

/* GET home page. */
router.get("/", (req, res) => {
    res.json('Sessions');
});

router.get("/connect", (req, res) => {
var sql = "SELECT * FROM sessions WHERE active = 1";
  con.query(sql, (err, result) => {
    if (err) throw err;
      if (result = []) {
          sql = `INSERT INTO sessions (userID) VALUES ${mysql.escape(req.body.id)}`;
          con.query(sql, (err, result) => {
              if (err) throw err;
              res.status(200).json(result);
          });
      } else {
          res.status(200).json(result);
    }
  });
});

module.exports = router;
