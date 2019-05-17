import React, {PureComponent} from 'react';
import style from '../../style/style.css';


const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;
const eventNames = ['onDragStart', 'onDrag', 'onDragEnd'];

function round5(value) {
    return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

class ControlPanel extends PureComponent {
    renderEvent = (eventName) => {
        const {events = {}} = this.props;
        const lngLat = events[eventName];
        return (
            <div key={eventName}>
                <strong>{eventName}:</strong>{' '}
                {lngLat ? lngLat.map(round5).join(', ') : <em>null</em>}
            </div>
        );
    };

    render() {
        const Container = this.props.containerComponent || defaultContainer;

        return (
            <Container>
                <h3>Draggable Marker</h3>
                <p>Try dragging the marker to another location.</p>
                <div>
                {eventNames.map(this.renderEvent)}
                </div>
            </Container>
        );
    }
}

export default ControlPanel;