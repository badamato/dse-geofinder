import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import CategoryItem from './categoryitem';
import { amber } from '@material-ui/core/colors'
import { get } from 'lodash'


const styles = {
    root: {

    },
    categoriesContainer: {

    },
    filteredContainer: {
        height: '125px'
    },
    filteredText: {
        border: '1px solid lightgray',
        padding: '10px',
        lineHeight: '20px',
        backgroundColor: '#f6f6f6',
        width: '80%',
        margin: '0 auto', 
        fontSize: '15px'
    },
    hr: {
        width: '80%', 
        backgroundColor: 'darkgray',
        border: '1px solid darkgray',
        height: '1px',
        marginBottom: '40px'
    },
    a: {
        textDecoration: 'none',
        color: '#ca5f14'
    },
    button: {
        margin: '10px 0 30px 0',
        backgroundColor: '#ca5f14',
    }
};

class SearchCategories extends Component {

    render() {
        const { classes } = this.props;
        const locationsList = get(this.props, "filteredCategories.locations", [])

        return (
            <div className={classes.categoriesContainer}>
                <Button className={classes.button} size='small'>Remove Marker</Button>
                <br />
                <CategoryItem />
                <br />
                <hr className={classes.hr} />
                {locationsList.map((category, index) => {
                    return (
                        <div key={index} className={classes.filteredContainer}>
                            <Typography variant="subtitle1" className={classes.filteredText}>
                                {category.name}<br />
                                {category.address}<br />
                                {category.city}, {category.province}{" "}{category.zip}<br />
                                <a className={classes.a} href={"tel:" + this.props.phone} target="_blank">{category.phone}</a><br />
                            </Typography>
                        </div>
                    )
                })}
            </div>
        )
    }
}

//incoming from the store
const mapStateToProps = (state) => {
    return {
        location: state.location,
        filteredCategories:  state.app.filteredCategories
    }
}

//outgoing to store
const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SearchCategories));
