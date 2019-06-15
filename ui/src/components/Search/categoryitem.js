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

    _componentDidMount = () => {

        let mapGL = this.mapRef._getMap();
        let bounds = mapGL.getBounds();
        let getMapBoundaries = () => ({
            lllat: bounds._sw.lat,
            lllng: bounds._sw.lng,
            urlat: bounds._ne.lat,
            urlng: bounds._ne.lng
        })
        console.log(lllat)
    }

    _onViewportChange = viewport => {
        this.setState({viewport});
    };

    
    render() {
        const { classes } = this.props;
        const { latitude, longitude } = this.props.marker;
        const { zoom } = this.props.viewport;



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
    marker: state.app.marker,
    viewport: state.app.viewport,
    allCategoryData: state.app.allCategoryData

});

const mapDispatchToProps = (dispatch) => ({

})


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CategoryItem));
