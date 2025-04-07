const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const verifyToken = require("./verifyUser");
//
const register = require("./Register");
const login = require("./Login");
const home = require("./Home");
const teacher = require("./teacher");
const subjects = require("./Subjects");
const timeTable = require("./Timetable");
const Application = require("./Application");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://brijendra2003.github.io", "http://localhost:5173"],
    credentials: true,
  })
); // Adjust for frontend
app.use(cookieParser());
// app.use("/assets", express.static(path.join(__dirname, "assets")));
//
const db = mysql.createConnection({
  host: "gondola.proxy.rlwy.net",
  user: "root",
  password: "uGPYemQOyPMoOmHiBUvWVeMzfWznnHLS",
  database: "railway",
  port: "14516",
  connectTimeout: 10000,
});
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "shreeram",
//   database: "universalClg",
// });

db.connect((err) => {
  if (err) console.log(err);
  else console.log("MySQL Connected...");
});

// **User Registration**
register(bcrypt, app, db);
// ** User Login**
login(bcrypt, jwt, app, db);
//
home(app, db, verifyToken);
//
teacher(app, db, verifyToken);
//
subjects(app, db, verifyToken);
//
timeTable(app, db, verifyToken);
//
Application(app, db);
//q

// **Logout**
app.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
  // db.end();
});

const port = 5000;

app.listen(port, "0.0.0.0", () =>
  console.log(`Server running on port ${port} `)
);
