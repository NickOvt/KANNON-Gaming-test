import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function Country({ name }) {
  return (
    <>
      <p>Hello! From Country component: {name}</p>
    </>
  );
}

Country.propTypes = {
  name: PropTypes.string,
};

export default Country;
