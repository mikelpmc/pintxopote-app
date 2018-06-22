import React from 'react';
import PropTypes from 'prop-types';

const Address = ({ address }) => {
    return (
        <React.Fragment>
            <span>Dirección</span>
            <hr />

            <ul className="profile-data">
                <li>
                    <strong>Calle:</strong> {address.street && address.street}
                </li>
                <li>
                    <strong>Ciudad:</strong> {address.city && address.city}
                </li>
                <li>
                    <strong>Código Postal:</strong>{' '}
                    {address.postalCode && address.postalCode}
                </li>
                <li>
                    <strong>País:</strong> {address.country && address.country}
                </li>
            </ul>
        </React.Fragment>
    );
};

export default Address;
