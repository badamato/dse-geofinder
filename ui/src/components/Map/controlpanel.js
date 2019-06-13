import React, {PureComponent} from 'react';


const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;
// const eventNames = ['onDragStart', 'onDrag', 'onDragEnd'];

function round5(value) {
    return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

class ControlPanel extends PureComponent {

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
                    <div className="input">
                        <input type="checkbox"
                            name="geodata"
                            checked={null}
                            onChange={event => onChangeAllDay(event.target.checked)}
                            />
                        <label>Banking</label>
                    </div>
                    <div className="input">
                        <input type="checkbox"
                            name="geodata"
                            checked={null}
                            onChange={event => onChangeAllDay(event.target.checked)}
                            />
                        <label>Fast Food</label>
                    </div>
                    <div className="input">
                        <input type="checkbox"
                            name="geodata"
                            checked={null}
                            onChange={event => onChangeAllDay(event.target.checked)}
                            />
                        <label>Shopping</label>
                    </div>
                <hr />
                {/* <div>{eventNames.map(this.renderEvent)}</div> */}
                <h5>SOURCE: {' '} <a style={{textDecoration: 'none', color: 'blue'}} href="https://catalog.data.gov/dataset?groups=consumer9350&#topic=consumer_navigation" target="_blank">USA GOV - OPEN DATA</a></h5>
            </Container>
        );
    }
}

export default ControlPanel;