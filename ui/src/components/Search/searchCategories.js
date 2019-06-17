import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CategoryItem from './categoryitem';


const styles = {
    root: {

    },
    categoriesContainer: {

    },
    hr: {
        width: '80%', 
        backgroundColor: 'darkgray',
        border: '1px solid darkgray',
        height: '1px',
        marginBottom: '30px'
    },
    a: {
        textDecoration: 'none',
        color: '#ca5f14'
    }
};

class SearchCategories extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.categoriesContainer}>
                <CategoryItem />
                <br />
                <hr className={classes.hr} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.location
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SearchCategories));
