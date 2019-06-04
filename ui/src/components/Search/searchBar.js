import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import get from "lodash/get";

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
        width: '90%',
    },
    searchBox: {
        display: 'flex',
        borderRadius: '2px',
        backgroundColor: '#e5e5e5',
            '&:hover': {
                backgroundColor: '#c0c0c0',
            },
    }
};


class Searchbar extends Component {

    state = {
        lat: null,
        lng: null
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
            this.props.getGeoName(query, lat, lng)
        }
    }

    

    render() {
        const { classes } = this.props;
        const names = get(this.props, "location.locData.names", []);
        console.log(this.props)
    

        return (
            <div>
                <div className={classes.searchBox}>
                    <Input
                        placeholder="Search …"
                        onChange={this.search}
                        className={classes.inputInput}/>
                        <br />
                </div>
                <Menu>
                    {names.map((name, index) => (
                        <MenuItem key={index}>{name.value}</MenuItem>
                    ))}
                </Menu>
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


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Searchbar));