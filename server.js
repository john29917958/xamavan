const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();

app.use(express.static("public"));

const options = {
  key: fs.readFileSync(""),
  cert: fs.readFileSync(""),
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/" + "index.html");
});

app.get("/portfolio/business-web-design-sample", (req, res) => {
  res.sendFile(__dirname + "/public/business-web-design-sample.html");
});

const server = https.createServer(options, app).listen(443);

// const server = app.listen(80, () => {
//   const host = server.address().address;
//   const port = server.address().port;
//   console.log("App listening at http://%s:%s", host, port);
// });
