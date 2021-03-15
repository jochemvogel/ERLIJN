const { getResults } = require("./fetch");

/**
 * Get all the data that the user needs
 *
 * @param {string} url - The right quotes endpoint (based on user input)
 */
async function getQuotesData(url) {
    const result = await getResults(url);

    if (result === undefined) {
        console.log("You filled in a date in the past");
        return;
    }

    if (result.Quotes.length <= 0) {
        console.log("No tickets/flights available");
        return;
    }

    return result;
}

/**
 * Returns the final url that will be fetched
 *
 * All those parameters are required.
 * Can be dynamic, based on user input, in the future.
 *
 * @param {string} fromLocationCode - Airport code of the location the users wants to flight from
 * @param {string} toLocationCode - Airport code of the location the users wants to flight to
 * @param {string} departureDate  - Date the user wants to flight/leave
 *
 * @returns {string} url - The right endpoint based on the users' input that will be fetched later
 */
function setQuotesUrl(fromLocationCode, toLocationCode, departureDate) {
    const country = "NL";
    const currency = "EUR";
    const locale = "nl-NL";

    // Browse quotes
    return `${process.env.API_URL}/browsequotes/v1.0/${country}/${currency}/${locale}/${fromLocationCode}/${toLocationCode}/${departureDate}`;
}

module.exports = { getQuotesData, setQuotesUrl };
