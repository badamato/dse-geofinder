import React, {Component} from 'react';
import ReactMapGL from 'react-map-gl';

class ReactMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewport: {
                width: '100%',
                height: 815,
                latitude: 33.753746,
                longitude: -84.386330,
                zoom: 9
            },
            token: 'pk.eyJ1IjoiYmFkYW1hdG8iLCJhIjoiY2p1anZ6YTVkMXBzZTQ0dWpheGF4ODF6dyJ9.KglfXQnMkcHnkKPyr-ZkXw'
        };
    }


    render() {
        return (
        <ReactMapGL
            mapboxApiAccessToken={this.state.token}
            {...this.state.viewport}
            onViewportChange={(viewport) => this.setState({viewport})}
        />
        );
    }
}

export default ReactMap;