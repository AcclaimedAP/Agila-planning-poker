const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const server = require("http").createServer(app);

require("dotenv").config();

server.listen(3000, () => {
  console.log("Server started on port 3000");
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const indexRouter = require("./routes/index");
const sessionRouter = require("./routes/sessions");

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

io.on("connection", (socket) => {
  console.log("Connected User");
  console.log(socket.id);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/sessions", sessionRouter);

module.exports = app;
