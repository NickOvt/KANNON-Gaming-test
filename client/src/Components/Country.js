import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function Country({ name }) {
  return (
    <>
      <p>{name}</p>
    </>
  );
}

Country.propTypes = {
  name: PropTypes.string,
};

export default Country;
