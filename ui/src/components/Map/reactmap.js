import React, { Component } from 'react';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';

import ControlPanel from './controlpanel';
import Pin from './pin';
import secrets from '../../secrets/secrets';

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
            zoom: 14,
            bearing: 0,
            pitch: 0,
        },
        marker: {
            latitude: 33.763806,
            longitude: -84.392326,
        },
        token: MapboxAccessToken,
        // events: {}
    };

    _updateViewport = (viewport) => {
        this.setState({viewport});
    }
    
    // _logDragEvent(name, event) {
    //     this.setState({
    //         events: {
    //             ...this.state.events,
    //             [name]: event.lngLat,
    //         }
    //     })
    // }
    
    // _onMarkerDragStart = (event) => {
    //     this._logDragEvent('onDragStart', event);
    // };
    
    // _onMarkerDrag = (event) => {
    //     this._logDragEvent('onDrag', event);
    // };
    
    // _onMarkerDragEnd = (event) => {
    //     this._logDragEvent('onDragEnd', event);
    //     this.setState({
    //         marker: {
    //             longitude: event.lngLat[0],
    //             latitude: event.lngLat[1],
    //         }
    //     });
    // };

    _onMapClick = (event) => {
        this.setState({
            marker: {
                longitude: event.lngLat[0],
                latitude: event.lngLat[1]
            }
        })
    }


    render() {
        const {viewport, marker, events} = this.state;

        return (
            <MapGL
                {...viewport}
                mapboxApiAccessToken={this.state.token}
                // mapStyle='mapbox://styles/mapbox/outdoors-v11'
                mapStyle='mapbox://styles/badamato/cjwtnuc3d2nem1cmu3bxpicw2'
                onViewportChange={this._updateViewport}
                onClick={(event) => 
                    this._onMapClick(event)}
            >
                <Marker 
                    longitude={marker.longitude}
                    latitude={marker.latitude}
                    // draggable
                    // onDragStart={this._onMarkerDragStart}
                    // onDrag={this._onMarkerDrag}
                    // onDragEnd={this._onMarkerDragEnd} 
                >
                    <Pin size={50} />
                </Marker>

                <div className="nav" style={navStyle}>
                    <NavigationControl onViewportChange={this._updateViewport} />
                </div>

                <ControlPanel
                    containerComponent={this.props.containerComponent}
                    events={this.state.events} />
            </MapGL>
        );
    }
}

export default ReactMap;