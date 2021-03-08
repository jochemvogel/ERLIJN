import { setSearchButtonEventListener } from "../modules/search.js";
import { renderCheckoutPage } from "../modules/checkout.js";
import { setNotification } from "../utils/notification.js";
import "../vendor/routie.js";

export function handleRoutes() {
    routie({
        "": function () {
            updateUI("home");
            setSearchButtonEventListener();
        },
        checkout: function () {
            const noFlightSelected = isLocalStorageEmpty();

            if (noFlightSelected) {
                location.hash = "";
                setNotification("Please select a flight before you checkout");
            } else {
                renderCheckoutPage();
                updateUI("checkout");
            }
        },
        "*": function () {
            updateUI("not-found");
        },
    });
}

/**
 * Update the UI based on the param
 *
 * @param {string} route
 */
function updateUI(route) {
    const sections = document.querySelectorAll("section");
    const activeSection = document.querySelector(`[data-route=${route}]`);

    sections.forEach((section) => {
        section.classList.remove("active");
        section.setAttribute("aria-hidden", "true");
        section.hidden = true;
    });

    activeSection.classList.add("active");
    activeSection.setAttribute("aria-hidden", "false");
    activeSection.hidden = false;
}

/**
 * Check whether local storage is empty or not
 *
 * @returns boolean
 */
function isLocalStorageEmpty() {
    const toLocationIsNull = localStorage.getItem("toInputValue") === null;
    const fromLocationIsNull = localStorage.getItem("fromInputValue") === null;
    const departureDateIsNull = localStorage.getItem("dateInputValue") === null;
    const quotePriceIsNull = localStorage.getItem("quotePrice") === null;

    if (
        toLocationIsNull ||
        fromLocationIsNull ||
        departureDateIsNull ||
        quotePriceIsNull
    ) {
        return true;
    }

    return false;
}
