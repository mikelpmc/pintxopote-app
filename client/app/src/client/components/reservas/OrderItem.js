import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import dayjs from 'dayjs';

import { toggleModal } from './../../redux/actions/modal';

const OrderItem = ({ order, toggleModal }) => {
    const date = dayjs(order.date).format('DD/MM/YYYY HH:mm:ss');

    const handleToggleModal = () => {
        !order.validated && toggleModal(order._id);
    };

    return (
        <div
            key={order._id}
            className="col-xs-12 col-sm-12 col-md-10 col-lg-8 mt-3"
        >
            <div className="card card-reservas">
                <div className="card-body">
                    <div className="row">
                        <div className="col-xs-12 col-sm-4">
                            <Link to={`/pintxos/${order.pintxopote._id}`}>
                                <img
                                    className="img-fluid rounded img-raised img-card-reserva"
                                    src={order.pintxopote.image}
                                    alt={order.pintxopote.name}
                                />
                            </Link>
                        </div>

                        <div className="col-xs-12 col-sm-8">
                            <span className="float-right align-middle">
                                <i className="material-icons align-middle">
                                    date_range
                                </i>{' '}
                                {date}
                            </span>

                            <h3>
                                <i className="material-icons">fastfood</i>{' '}
                                <Link to={`/pintxos/${order.pintxopote._id}`}>
                                    {order.pintxopote.name}
                                </Link>
                            </h3>
                            <div>
                                <h4>
                                    <i className="material-icons">
                                        shopping_basket
                                    </i>{' '}
                                    {order.quantity}
                                </h4>

                                <span className="pull-right font-weight-bold">
                                    {order.validated ? (
                                        <span className="text-success align-middle">
                                            <i className="material-icons align-middle">
                                                check_circle_outline
                                            </i>{' '}
                                            VALIDADA
                                        </span>
                                    ) : (
                                        <div>
                                            <span className="text-danger align-middle">
                                                <i className="material-icons align-middle">
                                                    error_outline
                                                </i>{' '}
                                                SIN VALIDAR
                                            </span>
                                            <hr />

                                            <button
                                                onClick={handleToggleModal}
                                                className="btn btn-rose btn-round"
                                            >
                                                Generar QR
                                            </button>
                                        </div>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

OrderItem.propTypes = {
    order: PropTypes.object.isRequired
};

export default withRouter(
    connect(
        null,
        { toggleModal }
    )(OrderItem)
);
