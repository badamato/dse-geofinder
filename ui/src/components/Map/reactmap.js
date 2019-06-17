import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapGL, { Marker } from 'react-map-gl';
import get from "lodash/get";
import ScatterplotOverlay from './scatterplotoverlay'
import UserIcon from './userIcon';
import secrets from '../../secrets/secrets';

import { updateAppValue, getAllCategories, getFilteredCategories } from '../../actions/actions'


const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px',
    zIndex: 10,
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
    
    _onMapClick = (event) => {
        this.props.updateAppValue('marker', {
            longitude: event.lngLat[0],
            latitude: event.lngLat[1]
        })
    }

    componentDidMount = () => {
        this.saveBounds()
    }

    onMapChange = (viewport) => {
        this.setState(viewport)
        this.saveBounds()
    }
    
    saveBounds = () => {
        if (this.mapRef !=null) {
            let mapGL = this.mapRef.getMap();
            let bounds = mapGL.getBounds();
            this.props.getAllCategories(bounds._sw.lat, bounds._sw.lng, bounds._ne.lat, bounds._ne.lng)
            this.props.getFilteredCategories(bounds._sw.lat, bounds._sw.lng, bounds._ne.lat, bounds._ne.lng)
        }
    }


    render() {
        const {viewport} = this.state;
        const locations = get(this.props, "location.locDataSearch.locations", [])

        return (
            <MapGL
                {...viewport}
                mapboxApiAccessToken={this.state.token}
                mapStyle='mapbox://styles/mapbox/light-v10'
                onViewportChange={viewport => this.onMapChange({viewport})}
                ref={ map => this.mapRef = map}
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
                    <UserIcon size={55} />
                </Marker>
            </MapGL>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.location,
        marker: state.app.marker,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAppValue: (key, value) => {
            dispatch(updateAppValue(key, value))
        },
        getAllCategories: (lllat, lllng, urlat, urlng) => {
            dispatch(getAllCategories(lllat, lllng, urlat, urlng))
        },
        getFilteredCategories: (lllat, lllng, urlat, urlng) => {
            dispatch(getFilteredCategories(lllat, lllng, urlat, urlng))
        }
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(ReactMap));
