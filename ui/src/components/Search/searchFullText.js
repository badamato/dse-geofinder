import React, {Component} from 'react';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { getGeoName } from '../../actions/actions';
import SearchBar from './searchBar';


const styles = {
    root: {

    },
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
                <Divider variant="middle" className={classes.divider} />
                <br/>
                <div className={classes.resultsContainer}>
                    <Typography className={classes.results}>
                        **put results here
                        **put results here
                        **put results here
                        **put results here
                        **put results here
                        **put results here

                    </Typography>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(SearchFullText);
