import React, {Component} from 'react';
import {connect} from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';

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
};

class SearchBar extends Component {

    state = {
        lat: null,
        lng: null
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

        if (query.length > 1) {
            this.props.getGeoName(query, lat, lng)
        }
        
    }

    render() {
        const { classes } = this.props;
        const { names } = (this.props.locData || {});

        return (
            <div className={classes.searchBox}>
                <InputBase
                    placeholder="Type your search here…"
                    onChange = {this.search}
                    className={classes.inputInput}/>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    locData: state.app.locData,

});

const mapDispatchToProps = (dispatch) => ({
    getGeoName(name, lat, lng) {
        return dispatch(getGeoName(name, lat, lng))
    }
})


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SearchBar));
