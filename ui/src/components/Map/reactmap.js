import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';
import get from "lodash/get";
import ScatterplotOverlay from './scatterplotoverlay'
import Pin from './pin';
import secrets from '../../secrets/secrets';

import { updateAppValue } from '../../actions/actions'


const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
};

class ReactMap extends Component {
    state = {
        mapStyle: '',
        viewport: {
            width: '100%',
            height:710,
            latitude: 33.769003,
            longitude: -84.389811,
            zoom: 12.5,
            bearing: 0,
            pitch: 0,
        },
        token: MapboxAccessToken
    };

    _onViewportChange = (viewport) => {
        this.setState({viewport});
    }
    
    _onMapClick = (event) => {
        this.props.updateAppValue('marker', {
            longitude: event.lngLat[0],
            latitude: event.lngLat[1]
        })
    }


    render() {
        const {viewport} = this.state;
        const locations = get(this.props, "location.locDataSearch.locations", [])

        return (
            <MapGL
                {...viewport}
                mapboxApiAccessToken={this.state.token}
                mapStyle='mapbox://styles/mapbox/light-v10'
                onViewportChange={this._onViewportChange}
                onClick={(event) => 
                    this._onMapClick(event)}
            >
                <ScatterplotOverlay
                    locations={locations}
                    dotRadius={15}
                    globalOpacity={1}
                    compositeOperation="lighter"
                    dotFill="#ca5f14"
                    renderWhileDragging={true}
                    />
                <Marker 
                    latitude={this.props.marker.latitude}
                    longitude={this.props.marker.longitude}
                >
                    <Pin size={55} />
                </Marker>

                <div style={navStyle}>
                    <NavigationControl 
                        onViewportChange={this._updateViewport} 
                    />
                </div>
            </MapGL>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.location,
        marker: state.app.marker
        }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAppValue: (key, value) => {
            dispatch(updateAppValue(key, value))
            },
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(ReactMap));
