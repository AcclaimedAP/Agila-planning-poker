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

app.use("/login", express.json());

app.post("/login", (req, res) => {
  const { username } = req.body;
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
    }
  });
});

const tasks = [];
const currentVotes = [];
io.on("connection", (socket) => {
  console.log("Connected User");
  console.log(socket.id);

  socket.on("add-task", (task) => {
    tasks.push(task);
    io.emit("add-task", tasks);
  });
  socket.on("user-vote", (voteObj) => {
    currentVotes.push(voteObj);
    io.emit("user-vote", currentVotes);
  });
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

module.exports = app;
