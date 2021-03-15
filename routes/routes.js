const express = require('express');

const { convertLocations } = require("../public/js/modules/places");

const router = express.Router();

router.get("/", async (req, res) => {
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

    res.render("pages/home", {
        result
    });
});

router.post("/", async (req, res) => {
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

    res.render("pages/home", {
        result
    });
});

router.get("/checkout", (req, res) => {
    const fromInput = req.cookies.fromInput;
    const toInput = req.cookies.toInput;
    const dateInput = req.cookies.dateInput;

    res.render("pages/checkout", {
        fromLocation: fromInput,
        toLocation: toInput,
        date: dateInput
    });
});

router.post("/checkout", (req, res) => {
    const fromInput = req.cookies.fromInput;
    const toInput = req.cookies.toInput;
    const dateInput = req.cookies.dateInput;

    res.render("pages/checkout", {
        fromLocation: fromInput,
        toLocation: toInput,
        date: dateInput
    });
});

router.get("*", (req, res) => {
    res.render("pages/404");
});

module.exports = router;
