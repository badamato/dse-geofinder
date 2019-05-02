import React, { Component } from 'react';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
import {StaticMap} from 'react-map-gl';

import {MapboxLayer} from '@deck.gl/mapbox';

const INITIAL_VIEW_STATE = {
    longitude: -74.50,
    latitude: 40,
    zoom: 9
};

class Deckmap extends Component {
    state = {};

     // DeckGL and mapbox will both draw into this WebGL context
    _onWebGLInitialized = (gl) => {
        this.setState({gl});
    }

      // Add deck layer to mapbox
    _onMapLoad = () => {
        const map = this._map;
        const deck = this._deck;
        map.addLayer(new MapboxLayer({id: 'my-scatterplot', deck}), 'waterway-label');
    }


    render() {
        return (
        <div>
            
        </div>
        )
    }
}

export default Deckmap;
