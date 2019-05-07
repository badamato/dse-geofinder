import React, {Component} from 'react';
import {connect} from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import { getGeoName } from '../../actions/actions';


const styles = {
    button: {
        margin: '15px',
    },
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
                /* [theme.breakpoints.up('sm')]: {
                    width: 120,
                    '&:focus': {
                    width: 200,
                    },
                }, */
    },
    search: {
        display: 'flex',
        borderRadius: '2px',
        backgroundColor: '#e5e5e5e5',
            '&:hover': {
                backgroundColor: '#c0c0c0',
            },
    },
    searchIcon: {
        marginTop: '6px',
        marginLeft: '5%',
        pointerEvents: 'none',
        color: '#999999',
    },
    divider: {
        margin: 0,
    },
    resultsContainer: {
        border: '1px solid red',
        padding: '10px',
        height: '640px',
        overflow: 'scroll',
    },
    results: {

    }
};

class SearchFullText extends Component {

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
        console.log(this.props)

        return (
            <div className={classes.root}>
                <div className={classes.search}>
                    <InputBase
                        placeholder="Search…"
                        //value={ this.props.currentTransaction }
                        //onChange={(e) => this.props.updateCurrentTransaction("currentTransaction", e.target.value) }
                        onChange = {this.search}
                        className={classes.inputInput}/>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                </div>
                <div>
                    <Button variant="contained" color="primary" size="small" className={classes.button}>
                        GO
                    </Button>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id=""
                        multiple
                        type="file" 
                        />
                </div>
                <Divider variant="middle" className={classes.divider} />
                <br/>
                <div className={classes.resultsContainer}>
                    <Typography className={classes.results}>
                        ***Put results here
                        ***Put results here
                        ***Put results here
                    </Typography>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    location: state.app.locData,

});

const mapDispatchToProps = (dispatch) => ({
    getGeoName(name, lat, lng) {
        return dispatch(getGeoName(name, lat, lng))
    }
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SearchFullText));
