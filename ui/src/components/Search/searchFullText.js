import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import SearchBar from './searchbar';


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
        const { classes } = this.props;

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
                <div className={classes.resultsContainer}>
                    <Typography className={classes.results}>
                        name <br />
                        address <br />
                        city, province, post_code <br />
                        phone (as link) <br />
                    </Typography>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(SearchFullText);
