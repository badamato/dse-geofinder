import React, {PureComponent} from 'react';
import style from '../../style/style.css';

const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;


class ControlPanel extends PureComponent {

    render() {
        const Container = this.props.containerComponent || defaultContainer;
        const {allDay, onChangeAllDay} = this.props;

        return (
            <Container>
                <h3>DEMOGRAPHICS PANEL</h3>
                {/* <p>Click to add income layer.</p> */}
                <hr />
                <div className="input">
                    <label>Food Desert Locations </label>
                    <input type="checkbox"
                        name="geodata"
                        checked={allDay}
                        onChange={event => onChangeAllDay(event.target.checked)}
                        />
                </div>
                <br />
                <h5>SOURCE: <a style={{textDecoration: 'none', color: 'blue'}} href="https://catalog.data.gov/dataset?tags=%22median+household+income%22" target="_blank">ERS/USDA</a></h5>
            </Container>
        );
    }
}

export default ControlPanel;