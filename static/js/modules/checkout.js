const { formatDate } = require("../utils/format");

/* NOT WORKING YET */

/**
 * Renders the content of the checkout page/route
 */
function renderCheckoutPage() {
    const checkoutFrom = document.querySelector("[data-checkout-from]");
    const checkoutTo = document.querySelector("[data-checkout-to]");
    const checkoutDate = document.querySelector("[data-checkout-date]");
    const checkoutPrice = document.querySelector("[data-checkout-price]");

    const fromLocation = localStorage.getItem("fromInputValue");
    const toLocation = localStorage.getItem("toInputValue");
    const finalPrice = localStorage.getItem("quotePrice");

    const departureDate = localStorage.getItem("dateInputValue");
    const convertedDate = formatDate(departureDate);

    if (finalPrice === null) {
        checkoutPrice.innerHTML = "<i>Select a flight please</i>";
    } else {
        checkoutPrice.innerHTML = finalPrice;
    }

    checkoutFrom.innerHTML = fromLocation;
    checkoutTo.innerHTML = toLocation;
    checkoutDate.innerHTML = convertedDate;

    checkoutBtnEventListener();
}

/**
 * Adds an alert to the button on the checkout page
 */
function checkoutBtnEventListener() {
    const checkoutBtn = document.getElementById("checkout-btn");

    checkoutBtn.addEventListener("click", () => {
        alert("You reached the end of the application 🥳");
    });
}

module.exports = { renderCheckoutPage };
