var express = require("express");
var app = express();
const port = process.env.PORT || 3000;
//onst m3o_token = process.env.OGI0MWJkMzAtYzA4Ni00ZTk0LWExMjctYzk5Y2Y4ZTc0OWI4;

app.set("view engine", "ejs");
//app.locals.pretty = true;

//luodaan reitit
app.get("/", function (req, res) {
  res.render("pages/index");
});

app.get("/food", function (req, res) {
  const m3o = require("@m3o/m3o-node");
  var list = "";
  try {
    new m3o.Client({
      token: "NGMyZWYyMzAtMzRmMy00MjkyLTk2YmQtNGQzOWM1YzNiYjAx",
    })

      .call("price", "list", { currency: "EUR", limit: 200, offset: 0 })
      .then((response) => {
        list = response;

        res.render("pages/food", list);
      });
  } catch (error) {
    res.send("virhe");
    console.error(error);
  }
});
app.get("/oil", function (req, res) {
  const m3o = require("@m3o/m3o-node");
  var hinta = "";

  new m3o.Client({ token: "NGMyZWYyMzAtMzRmMy00MjkyLTk2YmQtNGQzOWM1YzNiYjAx" })
    .call("price", "get", { name: "WTI crude oil", currency: "EUR" })
    .then((response) => {
      hinta = response;

      //res.send(JSON.stringify(hinta));
      res.render("pages/oil", hinta);
    });
  //console.log(hinta);
});
app.get("/crypto", function (req, res) {
  const m3o = require("@m3o/m3o-node");
  var list = "";

  new m3o.Client({ token: "NGMyZWYyMzAtMzRmMy00MjkyLTk2YmQtNGQzOWM1YzNiYjAx" })
    .call("price", "list", { currency: "EUR", limit: 200, offset: 0 })
    .then((response) => {
      list = response;
      console.log(list);

      //res.send(JSON.stringify(hinta));
      res.render("pages/crypto", list);
    });
});
app.get("*", function (req, res) {
  res.send("Can't find the requested page!", 404);
});
//Luodaan web-palvelin
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
