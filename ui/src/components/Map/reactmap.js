import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';
import { get } from "lodash";
import ScatterplotOverlay from './scatterplotoverlay'
import secrets from '../../secrets/secrets';

import { updateAppValue, getAllCategories } from '../../actions/actions'


class ReactMap extends Component {
    state = {
        mapStyle: '',
        viewport: {
            width: '100%',
            height:710,
            latitude: 33.769003,
            longitude: -84.389811,
            zoom: 12.5,
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
        const {viewport} = this.state;
        const fullTextLocations = get(this.props, "location.locDataSearch.locations", []);
        const categorySubCategoryLocations = get(this.props, "filteredCategories.locations", [])

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
                    compositeOperation="lighter"
                    dotFill="#ca5f14"
                    renderWhileDragging={true}
                    />
                <Marker 
                    latitude={this.props.marker.latitude}
                    longitude={this.props.marker.longitude}
                >
                    <svg height="40pt" viewBox="-96 0 512 512" width="40pt" xmlns="http://www.w3.org/2000/svg">
                        <path d="m195.960938 384.738281h-71.921876c-48.699218 7.640625-84.039062 30.390625-84.039062 57.261719 0 33.140625 53.730469 60 120 60s120-26.859375 120-60c0-26.871094-35.339844-49.621094-84.039062-57.261719zm0 0" fill="#91eb90"/>
                        <path d="m310 160c0 30.789062-9.28125 59.421875-25.191406 83.238281-3.988282 6.355469-120.671875 192.175781-124.808594 198.761719-4.101562-6.53125-120.804688-192.382812-124.808594-198.761719-15.910156-23.816406-25.191406-52.449219-25.191406-83.238281 0-82.839844 67.160156-150 150-150s150 67.160156 150 150zm0 0" fill="#ff641a"/>
                        <path d="m250 160c0 49.707031-40.292969 90-90 90s-90-40.292969-90-90 40.292969-90 90-90 90 40.292969 90 90zm0 0" fill="#76e2f8"/>
                        <g fill="#020202">
                            <path d="m60 160c0 55.140625 44.859375 100 100 100s100-44.859375 100-100-44.859375-100-100-100-100 44.859375-100 100zm20.648438 10h39.53125c.863281 23.988281 4.839843 47.9375 12.230468 65.09375-27.550781-10.15625-48-35.066406-51.761718-65.09375zm79.351562-90c9.890625 0 18.796875 43.308594 19.804688 70h-39.609376c.976563-25.839844 9.789063-70 19.804688-70zm19.804688 90c-.976563 25.839844-9.789063 70-19.804688 70-9.890625 0-18.796875-43.308594-19.804688-70zm7.785156 65.09375c7.390625-17.15625 11.367187-41.113281 12.226562-65.105469h39.535156c-3.761718 30.03125-24.210937 54.949219-51.761718 65.105469zm51.761718-85.09375h-39.53125c-.863281-23.988281-4.839843-47.9375-12.230468-65.09375 27.550781 10.15625 48 35.066406 51.761718 65.09375zm-106.941406-65.09375c-7.390625 17.15625-11.367187 41.105469-12.226562 65.09375h-39.535156c3.761718-30.027344 24.210937-54.9375 51.761718-65.09375zm0 0"/>
                            <path d="m170 10c0 5.523438-4.476562 10-10 10s-10-4.476562-10-10 4.476562-10 10-10 10 4.476562 10 10zm0 0"/>
                            <path d="m207.464844 7.160156c-5.273438-1.636718-10.878906 1.3125-12.515625 6.589844-1.636719 5.273438 1.3125 10.875 6.585937 12.511719 58.894532 18.273437 98.464844 72.015625 98.464844 133.738281 0 27.800781-8.128906 54.664062-23.507812 77.6875-.050782.078125-.101563.15625-.152344.234375-4.695313 7.480469-111.636719 177.78125-116.339844 185.273437-4.703125-7.492187-116.441406-185.429687-116.492188-185.507812-15.378906-23.023438-23.507812-49.886719-23.507812-77.6875 0-61.722656 39.570312-115.464844 98.460938-133.738281 5.277343-1.636719 8.226562-7.238281 6.589843-12.511719s-7.238281-8.230469-12.515625-6.589844c-64.269531 19.941406-112.535156 80.066406-112.535156 152.839844 0 31.71875 9.265625 62.378906 26.796875 88.675781l81.003906 129.007813c-35.125 8.03125-77.800781 28.855468-77.800781 64.316406 0 50.183594 79.527344 70 130 70 50.875 0 130-19.984375 130-70 0-35.449219-42.652344-56.28125-77.800781-64.316406l81.003906-129.007813c17.53125-26.296875 26.796875-56.957031 26.796875-88.675781 0-72.738281-48.230469-132.886719-112.535156-152.839844zm62.535156 434.839844c0 35.089844-72.339844 50-110 50-41.570312 0-110-16.476562-110-50 0-19.558594 28.714844-38.515625 69.152344-46.25l32.378906 51.566406c1.828125 2.914063 5.027344 4.683594 8.46875 4.683594s6.640625-1.769531 8.46875-4.683594l32.378906-51.570312c40.4375 7.738281 69.152344 26.695312 69.152344 46.253906zm0 0"/>
                        </g>
                    </svg>
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

export default (connect(mapStateToProps, mapDispatchToProps)(ReactMap));
