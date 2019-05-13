import React, {Component} from 'react';
import ReactMapGL, { Marker, NavigationControl, Popup } from 'react-map-gl';

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
        const { viewport } = this.state;

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
                latitude={33.758447} 
                longitude={-84.386171}
                draggable={true} >
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