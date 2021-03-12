const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const middlewares = [bodyParser.urlencoded({ extended: true })];

// const { convertLocations } = require("./static/js/modules/places");

const { init } = require("./scripts/app");

app.use(middlewares);
app.use(express.static("static"));

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
    res.render("home");
});

app.post("/", (req, res) => {
    res.render("home");
    const fromInputValue = req.body.from;
    const toInputValue = req.body.to;
    const dateInputValue = req.body.date;

    console.log(
        `From ${fromInputValue} to ${toInputValue} on ${dateInputValue}`
    );

    init(fromInputValue, toInputValue, dateInputValue);
});

app.get("/checkout", (req, res) => {
    res.render("checkout");
});

app.get("*", (req, res) => {
    res.render("404");
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
