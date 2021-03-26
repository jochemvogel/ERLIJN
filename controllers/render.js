const { convertLocations } = require("../models/places");

let isDevelopment = process.env.IS_DEVELOPMENT;

async function getHome(req, res) {
    let result = "";
    let formValues = "";

    const fromInput = req.cookies.fromInput;
    const toInput = req.cookies.toInput;
    const dateInput = req.cookies.dateInput;

    /* Render cards of previous search */
    if (fromInput !== undefined) {
        result = await convertLocations(fromInput, toInput, dateInput);
        formValues = {
            fromInput,
            toInput,
            dateInput
        }
    }

    res.render("pages/home", {
        result,
        formValues,
        isDevelopment,
    });
}

async function postHome(req, res) {
    const fromInputValue = req.body.from;
    const toInputValue = req.body.to;
    const dateInputValue = req.body.date;
    let result;
    let formValues = "";

    res.setHeader("Set-Cookie", [
        `fromInput=${fromInputValue}`,
        `toInput=${toInputValue}`,
        `dateInput=${dateInputValue}`,
    ]);

    result = await convertLocations(
        fromInputValue,
        toInputValue,
        dateInputValue
    );

    if (result === undefined) {
        result = 'No results'
    }

    const fromInput = req.cookies.fromInput;
    const toInput = req.cookies.toInput;
    const dateInput = req.cookies.dateInput;

    /* Render cards of previous search */
    if (fromInput !== undefined) {
        result = await convertLocations(fromInput, toInput, dateInput);
        formValues = {
            fromInput,
            toInput,
            dateInput
        }
    }

    res.render("pages/home", {
        result,
        formValues,
        isDevelopment
    });
}

function getCheckout(req, res) {
    const fromInput = req.cookies.fromInput;
    const toInput = req.cookies.toInput;
    const dateInput = req.cookies.dateInput;

    let ticketPrice = "";
    let ticketAirline = "";
    let ticketDepTime = "";

    if (req.cookies.ticketPrice) {
        ticketPrice = req.cookies.ticketPrice;
        ticketAirline = req.cookies.ticketAirline;
        ticketDepTime = req.cookies.ticketDepTime;
    }

    res.render("pages/checkout", {
        fromLocation: fromInput,
        toLocation: toInput,
        date: dateInput,
        ticketPrice,
        ticketAirline,
        ticketDepTime,
        isDevelopment,
    });
}

function postCheckout(req, res) {
    const fromInput = req.cookies.fromInput;
    const toInput = req.cookies.toInput;
    const dateInput = req.cookies.dateInput;

    const ticketPrice = req.body.price;
    const ticketAirline = req.body.airline;
    const ticketDepTime = req.body.time;

    res.setHeader("Set-Cookie", [
        `ticketPrice=${ticketPrice}`,
        `ticketAirline=${ticketAirline}`,
        `ticketDepTime=${ticketDepTime}`,
    ]);

    res.render("pages/checkout", {
        fromLocation: fromInput,
        toLocation: toInput,
        date: dateInput,
        ticketPrice,
        ticketAirline,
        ticketDepTime,
        isDevelopment,
    });
}

function getOffline(req, res) {
    res.render("pages/offline", {
        isDevelopment,
    });
}

function getConfirmation(req, res) {
    res.render("pages/confirmation", {
        isDevelopment,
    });
}

function postConfirmation(req, res) {
    const name = req.body.name;
    res.render("pages/confirmation", {
        name,
        isDevelopment,
    });
}

function get404(req, res) {
    res.render("pages/404", {
        isDevelopment,
    });
}

module.exports = {
    getHome,
    postHome,
    getCheckout,
    postCheckout,
    getOffline,
    getConfirmation,
    postConfirmation,
    get404,
};
