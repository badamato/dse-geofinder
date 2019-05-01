
import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import secrets from '../../secrets/secrets';


class ReactMap extends Component {

    componentDidMount() {
        const { token, longitude, latitude, zoom, styleID } = this.props;
        const mapConfig = {
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [longitude, latitude],
            zoom: zoom,
        }
        mapboxgl.accessToken = token;
        this.map = new mapboxgl.Map(mapConfig);

        this.marker = new mapboxgl.Marker()
            .setLngLat([-84.386330, 33.753746])
            .addTo('map');

    }
    

    render() {
        return (
            <div id='map'></div>
        )
    }
}

export default ReactMap;