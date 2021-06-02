import React, { Fragment, useState, useEffect } from 'react';
import Country from '../Country';

function CountryList() {
    const [countries, setCountries] = useState([]);;
    const [inputValue, setValue] = useState("");
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        fetch('/api')
        .then(res => res.json())
        .then(data => setCountries(data));
    }, [])

    function getAllCountries(inputValue) {
        const countriesArray = inputValue.split(',');
        setFilteredCountries(countries.filter(country => countriesArray.some(n => country.name.toLowerCase().includes(n.toLowerCase()))));
    }

    
    return (
        <>
            <input type="text" placeholder="Enter filter" value={inputValue} onChange={e => setValue(e.target.value)} />
            {(countries && inputValue) && countries.filter(country => country.name.toLowerCase().includes(inputValue.toLowerCase())).map(el => {
                return <Country key={el.name} name={el.name} />
            })}
            {(countries && !inputValue) && countries.map(el => {
                return <Country key={el.name} name={el.name} />
            })}
        </>
    );
}

export default CountryList;