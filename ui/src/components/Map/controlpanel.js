
import React, {PureComponent} from 'react';
import style from '../../style/style.css';

const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;


export default class ControlPanel extends PureComponent {
    // renderEvent = (eventName) => {
    //     const {events = {}} = this.props;
    //     const lngLat = events[eventName];


    //     return (
    //     <div key={eventName}>
    //         <strong>{eventName}:</strong>{' '}
    //         {lngLat ? lngLat.map(round5).join(', ') : <em>null</em>}
    //     </div>
    //     );
    // };

    render() {
        const Container = this.props.containerComponent || defaultContainer;
        return (
        <Container>
            <h3>DEMOGRAPHIC PANEL</h3>
            {/* <p>Click to add income layer.</p> */}
            <hr />
            <div>
            {/* {eventNames.map(this.renderEvent)} */}
            </div>
        </Container>
        );
    }
}