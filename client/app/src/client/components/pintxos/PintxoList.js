import React from 'react';
import PropTypes from 'prop-types';

const PintxoList = ({ pintxos, render }) => {
    const ordered = pintxos.sort((a, b) => {
        const score1 = b.orders.length;
        const score2 = a.orders.length;

        return score1 - score2;
    });

    return ordered.map(pintxo => render(pintxo));
};

PintxoList.propTypes = {
    pintxos: PropTypes.array.isRequired
};

export default PintxoList;
