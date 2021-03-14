require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
let ejs = require("ejs");

const app = express();
const PORT = process.env.PORT || 3000;

const middlewares = [bodyParser.urlencoded({ extended: true })];

const { convertLocations } = require("./static/js/modules/places");

app.use(middlewares);
app.use(express.static("static"));

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
    res.render("home", {
        result: ""
    });
});

app.post("/", async (req, res) => {
    const fromInputValue = req.body.from;
    const toInputValue = req.body.to;
    const dateInputValue = req.body.date;

    // res.setHeader("Set-Cookie", [
    //     `fromInput=${fromInputValue}`,
    //     `toInput=${toInputValue}`,
    //     `dateInput=${dateInputValue}`,
    // ]);

    // const cookiesArr = req.get("Cookie").split(";");
    // const fromInput = cookiesArr[0].split("=")[1];
    // const toInput = cookiesArr[1].split("=")[1];
    // const dateInput = cookiesArr[2].split("=")[1];

    const result = await convertLocations(
        fromInputValue,
        toInputValue,
        dateInputValue
    );

    res.render("home", {
        result
    });
});

app.get("/checkout", (req, res) => {
    res.render("checkout");
});

app.get("*", (req, res) => {
    res.render("404");
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
