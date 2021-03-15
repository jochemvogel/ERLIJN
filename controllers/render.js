const { convertLocations } = require("../models/places");

async function getHome(req, res) {
    let result = "";

    const fromInput = req.cookies.fromInput;
    const toInput = req.cookies.toInput;
    const dateInput = req.cookies.dateInput;

    /* Render cards of previous search */
    if (fromInput !== undefined) {
        result = await convertLocations(fromInput, toInput, dateInput);
    }

    res.render("pages/home", {
        result,
    });
}

async function postHome(req, res) {
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
        result,
    });
}

function getCheckout(req, res) {
    const fromInput = req.cookies.fromInput;
    const toInput = req.cookies.toInput;
    const dateInput = req.cookies.dateInput;

    res.render("pages/checkout", {
        fromLocation: fromInput,
        toLocation: toInput,
        date: dateInput,
    });
}

function postCheckout(req, res) {
    const fromInput = req.cookies.fromInput;
    const toInput = req.cookies.toInput;
    const dateInput = req.cookies.dateInput;

    res.render("pages/checkout", {
        fromLocation: fromInput,
        toLocation: toInput,
        date: dateInput,
    });
}

function get404(req, res) {
    res.render("pages/404");
}

module.exports = { getHome, postHome, getCheckout, postCheckout, get404 };
