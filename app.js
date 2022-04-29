var express = require("express");
const m3o = require("@m3o/m3o-node");
const { PriceService } = require("m3o/price");
var app = express();
const port = process.env.PORT || 3000;
M3O_API_TOKEN = "NGMyZWYyMzAtMzRmMy00MjkyLTk2YmQtNGQzOWM1YzNiYjAx";

app.set("view engine", "ejs");

//luodaan reitit
app.get("/", function (req, res) {
  res.render("pages/index");
});

app.get("/food", function (req, res) {
  //lisätään list muuttuja
  let list = "";
  //luodaan m3o luokasta uusi olio
  new m3o.Client({ token: M3O_API_TOKEN })
    //api kutsu
    .call("price", "list", { currency: "EUR", limit: 200, offset: 0 })
    //käsitellään api vastaus
    .then((response) => {
      // kopioidaan api vastaus list muuttujaan
      list = response;
      // renderöidään list muutujan tiedon food pagelle
      res.render("pages/food", list);
    });
});
app.get("/oil", function (req, res) {
  var hinta = "";
  new m3o.Client({ token: M3O_API_TOKEN })
    .call("price", "get", { name: "WTI crude oil", currency: "EUR" })
    .then((response) => {
      hinta = response;
      res.render("pages/oil", hinta);
    });
});
app.get("/crypto", function (req, res) {
  var list = "";
  new m3o.Client({ token: M3O_API_TOKEN })
    .call("price", "list", { currency: "EUR", limit: 200, offset: 0 })
    .then((response) => {
      list = response;
      res.render("pages/crypto", list);
    });
});

//tässä on testi reitti funktion sisälle tehtyyn api kutsuun. Näin tehtynä olisi helpompi paketoida koodia funktioon reitin ulkopuolelle jatkossa
app.get("/test", function (req, res) {
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
