import React, { Fragment, useState } from 'react';
import Country from './Country';

function SingleCountry() {
    const [inputValue, setValue] = useState();

    const [data, setData] = useState();
    function getSingleCountry() {
        fetch("/api")
        .then(res => res.json())
        .then(data => setData(data.message));
    }

    return(
        <>
            <div>
                <input type="text" value={inputValue} onChange={e => setValue(e.target.value)}/>
                <button type="submit" onClick={getSingleCountry}>Submit</button>
            </div>
            {data && <Country />}
        </>
    );
}

export default SingleCountry;