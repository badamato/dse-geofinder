import React, {Component} from 'react';
import ReactMapGL, { Marker, NavigationControl, Layer, Popup } from 'react-map-gl';

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
    constructor(props) {
        super(props);

        this.state = {
            api_url: '',
            viewport: {
                width: '100%',
                height: 815,
                latitude: 33.758447,
                longitude: -84.386171,
                zoom: 13
            },
            token: MapboxAccessToken,
            coords: [
                { latitude: 33.760702, longitude: -84.387473 },
                { latitude: 33.755368, longitude: -84.389651 },
                { latitude: 33.758106, longitude: -84.394737 },
                { latitude: 33.761638, longitude: -84.387924 },
                { latitude: 33.761367, longitude: -84.387826 },
                { latitude: 33.763982, longitude: -84.392621 }
            ],
            data: null,
            events: {}
        };
    }

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


    render() {
        const { coords, viewport } = this.state;

        return (
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={this.state.token}
            // mapStyle='mapbox://styles/mapbox/streets-v11'
            mapStyle='mapbox://styles/mapbox/light-v9'
            {...this.state.viewport}
            onViewportChange={this._updateViewport}
            onViewportChange={(viewport) => this.setState({viewport})}>

            { coords.map((coord, index) => (
                <Marker key={index} latitude={coord.latitude} longitude={coord.longitude} >
                    <Pin />
                </Marker>
            )) }

        <div className="nav" style={navStyle}>
            <NavigationControl onViewportChange={this._updateViewport} />
        </div>

        <ControlPanel
        containerComponent={this.props.containerComponent}
        events={this.state.events}
        />

        </ReactMapGL>
        );
    }
}

export default ReactMap;