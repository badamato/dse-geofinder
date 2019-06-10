import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import SearchBar from './searchbar';
import { get, isEmpty, nth, size } from 'lodash'


const styles = {
    root: {

    },
    button: {
        margin: '15px',
    },
    resultsContainer: {
        marginTop: '20px',
        height: '120px',
        overflow: 'scroll',
    },
    results: {
        border: '1px solid lightgray',
        padding: '10px',
        lineHeight: '24px',
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
            ( { label, address, city, province, zip, phone } = nth(locationDatas, 0) );
        }


        return (
            <div className={classes.root}>
                <SearchBar />
                <div>
                    <Button variant="contained" color="primary" size="small" className={classes.button}>
                        Move User
                    </Button>
                </div>
                <br />
                <hr style={{width: '80%', backgroundColor: 'darkgray', height: '1px'}} />
                {
                    resultsFound
                        ? <div className={classes.resultsContainer}>
                            <Typography variant="subtitle1" className={classes.results}>
                                {label}<br />
                                {address}<br />
                                {city}, {province} {' '} {zip}<br />
                                <a className={classes.a} href={"tel:" + this.props.phone} target="_blank">{phone}</a><br />
                            </Typography>
                        </div>
                        : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    location: state.location
    
});

// const mapStateToProps = (state) => {
//     console.log(state.location);
//     return {
//         location: state.location
//     };
// };

export default withStyles(styles)(connect(mapStateToProps, null)(SearchFullText));
