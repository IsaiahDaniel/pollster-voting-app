const express = require("express");
const app = express();

const mysql = require("mysql");

app.set("view engine", "ejs");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "polling-app",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/", (req, res) => {
  res.render("index", { foo: "bar" });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/polls", (req, res) => {
  db.query("SELECT * FROM polling_unit", (err, result, fields) => {
    if (err) throw err;
    res.render("polls", { data: result });
  });
});

app.get("/lga-polls", (req, res) => {
  // SELECT announced_pu_results.party_score, announced_pu_results.party_abbreviation, announced_pu_results.polling_unit_uniqueid, polling_unit.uniqueid FROM polling_unit INNER JOIN polling_unit ON  announced_pu_results.polling_unit_uniqueid = polling_unit.uniqueid"
  db.query(
    "SELECT * FROM announced_pu_results",
    (err, result, fields) => {
      if (err) throw err;
      res.render("lga-polls", { data: result });
    }
  );
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
