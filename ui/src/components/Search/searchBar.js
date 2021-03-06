import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { InputBase, MenuItem } from '@material-ui/core';
import { get } from "lodash";

import { getGeoNameSuggest, getGeoNameSearch} from '../../actions/actions';


const styles = {
    root: {
        width: '90%',
        margin: '50px auto'
    },
    inputBase: {
        display: 'none',
    },
    inputInput: {
        padding: '2px 10px',
        transition: 'width 2s',
        width: '100%',
        height: '40px'
    },
    searchBox: {
        display: 'flex',
        borderRadius: '2px',
        backgroundColor: '#f0f0f0',
            '&:hover': {
                backgroundColor: '#e8e8e8',
            },
    },
    closeIcon: {
        padding: '12px 12px 7px 7px',
        pointerEvents: 'none',
        color: '#999999',
    },
    menuBox: {
        borderRight: '1px solid lightgray',
        borderBottom: '1px solid lightgray',
        borderLeft: '1px solid lightgray',
        padding: '0 5px 0 5px',
    },
    menuItem: {
        padding: '5px 11px'
    }
};


class Searchbar extends Component {

    state = {
        lat: null,
        lng: null,
        hideResultsList: false,
    }
    
    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({lat: position.coords.latitude, lng: position.coords.longitude})
            })
        }
    }
    
    handleSearch = (e) => {
        const { latitude, longitude } = this.props.marker;
        const query = e.target.value;

        if (query.length > 2) {
            this.props.getGeoNameSuggest(query, latitude, longitude)
        }
        this.setState({
            hideResultsList: false
        })
    }

    handleClick = (name) => {
        const { latitude, longitude } = this.props.marker;
        const value = name.value;
        this.props.getGeoNameSearch(value, latitude, longitude)

        this.setState({
            hideResultsList: true //!this.state.hideResultsList
        })
    }
    
    
    render() {
        const { classes } = this.props;
        const names = get(this.props, "location.locDataSuggest.names", []);
        
        return (
            <div className={classes.root}>
                <div className={classes.searchBox}>
                    <InputBase
                        className={classes.inputInput}
                        type="search"
                        placeholder="Search …"
                        onChange={this.handleSearch}
                    />
                    <br />
                </div>

                {!this.state.hideResultsList && 
                    <div className={classes.menuBox}>
                        {names.map((name, index) => (
                            <MenuItem 
                                className={classes.menuItem}
                                key={index} 
                                onClick={this.handleClick.bind(this, name)}>
                                {name.value}
                            </MenuItem>
                        ))}
                    </div>
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    location: state.location,
    marker: state.app.marker

});

const mapDispatchToProps = (dispatch) => ({
    getGeoNameSuggest(name, lat, lng) {
        return dispatch(getGeoNameSuggest(name, lat, lng))
    },
    getGeoNameSearch(name, lat, lng) {
        return dispatch(getGeoNameSearch(name, lat, lng))
    }
})


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Searchbar));