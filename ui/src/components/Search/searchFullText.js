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
        overflow: 'scroll',
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
        const { classes, location } = this.props;
        const locationDatas = get(this.props, "location.locDataSearch.locations", []);
        let resultsFound = !isEmpty(locationDatas)
        let label, address, city, province, zip, phone;
        if (resultsFound){
            ({ label, address, city, province, zip, phone} = nth(locationDatas, 0));
        }
        // console.log(locationDatas)


        return (
            <div className={classes.root}>
                <SearchBar />
                {/* <div>
                    <Button variant="contained" color="primary" size="small" className={classes.button}>
                        Move User
                    </Button>
                    <br />
                </div> */}
                {
                    resultsFound
                    ? <div className={classes.resultsContainer}>
                        <hr className={classes.hr} />
                        <br />
                            <Typography variant="subtitle1" className={classes.resultsBox}>
                                {label}<br />
                                {address}<br />
                                {city}, {province} {' '} {zip}<br />
                                <a className={classes.a} href={"tel:" + this.props.phone} target="_blank">{phone}</a><br />
                                {/* {geo.lat}, {geo.lng} */}
                            </Typography>
                        </div>
                        : null
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
