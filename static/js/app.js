const { initSearch } = require("./modules/search");

function init(fromInputVal, toInputVal, dateInputVal) {
    initSearch(fromInputVal, toInputVal, dateInputVal);
}

module.exports = { init };
