import React, {Component} from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';

import ControlPanel from './controlpanel';
import Pin from './pin';
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
        api_url: '',
        viewport: {
            width: '100%',
            height: 815,
            latitude: 33.758447,
            longitude: -84.386171,
            zoom: 13
        },
        marker: {
            latitude: 33.758447,
            longitude: -84.386171,
        },
        token: MapboxAccessToken,
        data: null,
        events: {}
    };

    componentDidMount() {
        const {data, api_url } = this.state;

        if (!data) {
            fetch(api_url, { method: 'GET'})
            .then(res => this.setState({data: res}))
        }
    }

    _updateViewport = (viewport) => {
        this.setState({viewport});
    }

    _logDragEvent(name, event) {
        this.setState({
            events: {
                ...this.state.events,
                [name]: event.lngLat
            }
        });
    }

    _onMarkerDragStart = event => {
        this._logDragEvent('onDragStart', event);
    };
        
    _onMarkerDrag = event => {
        this._logDragEvent('onDrag', event);
    };

    _onMarkerDragEnd = event => {
        this._logDragEvent('onDragEnd', event);
        this.setState({
        marker: {
            longitude: event.lngLat[0],
            latitude: event.lngLat[1]
        }
        });
    };


    render() {
        const { viewport, marker } = this.state;

        return (
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={this.state.token}
            // mapStyle='mapbox://styles/mapbox/light-v9'
            mapStyle='mapbox://styles/mapbox/outdoors-v11'
            {...this.state.viewport}
            onViewportChange={this._updateViewport}
            onViewportChange={(viewport) => this.setState({viewport})} >

            <Marker 
                longitude={marker.longitude}
                latitude={marker.latitude} 
                draggable
                onDragStart={this._onMarkerDragStart}
                onDrag={this._onMarkerDrag}
                onDragEnd={this._onMarkerDragEnd} >
                <Pin />
            </Marker>

        <div className="nav" style={navStyle}>
            <NavigationControl onViewportChange={this._updateViewport} />
        </div>

        <ControlPanel
            containerComponent={this.props.containerComponent}
            events={this.state.events} />
        </ReactMapGL>
        );
    }
}

export default ReactMap;