var express = require("express");
var app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

//luodaan reitit
app.get("/", function (req, res) {
  res.render("pages/index");
});

app.get("/food", function (req, res) {
  const m3o = require("@m3o/m3o-node");
  var list = "";
  new m3o.Client({ token: "NGMyZWYyMzAtMzRmMy00MjkyLTk2YmQtNGQzOWM1YzNiYjAx" })
    .call("price", "list", { currency: "EUR", limit: 200, offset: 0 })
    .then((response) => {
      list = response;
      res.render("pages/food", list);
    });
});
app.get("/oil", function (req, res) {
  const m3o = require("@m3o/m3o-node");
  var hinta = "";
  new m3o.Client({ token: "NGMyZWYyMzAtMzRmMy00MjkyLTk2YmQtNGQzOWM1YzNiYjAx" })
    .call("price", "get", { name: "WTI crude oil", currency: "EUR" })
    .then((response) => {
      hinta = response;
      res.render("pages/oil", hinta);
    });
});
app.get("/crypto", function (req, res) {
  const m3o = require("@m3o/m3o-node");
  var list = "";
  new m3o.Client({ token: "NGMyZWYyMzAtMzRmMy00MjkyLTk2YmQtNGQzOWM1YzNiYjAx" })
    .call("price", "list", { currency: "EUR", limit: 200, offset: 0 })
    .then((response) => {
      list = response;
      res.render("pages/crypto", list);
    });
});

//tässä on testi reitti funktion sisälle tehtyyn api kutsuun. Näin tehtynä olisi helpompi paketoida koodia funktioon reitin ulkopuolelle jatkossa
app.get("/test", function (req, res) {
  const { PriceService } = require("m3o/price");
  M3O_API_TOKEN = "NGMyZWYyMzAtMzRmMy00MjkyLTk2YmQtNGQzOWM1YzNiYjAx";

  const priceService = new PriceService(M3O_API_TOKEN);
  rsp = "";
  // Get the price of anything
  async function getThePrice() {
    const rsp = await priceService.get({
      currency: "USD",
      name: "bitcoin",
    });
    res.send(rsp);
  }
  getThePrice();
});

app.get("*", function (req, res) {
  res.send("Can't find the requested page!", 404);
});
//Luodaan web-palvelin
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
