const { API_URL } = require("../constants/api");
const { setDetailButtonListener } = require("./details");
const { getResults } = require("../utils/fetch");

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

    setCarrierData(result);
    setPriceData(result);

    setDetailButtonListener();
}

/**
 * Get all the data of the carrier that the user needs
 *
 * @param {Object} result - The fetched data from the quotes endpoint
 */
function setCarrierData(result) {
    result.Carriers.forEach((el) => {
        let div = document.createElement("div");
        div.className = "card";

        // @TODO One (dynamic) modal instead of a modal for every card
        const card = `
			<h2 class="card__carrier">${el.Name}</h2>
            <p class="card__min-price">€</p>
            <p class="card__direct"></p>
			<button class="details-btn btn">Details</button>

		`;
        div.innerHTML = card;
        const cardContainer = document.querySelector(".card-container");

        cardContainer.appendChild(div);
    });
}

/**
 * Get all the data of the price that the user needs
 *
 * @param {Object} result - The fetched data from the quotes endpoint
 */
function setPriceData(result) {
    const minPrice = document.querySelectorAll(".card__min-price");
    const directFlightEl = document.querySelectorAll(".card__direct");

    result.Quotes.forEach((el, i) => {
        // minPrice is undefined if there are two quotes, but one carrier
        if (minPrice[i] === undefined) {
            return;
        }

        const formattedPrice = `${el.MinPrice},00`;
        minPrice[i].innerHTML += formattedPrice;

        let directFlight = el.Direct;
        const formattedDirect = directFlight ? "Yes" : "No";

        directFlightEl[i].innerHTML = `Direct: ${formattedDirect}`;
    });
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
    return `${API_URL}/browsequotes/v1.0/${country}/${currency}/${locale}/${fromLocationCode}/${toLocationCode}/${departureDate}`;
}

module.exports = { getQuotesData, setQuotesUrl };
