const fetch = require("node-fetch");

const headers = {
    method: "GET",
    headers: {
        "x-rapidapi-key": process.env.API_KEY,
        "x-rapidapi-host": process.env.API_HOST,
    },
};

/**
 * @param {string} url - URL that needs to be fetched
 *
 * @returns {Object} data - All the data that is fetched by the API
 */
async function getResults(url) {
    return fetch(url, headers)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            return data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports = { getResults };
