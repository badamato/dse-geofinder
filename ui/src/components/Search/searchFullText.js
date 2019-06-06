import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
import SearchBar from './searchbar';


const styles = {
    root: {

    },
    // button: {
    //     margin: '15px',
    // },
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
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <SearchBar />
                <div>
                    {/* <Button variant="contained" color="primary" size="small" className={classes.button}>
                        Move Marker Location
                    </Button> */}
                </div>
                <br />
                <hr style={{width: '80%', backgroundColor: 'darkgray', height: '1px'}} />
                <div className={classes.resultsContainer}>
                    <Typography className={classes.results}>
                        **RESULTS HERE**
                        **RESULTS HERE**
                        **RESULTS HERE**
                        **RESULTS HERE**
                        **RESULTS HERE**
                    </Typography>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(SearchFullText);
