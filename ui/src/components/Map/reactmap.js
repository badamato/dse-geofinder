import React, {Component} from 'react';
import MapGL, { Marker, NavigationControl, Popup } from 'react-map-gl';

import ControlPanel from './controlpanel';
import Pin from './pin';
import PinInfo from './pininfo';
import style from '../../style/style.css';
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
            latitude: 33.758447,
            longitude: -84.386171,
            zoom: 13,
            bearing: 0,
            pitch: 0,
        },
        marker: {
            latitude: 33.758447,
            longitude: -84.386171,
        },
        token: MapboxAccessToken,
        events: {},
        popupInfo: null
    };

    _updateViewport = (viewport) => {
        this.setState({viewport});
    }
    
    _logDragEvent(name, event) {
        this.setState({
            events: {
                ...this.state.events,
                [name]: event.lngLat,
            }
        })
    }
    
    _onMarkerDragStart = (event) => {
        this._logDragEvent('onDragStart', event);
    };
    
    _onMarkerDrag = (event) => {
        this._logDragEvent('onDrag', event);
    };
    
    _onMarkerDragEnd = (event) => {
        this._logDragEvent('onDragEnd', event);
        this.setState({
            marker: {
                longitude: event.lngLat[0],
                latitude: event.lngLat[1],
            }
        });
    };

    render() {
        const {viewport, marker, events, popupInfo} = this.state;

        return (
            <MapGL
                {...viewport}
                mapboxApiAccessToken={this.state.token}
                mapStyle='mapbox://styles/mapbox/outdoors-v11'
                onViewportChange={this._updateViewport}>
                <Marker 
                    longitude={marker.longitude}
                    latitude={marker.latitude}
                    draggable
                    // onClick={() => this.setState({popupInfo: })}
                    onDragStart={this._onMarkerDragStart}
                    onDrag={this._onMarkerDrag}
                    onDragEnd={this._onMarkerDragEnd} 
                >
                    <Pin  />
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