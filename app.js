const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const url =
  "https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json";

app.get("/", function (req, res) {
  https.get(url, function (response) {
    console.log(response.statusCode);
    let responseData = "";

    response.on("data", function (data) {
      responseData += data;
    });

    response.on("end", function () {
      const jsonData = JSON.parse(responseData);
      res.send(jsonData);
    });
  });
});

app.listen(3000, function (req, res) {
  console.log("Server connected to port 3000");
});
