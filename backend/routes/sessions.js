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
    var sql = "SELECT * FROM sessions";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    })
});

router.post("/connect", (req, res) => {
    var sql = "SELECT * FROM sessions WHERE active = 1";
    const entry = {
        "id": req.body.id
    }
    console.log(JSON.stringify(entry));
  con.query(sql, (err, result) => {
    if (err) throw err;
      if (result = []) {
          sql = `INSERT INTO sessions (userID) VALUES (?)`;
          var values = [JSON.stringify(entry)];
          con.query(sql, values, (err, result) => {
              if (err) throw err;
              res.status(200).json(result);
          });
      } else {
          res.status(200).json(result);
    }
  });
});

module.exports = router;
