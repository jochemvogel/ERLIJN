require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const routes = require("./routes/routes");
const middlewares = [
    bodyParser.urlencoded({ extended: false }),
    cookieParser(),
    express.static("public"),
    routes,
];

app.set("view engine", "ejs");
app.set("views", "views");

app.use(function (req, res, next) {
    if (req.secure ||req.headers.host.includes('localhost') ) {
        // request was via https, so do no special handling
        next();
    } else {
        // request was via http, so redirect to https
        res.redirect("https://" + req.headers.host + req.url);
    }
});

app.use(middlewares);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
