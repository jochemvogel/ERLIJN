import { formatDate } from "../utils/format.js";

export { setDetailButtonListener };

/**
 * Set a event listener to the detail button
 * Needs to happen after data is fetched (& the card is created)
 */
function setDetailButtonListener() {
    const detailsBtns = document.querySelectorAll(".details-btn");

    detailsBtns.forEach((button) => {
        button.addEventListener("click", (e) => {
            const detailsModal = document.querySelector(".details-modal");
            detailsModal.classList.remove("hidden");
            const card = e.target.parentNode;

            const carrier = card.childNodes[1].innerHTML;
            const price = card.childNodes[3].innerHTML;
            const direct = card.childNodes[5].innerHTML.substring(8);

            renderDetailsModal(carrier, price, direct);

            detailsModal.addEventListener("click", (e) => {
                // Prevent the listener to be called twice
                e.stopImmediatePropagation();

                if (e.target !== detailsModal) {
                    return;
                }

                detailsModal.classList.add("hidden");
            });
        });
    });
}

/**
 * Renders the details modal
 *
 * @param {string} carrier
 * @param {string} price
 */
function renderDetailsModal(carrier, price, direct) {
    const airports = document.querySelector("[data-modal-airports]");
    const modalPrice = document.querySelector("[data-modal-price]");
    const modalAirline = document.querySelector("[data-modal-airline]");
    const modalDirect = document.querySelector("[data-modal-direct]");
    const bookBtn = document.querySelector("[data-modal-btn]");
    const closeBtn = document.querySelector("[data-modal-close]");

    const modalToLocation = document.querySelector("[data-modal-to]");
    const modalFromLocation = document.querySelector("[data-modal-from]");
    const modalDate = document.querySelector("[data-modal-date]");

    const detailsModal = document.querySelector(".details-modal");

    const fromAirportCode = localStorage.getItem("fromAirportCode");
    const toAirportCode = localStorage.getItem("toAirportCode");
    const fromLocation = localStorage.getItem("fromInputValue");
    const toLocation = localStorage.getItem("toInputValue");

    const departureDate = localStorage.getItem("dateInputValue");
    const convertedDate = formatDate(departureDate);

    airports.textContent = `${fromAirportCode} - ${toAirportCode}`;
    modalAirline.textContent = carrier;
    modalPrice.textContent = price;
    modalDirect.textContent = direct;
    modalFromLocation.textContent = fromLocation;
    modalToLocation.textContent = toLocation;
    modalDate.textContent = convertedDate;

    bookBtn.addEventListener("click", () => {
        localStorage.setItem("quotePrice", price);
        location.hash = "checkout";
    });

    // @TODO Event listener fires ++ every time
    closeBtn.addEventListener("click", () => {
        detailsModal.classList.add("hidden");
    });
}
