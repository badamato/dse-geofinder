import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';
import { get } from "lodash";
import classNames from 'classnames';
import ScatterplotOverlay from './scatterplotoverlay';
import RadiusOverlay from './radiusoverlay';
import UserIcon from './userIcon';
import secrets from '../../secrets/secrets';

import { updateAppValue, getAllCategories } from '../../actions/actions';

const styles = {
    root: {

    },
    marker: {
        position: 'absolute',
        left: '350px',
        top: '325px'
    }
};


class ReactMap extends Component {
    state = {
        mapStyle: '',
        viewport: {
            width: '100%',
            height:710,
            latitude: 33.769003,
            longitude: -84.389811,
            zoom: 11,
            maxZoom: 22,
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

            this.props.updateAppValue('bounds', {
                "lllat": bounds._sw.lat,
                "lllng": bounds._sw.lng,
                "urlat": bounds._ne.lat,
                "urlng": bounds._ne.lng
            })
        }
    }




    render() {
        const { classes } = this.props;
        const {viewport} = this.state;
        const fullTextLocations = get(this.props, "location.locDataSearch.locations", []);
        const categorySubCategoryLocations = get(this.props, "filteredCategories.locations", []);
        const locations = get(this.props, 'marker', [])

        return (
            <MapGL
                {...viewport}
                id='map'
                mapboxApiAccessToken={this.state.token}
                mapStyle='mapbox://styles/mapbox/light-v10'
                onViewportChange={viewport => this.onMapChange({viewport})}
                ref={ map => this.mapRef = map}
                onClick={(event) => 
                    this._onMapClick(event)}
            >
                <ScatterplotOverlay
                    locations={(fullTextLocations.concat(categorySubCategoryLocations))}
                    dotRadius={12}
                    globalOpacity={1}
                    compositeOperation="multiple"
                    dotFill="#ca5f14"
                    renderWhileDragging={true}
                    />
                    <RadiusOverlay
                        locations={[[this.props.marker.longitude, this.props.marker.latitude]]}
                        dotRadius={300}
                        globalOpacity={-200}
                        compositeOperation="lighter"
                        dotFill="rgba(202,225,243,0.4)"
                        renderWhileDragging={true}
                    />
                <Marker 
                    className={classNames.marker}
                    latitude={this.props.marker.latitude}
                    longitude={this.props.marker.longitude}
                >
                <UserIcon />
                </Marker>
                <div style={{position: 'absolute', left: 0}} >
                    <NavigationControl {...viewport} onViewportChange={viewport => this.onMapChange({viewport})} />
                </div>
            </MapGL>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.location,
        marker: state.app.marker,
        filteredCategories:  state.app.filteredCategories

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
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ReactMap));
