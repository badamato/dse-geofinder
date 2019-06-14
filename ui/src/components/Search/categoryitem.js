import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class CategoryItem extends Component {
    render() {
        return (
            <div>
                    <Typography variant="subtitle1" className={classes.categoriesBox}>
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
