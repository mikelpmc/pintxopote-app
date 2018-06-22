import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import dayjs from 'dayjs';

import { toggleModal } from './../../redux/actions/modal';

const PintxoCard = ({ pintxo, pub, toggleModal, withReserveButton }) => {
    const date = dayjs(pintxo.date).format('DD/MM/YYYY');
    const numReservas = pintxo.orders.length;

    const handleToggleModal = () => {
        toggleModal(pintxo._id);
    };

    return (
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card">
                <button
                    className="reserve-button btn btn-rose btn-fab btn-round"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Total reservas"
                >
                    {numReservas}
                </button>

                <Link to={`/pintxos/${pintxo._id}`}>
                    <img
                        className="card-img-top img-pintxo"
                        src={pintxo.image}
                        alt={pintxo.name}
                    />
                </Link>
                <div className="card-header card-header-rose card-title">
                    <Link to={`/pintxos/${pintxo._id}`}>
                        <span className="text-white">{pintxo.name}</span>
                    </Link>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        <span className="pull-right">{date}</span>
                        <span>
                            {pub && (
                                <Link
                                    to={`/pubs/${pub._id}`}
                                    className=" font-italic"
                                >
                                    <i
                                        className="fa fa-glass"
                                        aria-hidden="true"
                                    />{' '}
                                    {pub.name}
                                </Link>
                            )}
                        </span>
                    </p>
                </div>

                {withReserveButton && (
                    <div className="card-footer mt-3 justify-content-center">
                        <button
                            className="btn btn-rose-outline btn-round"
                            onClick={handleToggleModal}
                        >
                            Reservar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

PintxoCard.defaultProps = {
    withReserveButton: true
};

PintxoCard.propTypes = {
    pintxo: PropTypes.object.isRequired,
    pub: PropTypes.object,
    toggleModal: PropTypes.func.isRequired,
    withReserveButton: PropTypes.bool
};

export default withRouter(
    connect(
        null,
        { toggleModal }
    )(PintxoCard)
);
