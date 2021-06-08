const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

/* Api path: /api/countries/
 *  RequestType: GET
 */
// Get all countries
router.get('/', async (req, response) => {
  fetch('https://restcountries.eu/rest/v2/all')
    .then((res) => res.json())
    .then((data) => {
      response.json(data);
    });
});

/* Api path: /api/countries/:countryName
 *  RequestType: GET
 */
// Get specified country
router.get('/:countryName', async (req, response) => {
  fetch(`https://restcountries.eu/rest/v2/name/${req.params.countryName}`)
    .then((res) => res.json())
    .then((data) => {
      const obj = data.find(
        (o) =>
          o.name == req.params.countryName ||
          o.nativeName == req.params.countryName
      );

      if (obj == undefined)
        return response.status(400).json({ msg: 'No such country' });
      response.json(data[0].name);
    });
});

/* Api path: /api/countries/
 *  RequestType: POST
 */
// Get all countries and filter by specified filter array

/* Given filter array format:
 * ['countr1', 'country2']
 */
router.post('/', async (req, response) => {
  const countriesArray = req.body;
  fetch('https://restcountries.eu/rest/v2/all')
    .then((res) => res.json())
    .then((data) => {
      const filteredData = data.filter((country) =>
        countriesArray.some(
          (n) =>
            country.name.toLowerCase().includes(n.toLowerCase()) ||
            country.nativeName.toLowerCase().includes(n.toLowerCase())
        )
      );

      if (!filteredData || filteredData.length <= 0)
        return response.status(400).json({ msg: 'No such countries' });

      response.json(filteredData);
    });
});

module.exports = router;
