import React, {PureComponent} from 'react';
import { fromJS } from 'immutable';
import MAP_STYLE from './mapstyle.json';
import style from '../../style/style.css'

const defaultMapStyle = fromJS(MAP_STYLE);

const categories = ['banks', 'fastfood', 'retail'];

const layerSelector = {
    banks: /banks/,
    fastfood: /fastfood/,
    retail: /retail1|retail2/
}

//layer color class by TYPE
const colorClass = {
    circle: 'circle-color',
    stroke: 'circle-stroke-width',
    radius: 'circle-radius',
    blur: 'circle-blur',
    opacity: 'circle-opacity'
}


const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;
// const eventNames = ['onDragStart', 'onDrag', 'onDragEnd'];

// function round5(value) {
//     return (Math.round(value * 1e5) / 1e5).toFixed(5);
// }

class ControlPanel extends PureComponent {

    _defaultLayers = defaultMapStyle.get('layers');

    state = {
        visibility: {
            banks: true,
            fastfood: true,
            retail: true
        },
        color: {
            banks: "#ca5f14",
            fastfood: "#690bbc",
            retail: "#08b7e2",
        }
    }

    componentDidMount() {
        this._updateMapStyle(this.state);
    }
    
    _onColorChange(name, event) {
        const color = {...this.state.color, [name]: event.target.value};
        this.setState({color});
        this._updateMapStyle({...this.state, color});
    }
    
    _onVisibilityChange(name, event) {
        const visibility = {
            ...this.state.visibility,
            [name]: event.target.checked
        };
        this.setState({visibility});
        this._updateMapStyle({...this.state, visibility});
    }

    _updateMapStyle({visibility, color}) {
        const layers = this._defaultLayers
            .filter(layer => {
                const id = layer.get('id');
                return categories.every(name => visibility[name] || !layerSelector[name].test(id));
            })
            .map(layer => {
                const id = layer.get('id');
                const type = layer.get('type');
                const category = categories.find(name => layerSelector[name].test(id));

                if (category && colorClass[type]) {
                    return layer.setIn(['paint', colorClass[type]], color[category]);
                }
                return layer;
            });

        this.props.onChange(defaultMapStyle.set('layers', layers));
    }

    _renderLayerControl(name) {
        const {visibility, color} = this.state;
    
        return (
            <div key={name} className="input">
                <label>{name}</label>
                <input
                    type="checkbox"
                    checked={visibility[name]}
                    onChange={this._onVisibilityChange.bind(this, name)}
                />
                <input
                    type="color"
                    value={color[name]}
                    disabled={!visibility[name]}
                    onChange={this._onColorChange.bind(this, name)}
                />
            </div>
        );
    }

    // renderEvent = (eventName) => {
    //     const {events = {}} = this.props;
    //     const lngLat = events[eventName];
    //     return (
    //         <div key={eventName}>
    //             <strong>{eventName}:</strong>{' '}
    //             {lngLat ? lngLat.map(round5).join(', ') : <em>null</em>}
    //         </div>
    //     );
    // };

    render() {
        const Container = this.props.containerComponent || defaultContainer;

        return (
            <Container>
                <h3>DEMOGRAPHICS PANEL</h3>
                <hr />
                    {categories.map(name => this._renderLayerControl(name))}
                <hr />
                {/* <div>{eventNames.map(this.renderEvent)}</div> */}
                <h5>SOURCE: {' '} <a style={{textDecoration: 'none', color: 'blue'}} href="https://catalog.data.gov/dataset?groups=consumer9350&#topic=consumer_navigation" target="_blank">USA GOV - OPEN DATA</a></h5>
            </Container>
        );
    }
}

export default ControlPanel;