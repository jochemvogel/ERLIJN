import { convertLocations } from "./places.js";
import {
    addSearchToLocalStorage,
    clearPrevSearch,
} from "../utils/localStorage.js";

import { whichBrowser } from "../utils/browser.js";

export { setSearchButtonEventListener };

/**
 * Sets the event listener on the Search Button
 */
function setSearchButtonEventListener() {
    const searchBtn = document.getElementById("search-btn");

    hideOrDisplayDateLabel();

    searchBtn.addEventListener("click", (e) => {
        const fromInputValue = document.querySelector("[data-form-from]").value;
        const toInputValue = document.querySelector("[data-form-to]").value;
        const dateInputValue = document.querySelector("[data-form-date]").value;

        clearPrevSearch();

        addSearchToLocalStorage(fromInputValue, toInputValue, dateInputValue);

        // Check whether the fields are empty or not
        const emptyFromField = fromInputValue.length === 0;
        const emptyToField = toInputValue.length === 0;
        const emptyDateField = dateInputValue.length === 0;

        if (emptyFromField || emptyToField || emptyDateField) {
            return;
        }

        // Prevent the listener to be called twice
        e.stopImmediatePropagation();

        // Prevent default after emtpy fields check
        // Otherwise the (HTML) error handling doesn't work correctly
        e.preventDefault();

        convertLocations(fromInputValue, toInputValue, dateInputValue);
    });
}

/**
 * Checks whether the browser supports input type date
 * If it supports -> set the display of the label to none
 */
function hideOrDisplayDateLabel() {
    const dateLabel = document.getElementById("dateLabel");
    const currentBrowser = whichBrowser();

    if (currentBrowser !== "safari" && !currentBrowser !== "msie") {
        dateLabel.style.visibility = "hidden";
    }
}
