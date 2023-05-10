const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const server = require("http").createServer(app);
// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();

server.listen(3000, () => {
  console.log("Server started on port 3000");
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const indexRouter = require("./routes/index");

const { DB_PORT } = process.env;

app.locals.con = mysql.createConnection({
  host: "localhost",
  port: DB_PORT,
  user: "root",
  password: "root",
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

app.use("/login", express.json());

let users = [];

app.post("/login", (req, res) => {
  const { username, isAdmin } = req.body;
  const sql = `SELECT * FROM users WHERE name = '${username}'`;

  app.locals.con.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error logging in" });
    } else {
      console.log(result);
      res.json({
        message: `'${username}' connected, great success (in Borat voice)`,
      });

      users.push(username);
      io.emit("user-connect", users);
    }
  });
});

let tasks = [];
let currentVotes = [];
const completedVotes = [];

io.on("connection", (socket) => {
  socket.on("add-task", (task) => {
    tasks.push(task);
    io.emit("add-task", tasks);
  });

  socket.on("task-to-vote-on", (task) => {
    console.log(tasks);
    tasks = tasks.filter(
      (t) =>
        t.taskTitle !== task.taskTitle ||
        t.taskDescription !== task.taskDescription
    );
    io.emit("add-task", tasks);
    io.emit("task-to-vote-on", task);
  });

  socket.on("user-connect", (username) => {
    console.log(`${username} connected`);
    if (!username) users.push(username);
    io.emit("user-connect", users);
  });

  socket.on("user-vote", (voteObj) => {
    currentVotes.push(voteObj);
    io.emit("user-vote", currentVotes);
  });

  socket.on("completed-vote", (completedVote) => {
    completedVotes.push(completedVote);
    io.emit("completed-vote", completedVotes);
  });
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

module.exports = app;
