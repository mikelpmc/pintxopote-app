import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPubsByCity } from './../redux/actions/pub';

import { PubList, PubCard } from './../components/pubs/index';

const defaultCity = 'Galdakao';

class PubsPage extends Component {
    static propTypes = {
        fetchPubsByCity: PropTypes.func.isRequired,
        pubs: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.fetchPubsByCity(defaultCity);
    }

    render() {
        const { pubs, error } = this.props.pubs;

        return (
            <div className="container animated fadeIn">
                <div className="row">
                    <PubList
                        pubs={pubs}
                        render={pub => {
                            return <PubCard key={pub._id} pub={pub} />;
                        }}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps({ pubs }) {
    return { pubs };
}

function loadData(store) {
    return store.dispatch(fetchPubsByCity(defaultCity));
}

export default {
    loadData,
    component: connect(
        mapStateToProps,
        { fetchPubsByCity }
    )(PubsPage)
};
