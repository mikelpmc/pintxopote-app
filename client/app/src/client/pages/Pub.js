import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { PintxoList, PintxoCard } from './../components/pintxos/';
import MapContainer from './../components/map/MapContainer';

import { getPubById } from './../redux/actions/pub';

class PubPage extends Component {
    static propTypes = {
        getPubById: PropTypes.func.isRequired,
        pubs: PropTypes.object.isRequired
    };

    componentDidMount() {
        const { params } = this.props.match;

        this.props.getPubById(params.id);
    }

    renderPubData() {
        const { pub } = this.props.pubs;

        if (Object.keys(pub).length === 0) return <span>Cargando...</span>;

        return (
            <div>
                <nav aria-label="breadcrumb" role="navigation">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/pubs">Pubs</Link>
                        </li>
                        <li
                            className="breadcrumb-item active"
                            aria-current="page"
                        >
                            {pub.name}
                        </li>
                    </ol>
                </nav>

                <div className="row mt-5">
                    <div className="col-xs-12 col-sm-12 col-md-6 align-self-center">
                        <img
                            src={pub.image}
                            alt={pub.name}
                            className="img-fluid img-raised"
                        />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6">
                        <h1 className="title no-margin-top">{pub.name}</h1>
                        <hr />
                        <p>{pub.desc}</p>
                    </div>
                </div>

                <div className="row justify-content-center text-center mt-5">
                    <div className="col-xs-12 col-sm-6">
                        <h2>Pintxos</h2>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <PintxoList
                        pintxos={pub.pintxopotes}
                        render={pintxo => {
                            return (
                                <PintxoCard
                                    key={pintxo._id}
                                    pintxo={pintxo}
                                    pub={null}
                                    withReserveButton={false}
                                />
                            );
                        }}
                    />
                </div>

                <div className="row mt-3 mb-5">
                    <MapContainer pubs={[pub]} width="80vw" />
                </div>
            </div>
        );
    }

    render() {
        const {
            pubs: { error }
        } = this.props;

        if (error !== '') return <Redirect to="/pubs" />;

        return (
            <div className="container animated fadeIn">
                {this.renderPubData()}
            </div>
        );
    }
}

function mapStateToProps({ pubs }) {
    return { pubs };
}

function loadData(store, params) {
    return store.dispatch(getPubById(params.id));
}

export default {
    loadData,
    component: connect(
        mapStateToProps,
        { getPubById }
    )(PubPage)
};
