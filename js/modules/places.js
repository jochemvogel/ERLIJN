import { getQuotesData, setQuotesUrl } from "./quotes.js";
import { API_URL } from "../constants/api.js";
import { addAirportCodesToLocalStorage } from "../utils/localStorage.js";
import { setNotification } from "../utils/notification.js";
import { getResults } from "../utils/fetch.js";

export { convertLocations };

/**
 * The quotes endpoint only accepts specific airport codes like AMS-sky and JFK-sky
 * This is not user friendly, so values like Amsterdam first needs to be converted
 * This function will convert i.e. Amsterdam to AMS-sky
 *
 * @param {string} fromInput - From location input
 * @param {string} toInput  - To location input
 * @param {Date} dateInput -  Date input
 */

async function convertLocations(fromInput, toInput, dateInput) {
    // Create array with the locations
    let locationArr = [];
    locationArr.push(fromInput);
    locationArr.push(toInput);

    const convertedLocationArr = await createNewArray(locationArr);

    if (convertedLocationArr[0].Places[0] === undefined) {
        setNotification("Your <u>from location</u> doesn't exists");

        return;
    }

    if (convertedLocationArr[1].Places[0] === undefined) {
        setNotification("Your <u>to location</u> doesn't exists");

        return;
    }

    // Set the result to new variable
    const inputPlaceIDs = setInputPlaceID(convertedLocationArr);
    const fromInputPlaceID = inputPlaceIDs[0];
    const toInputPlaceID = inputPlaceIDs[1];

    addAirportCodesToLocalStorage(fromInputPlaceID, toInputPlaceID);

    // Call the endpoint with the converted places to show the quotes
    const quoteUrl = setQuotesUrl(fromInputPlaceID, toInputPlaceID, dateInput);

    // Get the data with the converted values
    getQuotesData(quoteUrl);

    // Empty the array
    locationArr = [];
}

/**
 * Converts the input ('Amsterdam') for each item in the array
 * to usable code for API ('AMS-sky')
 *
 * @param {Array} locationArr - Array with location names (i.e. ['Amsterdam', 'Barcelona'])
 *
 * @returns {Array} - The converted result (i.e. ['AMS-sky', 'BCN-sky'])
 */
async function createNewArray(locationArr) {
    return await Promise.all(
        locationArr.map(async (location) => {
            const convertUrl = setConvertUrl(location);

            return await getResults(convertUrl);
        })
    );
}

/**
 * Set all the parameters that are required for the endpoint
 * Static right now, but can be dynamic (based on user input) later
 *
 * @param {string} input - Unconverted location
 *
 * @returns {string} url - The right endpoint based on the users' input that will be fetched later
 */
function setConvertUrl(input) {
    const country = "NL";
    const currency = "EUR";
    const locale = "nl-NL";

    return `${API_URL}/autosuggest/v1.0/${country}/${currency}/${locale}/?query=${input}`;
}

/**
 * Set the place ID of the inputs
 *
 * It is not possible to search for an aiport, yet
 * When you search for 'London', the code 'LOND-sky' will be used
 * 'LOND-sky' includes all the airports with the name London
 * Including London and East London in Canada & South Africa.
 * You don't want that, so if the code is longer than 7 characters
 * The second element (most used airport) in the array will be used
 * 'LOND-sky' is longer than 7 chars, but 'LHR' isn't. 'LHR' will be used
 * This won't be needed if you can choose between airports, but that's not
 * possible yet
 *
 * Same story for the query 'The Netherlands'.
 * For now 'country queries' will be 'redirected' to the most used airport of that country.
 *
 * @param {Array} convertedLocationArr - Array with all the converted location codes
 *
 * @returns {Array} [fromInputPlaceID, toInputPlaceID]
 */
function setInputPlaceID(convertedLocationArr) {
    const fromPlaceIDIsAiport =
        convertedLocationArr[0].Places[0].PlaceId.length === 7;
    const toPlaceIDIsAiport =
        convertedLocationArr[1].Places[0].PlaceId.length === 7;

    const fromInputPlaceID = setFromInputPlaceID(fromPlaceIDIsAiport);
    const toInputPlaceID = setToInputPlaceID(toPlaceIDIsAiport);

    /**
     *
     * @param {boolean} fromPlaceIDIsAiport - True if PlaceId is airport, false if not
     *
     * @returns {string} - The place id of the right airport
     */
    function setFromInputPlaceID(fromPlaceIDIsAiport) {
        if (fromPlaceIDIsAiport) {
            return convertedLocationArr[0].Places[0].PlaceId;
        } else {
            return convertedLocationArr[0].Places[1].PlaceId;
        }
    }

    /**
     *
     * @param {boolean} toPlaceIDIsAiport - True if PlaceId is airport, false if not
     *
     * @returns {string} - The place id of the right airport
     */
    function setToInputPlaceID(toPlaceIDIsAiport) {
        if (toPlaceIDIsAiport) {
            return convertedLocationArr[1].Places[0].PlaceId;
        } else {
            return convertedLocationArr[1].Places[1].PlaceId;
        }
    }

    return [fromInputPlaceID, toInputPlaceID];
}
