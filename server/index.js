const express = require("express");
const fetch = require('node-fetch');

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/api/:countryName", (req, response) => {
    fetch(`https://restcountries.eu/rest/v2/name/${req.params.countryName}`)
    .then(res => res.json())
    .then(data => {
        response.json(data[0].name);
    })
})
  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

