import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { QrModal } from './../components/modals';

import { getOrdersByUserId } from './../redux/actions/order';

import { OrderList, OrderItem } from './../components/reservas/';

class ReservasPage extends Component {
    static propTypes = {
        orders: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.getOrdersByUserId();
    }

    render() {
        const { orders, error, success } = this.props.orders;

        return (
            <div className="container animated fadeIn mb-4">
                <div className="row justify-content-center">
                    <h2 className="title text-center">Tus reservas</h2>
                </div>

                {!Object.keys(orders).length ? (
                    <h4 className="text-center">
                        Aún no has realizado ninguna reserva
                    </h4>
                ) : (
                    <React.Fragment>
                        <QrModal />

                        <span>
                            <ul className="nav nav-pills nav-pills-rose justify-content-center mt-3">
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        href="#no-validated"
                                        data-toggle="tab"
                                    >
                                        Sin Validar
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href="#validated"
                                        data-toggle="tab"
                                    >
                                        Validadas
                                    </a>
                                </li>
                            </ul>

                            <div className="tab-content tab-space">
                                <div
                                    className="tab-pane active"
                                    id="no-validated"
                                >
                                    <div className="row justify-content-center">
                                        <OrderList
                                            orders={orders.filter(
                                                order => !order.validated
                                            )}
                                            render={order => {
                                                return (
                                                    <OrderItem
                                                        key={order._id}
                                                        order={order}
                                                    />
                                                );
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="tab-pane" id="validated">
                                    <div className="row justify-content-center">
                                        <OrderList
                                            orders={orders.filter(
                                                order => order.validated
                                            )}
                                            render={order => {
                                                return (
                                                    <OrderItem
                                                        key={order._id}
                                                        order={order}
                                                    />
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </span>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

function mapStateToProps({ orders }) {
    return { orders };
}

export default connect(
    mapStateToProps,
    { getOrdersByUserId }
)(ReservasPage);
