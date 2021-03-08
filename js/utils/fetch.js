import { setNotification, resetNotification } from "./notification.js";
import { API_KEY, API_HOST } from "../constants/api.js";

export { getResults };

const headers = {
    method: "GET",
    headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": API_HOST,
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
            resetNotification();

            if (!response.ok) {
                if (response.status === 429) {
                    setNotification("Too many request. Wait a second");
                    throw Error(response.statusText);
                }
                if (response.status === 401) {
                    setNotification(
                        "There is something wrong with the API key. Please contact the admin."
                    );
                    throw Error(response.statusText);
                }

                setNotification(
                    `Something went wrong, but we honestly don't know what. You can contact the admin with the code: ${response.statusText}`
                );
                throw Error(response.statusText);
            }

            return response.json();
        })
        .then(function (data) {
            return data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
