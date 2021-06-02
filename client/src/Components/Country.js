import React, { Fragment } from 'react';

function Country(props) {
    return(
        <>
            <h1>Hello! From Country component: {props.name}</h1>
        </>
    );
}

export default Country;