import React from 'react';
import PropTypes from 'prop-types';

const PubList = ({ pubs, render }) => {
    return pubs.map(pub => render(pub));
};

PubList.propTypes = {
    pubs: PropTypes.array.isRequired
};

export default PubList;
