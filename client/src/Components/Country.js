import React, { Fragment } from 'react';

function Country(props) {
    return(
        <>
            <p>Hello! From Country component: {props.name}</p>
        </>
    );
}

export default Country;