import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import SearchBar from './searchbar';
import { get, isEmpty, nth} from 'lodash'


const styles = {
    root: {
        padding: 0
    },
    resultsContainer: {
        height: '125px'
    },
    resultsText: {
        border: '1px solid lightgray',
        padding: '10px',
        lineHeight: '20px',
        backgroundColor: '#f6f6f6',
        width: '80%',
        margin: '0 auto', 
    },
    hr: {
        width: '80%', 
        backgroundColor: 'darkgray',
        border: '1px solid darkgray',
        height: '1px',
        marginBottom: '30px'
    },
    a: {
        textDecoration: 'none',
        color: '#ca5f14'
    }
};

class SearchFullText extends Component {

    render() {
        const { classes } = this.props;
        const locationDatas = get(this.props, "location.locDataSearch.locations", []);

        return (
            <div>
                <SearchBar />
                <hr className={classes.hr} />
                    {locationDatas.map((location, index) => {
                        return (
                            <div key={index} className={classes.resultsContainer}>
                                    <Typography variant="subtitle1" className={classes.resultsText}>
                                        {location.label}<br />
                                        {location.address}<br />
                                        {location.city}, {location.province} {' '} {location.zip}<br />
                                        <a className={classes.a} href={"tel:" + this.props.phone} target="_blank">{location.phone}</a><br />
                                    </Typography>
                            </div>
                        )
                    })}
            </div>
        )
        
    }
}


const mapStateToProps = (state) => {
    return {
        location: state.location
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SearchFullText));
