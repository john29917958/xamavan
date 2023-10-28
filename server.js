const express = require("express");
const https = require("https");
const fs = require("fs");
const process = require("process");
const app = express();
const indexRouter = require("./routes/index");
const portfolioRouter = require("./routes/portfolio");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/portfolio", portfolioRouter);

if (process.env.NODE_ENV === "production") {
  loadSslConfig(
    process.env["SSL_PRIVKEY_PATH"],
    process.env["SSL_CERT_PATH"],
    (sslConfigs) => {
      const server = https.createServer(sslConfigs, app).listen(443);
    }
  );
} else {
  const server = app.listen(80, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
  });
}

function loadSslConfig(keyPath, certPath, onComplete) {
  new Promise((resolve, reject) => {
    fs.readFile(keyPath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
    .then(
      (sslKey) => {
        return new Promise((resolve, reject) => {
          fs.readFile(certPath, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                key: sslKey,
                cert: data,
              });
            }
          });
        });
      },
      (err) => {
        throw err;
      }
    )
    .then(
      (sslOptions) => {
        onComplete(sslOptions);
      },
      (err) => {
        throw err;
      }
    );
}
