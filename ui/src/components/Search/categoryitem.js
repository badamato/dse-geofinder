import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { get, isEmpty, nth} from 'lodash';

import {getFilteredCategories} from '../../actions/actions'


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
        backgroundColor: '#f6f6f6',
        borderBottom: '1px',
        fontSize: '12px'
    },
    subcategoriesBox: {
        border: '1px solid lightgray',
        padding: '2px 30px',
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
        const categoriesSubCategories = get(this.props, "allCategoryData.category,subcategory", []);

        let categoriesFound = !isEmpty(categoriesSubCategories) //boolean saying there is something found to return
        let field, value, count, pivot;
        if (categoriesFound){
            ({ field, value, count, pivot: [] } = nth(categoriesSubCategories, 1));
        }

        return (
            <div className={classes.root}>
                {categoriesSubCategories.map((category, index) => {
                    ({ field, value, count, pivot } = category);
                    return (
                        <div key={index} className={classes.categoriesContainer}>
                            <div onClick={() => this.handleClick(category.value)}>
                                <Typography variant="subtitle1" className={classes.categoriesBox}>
                                    {category.value}:{" "}{category.count}
                                </Typography>
                            </div>
                            {category.pivot &&
                                <div onClick={() => this.handleClick(category.value, category.pivot[0].value)}>
                                    <Typography variant="subtitle1" className={classes.subcategoriesBox}>
                                        {category.pivot[0].value}:{"  "}{category.pivot[0].count}
                                    </Typography>
                                </div>
                            }
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
