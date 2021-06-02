const express = require("express");
const fetch = require('node-fetch');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json())

app.get("/api", (req, response) => {
    fetch("https://restcountries.eu/rest/v2/all")
    .then(res => res.json())
    .then(data => {
        response.json(data);
    })
});

app.get("/api/:countryName", (req, response) => {
    fetch(`https://restcountries.eu/rest/v2/name/${req.params.countryName}`)
    .then(res => res.json())
    .then(data => {
        response.json(data[0].name);
    })
});

app.post('/api', (req, response) => {
    const countriesArray = req.body;
   
    fetch("https://restcountries.eu/rest/v2/all")
    .then(res => res.json())
    .then(data => {
        response.json(data.filter(country => countriesArray.some(n => country.name.toLowerCase().includes(n.toLowerCase()))));
    });
});

  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

