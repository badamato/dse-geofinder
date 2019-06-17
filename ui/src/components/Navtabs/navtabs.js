import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FindInPage from '@material-ui/icons/FindInPage';
import ViewList from '@material-ui/icons/ViewList';

import SearchFullText from '../Search/searchfulltext';
import SearchCategories from '../Search/searchcategories';



const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabContainer: {
        padding: '40px 20px 30px 20px'
    }
});




class NavTabs extends Component {
    state = {
        value: 0,
    };


    handleChange = (event, value) => {
        event = event.preventDefault();
        this.setState({ value });
    };

    // resetMap = (event) => {
    //     const refresh = event.map.()
    // }

render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
                    <Tab label="Full-Text Search" icon={<FindInPage />} />
                    <Tab label="Category Search" icon={<ViewList />} />
                </Tabs>
            </AppBar>
            {value === 0 && 
                <div className={classes.tabContainer}>
                    <SearchFullText />
                </div>
            }
            {value === 1 && 
                <div className={classes.tabContainer}>
                    <SearchCategories />
                </div>
            }
        </div>
    );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        init: () => {
        },
    }
}

const NavTabsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(NavTabs))
export default NavTabsContainer;
