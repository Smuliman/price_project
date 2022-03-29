var express = require("express");
var app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
//app.locals.pretty = true;

//luodaan reitit
app.get("/", function (req, res) {
  res.send("Hello World!");
});
app.get("/hello", function (req, res) {
  const m3o = require("@m3o/m3o-node");

  new m3o.Client({ token: "MTk3ZTNkZmEtNjExOS00MjBkLThkNDktNWI2OGE0YTVkYTZh" })
    .call("helloworld", "call", { name: "Samuli" })
    .then((response) => {
      console.log(response);
      res.send("Hello World!" + JSON.stringify(response));
    });
});
app.get("/commodites", function (req, res) {
  const m3o = require("@m3o/m3o-node");
  var hinta = "";

  new m3o.Client({ token: "MTk3ZTNkZmEtNjExOS00MjBkLThkNDktNWI2OGE0YTVkYTZh" })
    .call("price", "get", { name: "coffee", currency: "USD" })
    .then((response) => {
      hinta = response;

      //res.send(JSON.stringify(hinta));
      res.render("pages/commodites", hinta);
    });
  console.log(hinta);
});
app.get("/oil", function (req, res) {
  res.send("Oil prices are high!");
});
app.get("*", function (req, res) {
  res.send("Can't find the requested page!", 404);
});
//Luodaan web-palvelin
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
