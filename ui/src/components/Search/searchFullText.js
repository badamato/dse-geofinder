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
        marginTop: '10px',
        padding: '10px',
        maxHeight: '700px',
        overflow: 'scroll',
    },
    results: {
        border: '1px solid green', 
    }
};

class SearchFullText extends Component {

    render() {
        console.log(isEmpty)
        const { classes, location } = this.props;
        console.log('This is my PROPS:', this.props)
        // const names = get(this.props, "location.locDataSuggest.names", []);

        const locationDatas = get(this.props, "location.locDataSearch.locations", []);

        console.log("!LOCATION IS:")
        console.log(size(locationDatas))

        console.log('This is locationDatas stuff:', isEmpty(locationDatas))
        let resultsFound = !isEmpty(locationDatas)
        // if (!resultsFound) {
        //     return null;
        // }
        
        console.log(nth(locationDatas, 0))
        console.log("NAME AND ADDRESS IS:")

        let name, address;
        if (resultsFound){
            ( { name, address } = nth(locationDatas, 0) );
        }
        console.log(name)
        console.log(address)

        console.log("RESULTS FOUND: ", resultsFound)


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
                            <Typography className={classes.results}>
                                {name}<br />
                                {address}<br />
                                city, province, post_code <br />
                                phone (as link) <br />
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
