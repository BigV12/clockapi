const path = require("path");
const express = require("express");
const hbs = require("hbs");
const time = require("./utils/time");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

const partialsPath = path.join(__dirname, "../template/partials");
hbs.registerPartials(partialsPath);
const viewsPath = path.join(__dirname, "../template/views");
const publicDirectoryPath = path.join(__dirname, "../public");
//setup static director to serve
app.use(express.static(publicDirectoryPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);

//index.hbs

app.get("", (req, res) => {
  res.render("index");
});

//clock api
app.get("/time", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }
  console.log(req.query.address);
  time(
    req.query.address,
    (error, { year, month, day, time, dayOfWeek } = {}) => {
      if (error) {
        return res.send({ error });
      }
      res.send({ year, month, day, time, dayOfWeek });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "page not found",
  });
});

app.listen(port, () => {
  console.log("server is working");
});
