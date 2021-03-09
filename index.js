const express = require("express");
const bodyParser = require("body-parser");
// const fetch = require("node-fetch");
const app = express();
const port = 3000;

const middlewares = [bodyParser.urlencoded({ extended: true })];

app.use(middlewares);
app.use(express.static("static"));

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
    res.render("home");
});

app.post("/", (req, res) => {
    res.render("home");
    const fromLocation = req.body.from;
    const toLocation = req.body.to;
    const date = req.body.date;
    console.log(`From ${fromLocation} to ${toLocation} on ${date}`);
});

app.get("/checkout", (req, res) => {
    res.render("checkout");
});

app.get("*", (req, res) => {
    res.render("404");
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
