const express = require("express");
// const fetch = require("node-fetch");
const app = express();
const port = 3000;

app.use(express.static("static"));
app.use("/css", express.static(__dirname + "static/css"));
app.use("/js", express.static(__dirname + "static/js"));

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
    res.render("home", {
        title: "Home",
    });
});

app.get("/checkout", (req, res) => {
    res.render("checkout", {
        title: "Checkout",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "Not found",
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
