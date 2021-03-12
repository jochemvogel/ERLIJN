/**
 * Formats the date from API to usable (European) date
 *
 * @param {string} dateStr Current date in yyyy-mm-dd format
 *
 * @returns {string} Date in dd/mm/yyyy format
 */
function formatDate(dateStr) {
    const dArr = dateStr.split("-"); // ex input "2010-01-18"
    return dArr[2] + "/" + dArr[1] + "/" + dArr[0]; //ex out: "18/01/10"
}

/**
 * Capitalizes a string
 *
 * @param {string} string
 *
 * @returns {string} Capitalized string
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = { formatDate, capitalizeFirstLetter };
