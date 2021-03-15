require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const middlewares = [bodyParser.urlencoded({ extended: true }), cookieParser()];

const { convertLocations } = require("./static/js/modules/places");

app.use(middlewares);
app.use(express.static("static"));

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", async (req, res) => {
    let result = ""

    const fromInput = req.cookies.fromInput;
    const toInput = req.cookies.toInput;
    const dateInput = req.cookies.dateInput;

    /* Render cards of previous search */
    if (fromInput !== undefined) {
        result = await convertLocations(
            fromInput,
            toInput,
            dateInput
        );
    }

    res.render("home", {
        result
    });
});

app.post("/", async (req, res) => {
    const fromInputValue = req.body.from;
    const toInputValue = req.body.to;
    const dateInputValue = req.body.date;

    res.setHeader("Set-Cookie", [
        `fromInput=${fromInputValue}`,
        `toInput=${toInputValue}`,
        `dateInput=${dateInputValue}`,
    ]);

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
    const fromInput = req.cookies.fromInput;
    const toInput = req.cookies.toInput;
    const dateInput = req.cookies.dateInput;

    res.render("checkout", {
        fromLocation: fromInput,
        toLocation: toInput,
        date: dateInput
    });
});

app.get("*", (req, res) => {
    res.render("404");
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
