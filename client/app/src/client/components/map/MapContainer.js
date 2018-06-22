import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends Component {
    static defaultProps = {
        center: { lat: 43.230592, lng: -2.84298 },
        zoom: 16,
        mapTypeId: 'roadmap',
        pubs: [],
        width: '100%',
        height: '450px'
    };

    componentDidMount() {
        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            const { google, center, zoom, mapTypeId, pubs } = this.props;

            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            const mapConfig = {
                center,
                zoom,
                mapTypeId
            };

            this.map = new maps.Map(node, mapConfig);

            pubs.forEach(pub => {
                const marker = new google.maps.Marker({
                    position: {
                        lat: Number(pub.address.lat),
                        lng: Number(pub.address.long)
                    },
                    map: this.map,
                    title: pub.name
                });
            });
        }
    }

    render() {
        const style = {
            width: this.props.width,
            height: this.props.height
        };

        return (
            <div ref="map" style={style}>
                Cargando mapa...
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAhZDid7-SKr-IQItbVCi3iN3r3gNfYdh4'
})(MapContainer);
