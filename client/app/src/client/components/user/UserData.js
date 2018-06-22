import React from 'react';
import PropTypes from 'prop-types';
import { Address } from './index';

const UserData = ({ user }) => {
    return (
        <React.Fragment>
            <span>Datos</span>
            <hr />

            <ul className="profile-data">
                <li>
                    <strong>Nombre:</strong> {user.name}
                </li>
                <li>
                    <strong>Apellido:</strong> {user.surname}
                </li>
                <li>
                    <strong>Email:</strong> {user.email}
                </li>
            </ul>

            {user.hasOwnProperty('address') && (
                <Address address={user.address} />
            )}

            <span>Pagos</span>
            <hr />
            <ul className="profile-data">
                <li>
                    <strong>Tarjeta de crédito:</strong>{' '}
                    {user.creditCard && user.creditCard}
                </li>
            </ul>
        </React.Fragment>
    );
};

export default UserData;
