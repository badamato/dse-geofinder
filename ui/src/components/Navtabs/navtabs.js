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
import { resetMap, getAllCategories } from '../../actions/actions';


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabContainer: {
        padding: '15px 20px 30px 20px'
    }
});


class NavTabs extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        const { resetMap } = this.props;
        const {lllat, lllng, urlat, urlng } = this.props.bounds

        resetMap()
        this.props.getAllCategories(lllat, lllng, urlat, urlng);
        event = event.preventDefault();
        this.setState({ value });
    };

    
render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <div>
                <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
                    <Tab label="Full-Text Search" icon={<FindInPage />} />
                    <Tab label="Category Search" icon={<ViewList />} />
                </Tabs>

                </div>
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
        bounds: state.app.bounds
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        resetMap: () => {
            dispatch(resetMap())
        },
        getAllCategories: (lllat, lllng, urlat, urlng) => {
            dispatch(getAllCategories(lllat, lllng, urlat, urlng))
        }
    }
}

const NavTabsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(NavTabs))
export default NavTabsContainer;
