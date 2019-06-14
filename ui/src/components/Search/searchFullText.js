import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import SearchBar from './searchbar';
import { get, isEmpty, nth} from 'lodash'


const styles = {
    root: {

    },
    button: {
        margin: '15px 15px 15px 0',
    },
    resultsContainer: {
        marginTop: '20px',
        height: '170px',
        overflow: 'auto',
    },
    resultsBox: {
        border: '1px solid lightgray',
        padding: '10px',
        lineHeight: '24px',
        backgroundColor: '#f6f6f6'
    },
    hr: {
        width: '80%', 
        backgroundColor: 'darkgray',
        border: '1px solid darkgray',
        height: '1px'
    },
    a: {
        textDecoration: 'none'
    }
};

class SearchFullText extends Component {

    render() {
        const { classes } = this.props;
        const locationDatas = get(this.props, "location.locDataSearch.locations", []);
        let resultsFound = !isEmpty(locationDatas)
        let label, address, city, province, zip, phone;
        if (resultsFound){
            ({ label, address, city, province, zip, phone} = nth(locationDatas, 0));
        }


        return (
            <div className={classes.root}>
                <SearchBar />
                {
                    locationDatas.map((location, index) => {
                        ({ label, address, city, province, zip, phone} = location);
                        return (
                            <div key={index} className={classes.resultsContainer}>
                                <hr className={classes.hr} />
                                <br />
                                    <Typography variant="subtitle1" className={classes.resultsBox}>
                                        {label}<br />
                                        {address}<br />
                                        {city}, {province} {' '} {zip}<br />
                                        <a className={classes.a} href={"tel:" + this.props.phone} target="_blank">{phone}</a><br />
                                    </Typography>
                            </div>
                        )
                    })
                }
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
