const { convertLocations } = require("./places");
const {
    addSearchToLocalStorage,
    clearPrevSearch,
} = require("../utils/localStorage");

const { whichBrowser } = require("../utils/browser");

/**
 * Sets the event listener on the Search Button
 */
function initSearch(fromInputValue, toInputValue, dateInputValue) {
    clearPrevSearch();
    addSearchToLocalStorage(fromInputValue, toInputValue, dateInputValue);

    hideOrDisplayDateLabel();

    e.stopImmediatePropagation();

    convertLocations(fromInputValue, toInputValue, dateInputValue);
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

module.exports = { initSearch };
