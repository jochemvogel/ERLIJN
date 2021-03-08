export { resetNotification, setNotification };

const errorNotificationContainer = document.querySelector(
    ".error-notification"
);
const errorNotificationText = document.querySelector(
    "[data-error-notification]"
);

/**
 * Sets the innerHTML of the alert message
 *
 * @param {string} message - Error message
 */
function setNotification(message) {
    errorNotificationContainer.classList.remove("hidden");
    errorNotificationText.innerHTML = `<strong>Whoops..</strong> ${message}.`;

    errorNotificationContainer.setAttribute("aria-hidden", "false");
    errorNotificationContainer.hidden = false;

    addShuffleAnimation();

    /**
     * Adds shuffle animation when notification appears
     */
    function addShuffleAnimation() {
        errorNotificationContainer.classList.add("error-notification-start");

        // Remove animation after 1000ms (1s)
        setTimeout(() => {
            errorNotificationContainer.classList.remove(
                "error-notification-start"
            );
        }, 1_000);
    }
}

/**
 * Resets/removes the notification
 */
function resetNotification() {
    errorNotificationContainer.classList.add("hidden");
    errorNotificationText.innerHTML = "";

    errorNotificationContainer.setAttribute("aria-hidden", "true");
    errorNotificationContainer.hidden = true;
}
