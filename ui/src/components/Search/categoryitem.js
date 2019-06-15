import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { getAllCategories } from '../../actions/actions';


const styles = {
    root: {

    },
    categoriesBox: {

    }
};

class CategoryItem extends Component {
    
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.categoriesBox}>
                    <Typography variant="subtitle1">
                        **CATEGORIES HERE**
                    </Typography>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({


});

const mapDispatchToProps = (dispatch) => ({

})


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CategoryItem));
