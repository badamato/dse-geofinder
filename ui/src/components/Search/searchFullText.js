import React, {Component} from 'react';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
import SearchBar from './searchbar';


const styles = {
    root: {

    },
    // button: {
    //     margin: '15px',
    // },
    divider: {
        margin: 0,
    },
    resultsContainer: {
        marginTop: '10px',
        padding: '10px',
        height: '720px',
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
                <br />
                <div className={classes.resultsContainer}>
                    <Typography className={classes.results}>
                        {this.props.location.locData.names}
                    </Typography>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(SearchFullText);
