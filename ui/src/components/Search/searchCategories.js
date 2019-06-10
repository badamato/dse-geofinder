import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const styles = {
    root: {

    },
    categoriesContainer: {

    },
    hr: {

    },
    categoriesBox: {

    }
};

class SearchCategories extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.categoriesContainer}>
                <hr className={classes.hr} />
                <br />
                    <Typography variant="subtitle1" className={classes.categoriesBox}>
                        **CATEGORIES HERE**
                        **CATEGORIES HERE**
                        **CATEGORIES HERE**
                        **CATEGORIES HERE**
                    </Typography>
            </div>
        )
    }
}

export default withStyles(styles)(SearchCategories);
