const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

router.get("/", async (req, response) => {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => res.json())
    .then((data) => {
      response.json(data);
    });
});

router.get("/:countryName", async (req, response) => {
  fetch(`https://restcountries.eu/rest/v2/name/${req.params.countryName}`)
    .then((res) => res.json())
    .then((data) => {
      response.json(data[0].name);
    });
});

router.post("/", async (req, response) => {
  const countriesArray = req.body;

  fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => res.json())
    .then((data) => {
      response.json(
        data.filter((country) =>
          countriesArray.some((n) =>
            country.name.toLowerCase().includes(n.toLowerCase())
          )
        )
      );
    });
});

module.exports = router;