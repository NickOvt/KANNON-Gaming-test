import React, { Fragment, useState } from 'react';
import Country from './Country';

function SingleCountry() {
    const [inputValue, setValue] = useState("");

    const [data, setData] = useState("");
    function getSingleCountry(inputValue) {
        fetch(`/api/${inputValue}`)
        .then(res => res.json())
        .then(data => setData(data));
    }

    return(
        <>
            <input type="text" value={inputValue} onChange={e => setValue(e.target.value)}/>
            <button type="submit" onClick={() => getSingleCountry(inputValue)}>Submit</button>
            <Country name={data} />
        </>
    );
}

export default SingleCountry;