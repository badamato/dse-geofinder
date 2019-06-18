import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { get, isEmpty, nth} from 'lodash';

import {getFilteredCategories} from '../../actions/actions'


const styles = {
    root: {
        padding: 0,
        height: '600px',
        overflow: 'auto'
    },
    categoriesContainer: {
        width: '80%',
        margin: '0 auto'
    },
    categoriesBox: {
        border: '1px solid lightgray',
        padding: '2px 10px',
        lineHeight: '24px',
        backgroundColor: '#f6f6f6',
        borderBottom: '1px',
        fontSize: '12px'
    },
    subcategoriesBox: {
        border: '1px solid lightgray',
        padding: '2px 40px',
        lineHeight: '24px',
        borderBottom: '1px',
        fontSize: '12px'
    },
};


class CategoryItem extends Component {

    handleClick = (category, subcategory) => {
        const {lllat, lllng, urlat, urlng } = this.props.bounds
        this.props.getFilteredCategories(lllat, lllng, urlat, urlng, category, subcategory)
    }


    render() {
        const { classes } = this.props;
        const categoriesAndSubCategoriesData = get(this.props, "allCategoryData.category,subcategory", []);
        // const objectsWithPivot = categoriesSubCategories.filter(obj => !!obj.pivot)

        return (
            <div className={classes.root}>

                {categoriesAndSubCategoriesData.map((category, index) => {
                    return (
                        <div key={index} className={classes.categoriesContainer}>
                            <div onClick={() => this.handleClick(category.value)}>
                                <Typography variant="subtitle1" className={classes.categoriesBox}>
                                    {category.value}:{" "}{category.count}
                                </Typography>
                            </div>
                                {category.pivot && category.pivot.map((sub, index) => {
                                    return (
                                        <div key={index} onClick={() => this.handleClick(category.value, sub.value)}>
                                            <Typography variant="subtitle1" className={classes.subcategoriesBox}>
                                                {sub.value}:{"  "}{sub.count}
                                            </Typography>
                                        </div>
                                    )
                                })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    allCategoryData: state.app.allCategoryData,
    filteredCategories: state.app.filteredCategories,
    bounds: state.app.bounds
});

const mapDispatchToProps = (dispatch) => ({
    getFilteredCategories: (lllat, lllng, urlat, urlng, category, subcategory) => {
        dispatch(getFilteredCategories(lllat, lllng, urlat, urlng, category, subcategory))
    }
})


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CategoryItem));
