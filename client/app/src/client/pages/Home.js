import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import socketServer from 'socket.io-client';

import { toast } from 'react-toastify';
import CustomToastContainer from './../utils/customToastContainer';

import { fetchPintxosByCity } from './../redux/actions/pintxopote';

import { OrderModal } from './../components/modals';
import MapContainer from './../components/map/MapContainer';
import { PintxoCard, PintxoList } from './../components/pintxos/';

const defaultCity = 'Galdakao';
let socket = null;

class HomePage extends Component {
    static propTypes = {
        fetchPintxosByCity: PropTypes.func.isRequired,
        pintxos: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.fetchPintxosByCity(defaultCity);

        // Socket IO
        socket = socketServer('https://secure-reef-96406.herokuapp.com/');
        socket.on('orderCreated', pintxopoteId => {
            this.props.fetchPintxosByCity(defaultCity);
        });
    }

    componentWillUnmount() {
        socket.close();
    }

    render() {
        const {
            orderError,
            orderSuccess,
            pintxos: { pintxos }
        } = this.props;

        const today = dayjs(new Date()).format('DD/MM/YYYY');

        if (orderError !== '') toast.error(`¡Error! ${orderError}`);
        if (orderSuccess !== '') toast.success(`${orderSuccess}`);

        return (
            <div className="container animated fadeIn">
                <OrderModal />

                <CustomToastContainer position="top-center" />

                <span className="justify-content-end">
                    Estás en: <span className="text-rose">{defaultCity}</span>
                </span>
                <span className="pull-right">
                    Hoy es: <span className="text-rose">{today}</span>
                </span>

                <ul className="nav nav-pills nav-pills-rose justify-content-center mt-3">
                    <li className="nav-item">
                        <a
                            className="nav-link active"
                            href="#pintxos"
                            data-toggle="tab"
                        >
                            Top Pintxopotes
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#mapa" data-toggle="tab">
                            Vista Mapa
                        </a>
                    </li>
                </ul>

                <div className="tab-content tab-space">
                    <div className="tab-pane active" id="pintxos">
                        <div className="row">
                            <PintxoList
                                pintxos={pintxos}
                                render={pintxo => {
                                    return (
                                        <PintxoCard
                                            key={pintxo._id}
                                            pintxo={pintxo}
                                            pub={pintxo.pub}
                                        />
                                    );
                                }}
                            />
                        </div>
                    </div>

                    <div className="tab-pane" id="mapa">
                        <div className="row">
                            <div className="col-12">
                                <MapContainer
                                    pubs={pintxos.map(pintxo => pintxo.pub)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({
    pintxos,
    orders: { error: orderError, success: orderSuccess }
}) {
    return { pintxos, orderError, orderSuccess };
}

function loadData(store) {
    return store.dispatch(fetchPintxosByCity(defaultCity));
}

export default {
    loadData,
    component: connect(
        mapStateToProps,
        {
            fetchPintxosByCity
        }
    )(HomePage)
};
