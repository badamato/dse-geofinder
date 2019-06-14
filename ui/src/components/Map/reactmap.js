import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';
import get from "lodash/get";
import ScatterplotOverlay from './scatterplotoverlay'
import Pin from './pin';
import secrets from '../../secrets/secrets';
// import ControlPanel from './controlpanel';


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
            height: 720,
            latitude: 33.763806,
            longitude: -84.392326,
            zoom: 11,
            bearing: 0,
            pitch: 0,
        },
        marker: {
            latitude: 33.763806,
            longitude: -84.392326,
        },
        token: MapboxAccessToken
        // events: {}
    };

    _onViewportChange = (viewport) => {
        this.setState({viewport});
    }
    
    _onStyleChange = (mapStyle) => {
        this.setState({mapStyle})
    }

    _onMapClick = (event) => {
        this.setState({
            marker: {
                longitude: event.lngLat[0],
                latitude: event.lngLat[1]
            }
        })
    }

    render() {
        const {viewport, mapStyle, marker, events} = this.state;
        const locations = get(this.props, "location.locDataSearch.locations", [])

        return (
            <MapGL
                {...viewport}
                mapboxApiAccessToken={this.state.token}
                mapStyle='mapbox://styles/mapbox/light-v10'
                // mapStyle={mapStyle}
                onViewportChange={this._onViewportChange}
                onClick={(event) => 
                    this._onMapClick(event)}
            >
                <ScatterplotOverlay
                    locations={locations}
                    dotRadius={10}
                    globalOpacity={0.8}
                    compositeOperation="lighter"
                    dotFill="blue"
                    renderWhileDragging={true}
                    />
                <Marker 
                    longitude={marker.longitude}
                    latitude={marker.latitude}
                >
                    <Pin size={50} />
                </Marker>

                <div className="nav" style={navStyle}>
                    <NavigationControl 
                        onViewportChange={this._updateViewport} 
                    />
                </div>

                {/* <ControlPanel
                    containerComponent={this.props.containerComponent}
                    onChange={this._onStyleChange} 
                /> */}
            </MapGL>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.location
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(ReactMap));
