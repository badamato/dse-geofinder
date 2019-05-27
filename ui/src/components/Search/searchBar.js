import React, {Component} from 'react';
import {connect} from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import { withStyles, jssPreset } from '@material-ui/core/styles';
import Select from 'react-select';

import { getGeoName } from '../../actions/actions';


const styles = {
    input: {
        display: 'none',
    },
    inputInput: {
        paddingTop: '2px',
        paddingRight: '2px',
        paddingBottom: '2px',
        paddingLeft: '30px',
        transition: 'width 2s',
        width: '80%',
    },
    searchBox: {
        display: 'flex',
        borderRadius: '2px',
        backgroundColor: '#e5e5e5e5',
            '&:hover': {
                backgroundColor: '#c0c0c0',
            },
    },
    select: {
    }
};

const selectStyles = {
    indicatorSeparator: base => ({
        ...base,
        display: 'none',
    }),
    dropdownIndicator: base => ({
        ...base,
        display: 'none',
    }),
    control: (base, state) => ({
        ...base,
        borderColor: "silver",
        boxShadow: state.isFocused ? '#1AB5E0' : null,
        "&:hover": {
            borderColor: '#1AB5E0'
        }
    })
}

class SearchBar extends Component {

    state = {
        lat: null,
        lng: null,
        isLoading: false
    }
    
    //built in formula for getting users current location - at init
    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({lat: position.coords.latitude, lng: position.coords.longitude})
            })
        }
    }
    
    search = (e) => {
        const { lat, lng } = this.state;
        const query = e.target.value;

        if (query.length > 2) {
            this.props.getGeoName(query, lat, lng)
        }
        
    }

    render() {
        const { classes } = this.props;
        const { names } = (this.props.location.locData || {});
        const { isLoading } = this.props.location

        return (
            <div>
                {/* <div className={classes.searchBox}>
                    <InputBase
                        placeholder="Type your search here…"
                        onChange={this.search}
                        className={classes.inputInput}/>
                        <br />
                </div> */}
                <div>
                    <Select className={classes.select} 
                        isLoading={isLoading}
                        menuIsOpen //use this temporarily while developing
                        name="locations"
                        options={names}
                        styles={selectStyles} />
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    location: state.location

});

const mapDispatchToProps = (dispatch) => ({
    getGeoName(name, lat, lng) {
        return dispatch(getGeoName(name, lat, lng))
    }
})


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SearchBar));
