import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import socketServer from 'socket.io-client';

import { toast } from 'react-toastify';
import CustomToastContainer from './../utils/customToastContainer';

import { PintxoList, PintxoCard } from './../components/pintxos/';
import { OrderModal } from './../components/modals';

import {
    getPintxopoteById,
    fetchPintxosByCity
} from './../redux/actions/pintxopote';
import { toggleModal } from './../redux/actions/modal';

const defaultCity = 'Galdakao';
let socket = null;

class PintxoPage extends Component {
    static propTypes = {
        getPintxopoteById: PropTypes.func.isRequired,
        fetchPintxosByCity: PropTypes.func,
        createOrder: PropTypes.func,
        pintxos: PropTypes.object.isRequired
    };

    state = {
        numberOrdersClass: ''
    };

    componentDidMount() {
        const { params } = this.props.match;

        this.props.getPintxopoteById(params.id);
        this.props.fetchPintxosByCity(defaultCity);

        // Listen to route changes (for same route refresh data)
        this.unlisten = this.props.history.listen((location, action) => {
            const { pathname } = location;

            const [route, id] = pathname.split('/').slice(1);

            if (route === 'pintxos') this.props.getPintxopoteById(id);
        });

        // Socket IO
        socket = socketServer('https://secure-reef-96406.herokuapp.com/');
        socket.on('orderCreated', pintxopoteId => {
            this.props.getPintxopoteById(pintxopoteId).then(() => {
                this.setState({ numberOrdersClass: 'animated tada' }, () => {
                    setTimeout(
                        () => this.setState({ numberOrdersClass: '' }),
                        1000
                    );
                });
            });
        });
    }

    componentWillUnmount() {
        this.unlisten();
        socket.close();
    }

    handleToggleModal = () => {
        const { auth } = this.props.auth;
        const id = this.props.match.params.id;

        auth
            ? this.props.toggleModal(id)
            : this.props.history.push(`/login?ref=reserva&id=${id}`);
    };

    renderPintxoData = () => {
        const {
            pintxos: { pintxos, pintxo }
        } = this.props;
        const { numberOrdersClass } = this.state;

        if (Object.keys(pintxo).length === 0) return <span>Cargando...</span>;

        const date = dayjs(pintxo.date).format('DD/MM/YYYY');

        return (
            <div className="mb-5 animated fadeIn">
                <OrderModal />

                <div
                    className="page-header header-filter"
                    data-parallax="true"
                    style={{
                        backgroundImage: 'url("/assets/images/bg-login.jpg")'
                    }}
                />
                <div className="pintxo-page-content main main-raised">
                    <div className="profile-content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6 col-md-4">
                                    <div className="text-left">
                                        <div className="pintxo-img">
                                            <img
                                                src={pintxo.image}
                                                alt={pintxo.name}
                                                className="img-raised rounded img-fluid"
                                            />
                                        </div>
                                        <div className="info-pintxo">
                                            <button
                                                className="btn btn-rose btn-round btn-lg"
                                                onClick={this.handleToggleModal}
                                            >
                                                <i className="material-icons">
                                                    shopping_cart
                                                </i>{' '}
                                                Reservar Pintxo!
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6 col-md-8">
                                    <span className="pull-right">{date}</span>

                                    <span className="pull-left">
                                        <h1 className="title no-margin-top">
                                            {pintxo.name}
                                        </h1>
                                    </span>

                                    <div className="clearfix" />

                                    <div>
                                        <span className="pull-left align-self-center">
                                            <h4 className="no-margin-top">
                                                <span className="">
                                                    Reservas totales:
                                                </span>{' '}
                                                <span
                                                    className={`text-rose ${numberOrdersClass}`}
                                                >
                                                    {pintxo.orders.length}
                                                </span>
                                            </h4>
                                        </span>
                                    </div>
                                    <div className="clearfix" />
                                    <hr />

                                    <Link to={`/pubs/${pintxo.pub._id}`}>
                                        <i
                                            className="fa fa-glass"
                                            aria-hidden="true"
                                        />{' '}
                                        {pintxo.pub.name}
                                    </Link>
                                </div>
                            </div>

                            <div className="row justify-content-center text-center mt-4">
                                <div className="col-xs-12 col-sm-6">
                                    <h2>Otros Pintxos</h2>
                                    <hr />
                                </div>
                            </div>

                            <div className="row">
                                <PintxoList
                                    pintxos={pintxos.filter(
                                        _pintxo => _pintxo._id !== pintxo._id
                                    )}
                                    render={pintxo => {
                                        return (
                                            <PintxoCard
                                                key={pintxo._id}
                                                pintxo={pintxo}
                                                pub={pintxo.pub}
                                                withReserveButton={false}
                                            />
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const {
            orderError,
            orderSuccess,
            pintxos: { error: pintxoError }
        } = this.props;

        if (orderError !== '') toast.error(`¡Error! ${orderError}`);
        if (orderSuccess !== '') toast.success(`${orderSuccess}`);

        if (pintxoError !== '') return <Redirect to="/" />;

        return (
            <div>
                {this.renderPintxoData()}

                <CustomToastContainer position="top-center" />
            </div>
        );
    }
}

function mapStateToProps({
    pintxos,
    orders: { error: orderError, success: orderSuccess },
    auth
}) {
    return { auth, pintxos, orderError, orderSuccess };
}

function loadData(store, params) {
    return store.dispatch(getPintxopoteById(params.id));
}

export default {
    loadData,
    component: connect(
        mapStateToProps,
        {
            getPintxopoteById,
            fetchPintxosByCity,
            toggleModal
        }
    )(PintxoPage)
};
