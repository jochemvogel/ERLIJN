const { initSearch } = require("./modules/search");

// const initSearch = require("./modules/search");

function init(fromInputVal, toInputVal, dateInputVal) {
    initSearch(fromInputVal, toInputVal, dateInputVal);
}

// exports.modules = { init };
module.exports = { init };
