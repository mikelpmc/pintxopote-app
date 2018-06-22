import React from 'react';
import PropTypes from 'prop-types';

const OrderList = ({ orders, render }) => {
    return orders.map(order => render(order));
};

OrderList.propTypes = {
    orders: PropTypes.array.isRequired,
    render: PropTypes.func.isRequired
};

export default OrderList;
