import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { get, isEmpty, nth} from 'lodash'

import { getAllCategories } from '../../actions/actions';


const styles = {
    root: {
        padding: 0
    },
    categoriesContainer: {
        width: '80%',
        margin: '0 auto'
    },
    categoriesBox: {
        border: '1px solid lightgray',
        padding: '2px 10px',
        lineHeight: '24px',
        backgroundColor: '#f6f6f6'
    },
};


class CategoryItem extends Component {
    
    render() {
        const { classes } = this.props;
        const categoriesSubCategories = get(this.props, "allCategoryData.category,subcategory", []);
        let categoriesFound = !isEmpty(categoriesSubCategories)
        let field, value, count, pivot;
        if (categoriesFound){
            ({ field, value, count, pivot } = nth(categoriesSubCategories, 0));

        }


        return (
            <div className={classes.root}>
                    {categoriesSubCategories.map((category, index) => {
                        ({ field, value, count, pivot } = category);
                        console.log(category)
                        return (
                            <div key={index} className={classes.categoriesContainer}>
                                    <Typography variant="subtitle1" className={classes.categoriesBox}>
                                        {value}:{" "}{count}
                                    </Typography>
                            </div>
                        )
                    })}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    allCategoryData: state.app.allCategoryData

});

const mapDispatchToProps = (dispatch) => ({

})


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CategoryItem));
