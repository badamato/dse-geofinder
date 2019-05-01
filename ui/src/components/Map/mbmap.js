import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';


class MbMap extends Component {

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

            map.addControl(new mapboxgl.NavigationControl());
    }

    render() {

        return (
            <div id='map'></div>
        )
    }
}

export default MbMap;