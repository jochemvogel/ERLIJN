/**
 * Checks which browser the user is in
 */
function whichBrowser() {
    const ua = navigator.userAgent.toLowerCase();

    if (ua.includes("chrome")) {
        return "chrome";
    }

    if (ua.includes("firefox")) {
        return "firefox";
    }

    if (ua.includes("msie")) {
        return "msie";
    }

    if (ua.includes("safari")) {
        if (ua.includes("mobile")) {
            return "mobile safari";
        }

        return "safari";
    }
}

module.exports = { whichBrowser };
