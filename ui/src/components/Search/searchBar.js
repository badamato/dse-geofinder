import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Input, MenuItem } from '@material-ui/core'
import get from "lodash/get";
import axios from 'axios';

import { getGeoNameSuggest, getGeoNameSearch } from '../../actions/actions';


const styles = {
    input: {
        display: 'none',
    },
    inputInput: {
        paddingTop: '2px',
        paddingRight: '2px',
        paddingBottom: '2px',
        paddingLeft: '20px',
        transition: 'width 2s',
        width: '100%',
        height: '45px'
    },
    searchBox: {
        display: 'flex',
        borderRadius: '2px',
        backgroundColor: '#e5e5e5',
            '&:hover': {
                backgroundColor: '#c0c0c0',
            },
    },
    menuBox: {
        borderRight: '1px solid lightgray',
        borderBottom: '1px solid lightgray',
        borderLeft: '1px solid lightgray',
        paddingRight: '5px',
        paddingLeft: '5px',
    }
};


class Searchbar extends Component {

    state = {
        lat: null,
        lng: null,
        isHidden: true

    }
    
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
            this.props.getGeoNameSuggest(query, lat, lng)
        }
    }

    handleClick = (name) => {
        const { lat, lng } = this.state;
        const value = name.value;

        this.props.getGeoNameSearch(value, lat, lng)
    }

    toggleHidden = () => {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    render() {
        const { classes } = this.props;
        const names = get(this.props, "location.locDataSuggest.names", []);
        const searchGeoNames = get(this.props, "location.locDataSearch.locations", []);
        console.log(searchGeoNames)

        return (
            <div>
                <div className={classes.searchBox}>
                    <Input
                        placeholder="Search …"
                        onChange={this.search}
                        className={classes.inputInput}/>
                        <br />
                </div>
                <div className={classes.menuBox}>
                    {names.map((name, index) => (
                        <MenuItem key={index} onClick={this.handleClick.bind(this, name)}>{name.value}</MenuItem>
                    ))}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    location: state.location

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