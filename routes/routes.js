const express = require("express");
const render = require("../controllers/render");

const router = express.Router();

router
    .get("/", render.getHome)
    .post("/", render.postHome)
    .get("/checkout", render.getCheckout)
    .post("/checkout", render.postCheckout)
    .get("/offline", render.getOffline)
    .get("/confirmation", render.getConfirmation)
    .post("/confirmation", render.postConfirmation)
    .get("*", render.get404);

module.exports = router;
