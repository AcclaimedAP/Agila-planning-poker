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

app.use("/login", express.json());

let users = [];
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

  socket.on("user-connect", (user) => {
    users.push(user);
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

  socket.on("clear-votes", (arg) => {
    if (arg) {
      currentVotes = [];
    }
    io.emit("clear-votes");
  })
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

module.exports = app;
