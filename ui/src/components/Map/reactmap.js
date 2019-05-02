import React, {Component} from 'react';
import ReactMapGL, { Marker, Layer, Popup } from 'react-map-gl';
import Pin from './pin';
import secrets from '../../secrets/secrets';

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
            data: null
        };
    }

    componentDidMount() {
        const {data, api_url } = this.state;

        if (!data) {
            fetch(api_url, { method: 'GET'})
            .then(res => this.setState({data: res}))
        }
    }


    render() {
        const { coords } = this.state;

        return (
        <ReactMapGL
            mapboxApiAccessToken={this.state.token}
            // mapStyle='mapbox://styles/mapbox/streets-v11'
            mapStyle='mapbox://styles/mapbox/light-v9'
            {...this.state.viewport}
            onViewportChange={(viewport) => this.setState({viewport})}>

            { coords.map((coord, index) => (
                <Marker key={index} latitude={coord.latitude} longitude={coord.longitude} >
                    <Pin />
                </Marker>
            )) }

        </ReactMapGL>
        );
    }
}

export default ReactMap;