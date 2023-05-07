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

    
    var sql = "SELECT * FROM sessions WHERE active = 1 LIMIT 1";
    const entry = [req.body.id];
    console.log(JSON.stringify(entry));

    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.length == 0) {
            console.log("Inserting");
            sql = `INSERT INTO sessions (userID) VALUES (?)`;
            var values = [JSON.stringify(entry)];
            con.query(sql, values, (err, result) => {
                if (err) throw err;
              
                res.status(200).json(result);
            });
        } else {
            console.log("found");
            var values = [JSON.stringify(result[0].userID.concat(entry))];
            console.log(values);
            sql = `UPDATE sessions SET userID = (?)`;
            con.query(sql, values, (err, result) => {
                if (err) throw err;
                res.status(200).json(result);
            })
          
        }
    });
});

router.post('/add', (req, res) => {
    console.log("beep");
    var sql = "SELECT * FROM sessions WHERE active = 1 LIMIT 1";
     con.query(sql, async (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            console.log("No active session");
            res.status(500).json({ message: "No active session, please login again" });
        } else {
            console.log("found");
            var previousTasks = result[0].tasks;
            if (previousTasks == null) {
                previousTasks = []
            };
            
            /*var newTasks = [];
            for await (var task of req.body.tasks) {
                sql = `INSERT INTO tasks (title, description) VALUES (${mysql.escape(task.title)},${mysql.escape(task.description)})`;
                

                con.query(sql, async (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    newTasks.push(await result.insertId);
                });
                console.log(newTasks);
            }*/
            await addTasks(req.body.tasks).then(async taskList => {
                sql = `UPDATE sessions SET tasks = (?)`;
                var tasks = [JSON.stringify(previousTasks.concat(taskList))];
                con.query(sql, tasks, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    res.status(200).json(result);
                });
            })

            
            
          
        }
    });
})

async function addTasks(taskList) {
    var newTasks = [];

    for await (var task of taskList) {
        await addTask(task).then(result => {
            newTasks.push(result);
        });
        
    };
        return Promise.all(newTasks);
    
    
}
async function addTask(task) {

    return new Promise(resolve => {
        sql = `INSERT INTO tasks (title, description) VALUES (${mysql.escape(task.title)},${mysql.escape(task.description)})`;
        con.query(sql, async (err, result) => {
            if (err) throw err;
            resolve(result.insertId);
        });
    });
    
}

module.exports = router;
