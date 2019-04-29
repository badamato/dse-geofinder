import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Search from '../Search/search';


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: '50px 20px 30px 20px' }}>
            {props.children}
        </Typography>
    );
}

function LinkTab(props) {
    return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
    root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    },
});




class NavTabs extends Component {
    state = {
    value: 0,
    };

    handleChange = (event, value) => {
    this.setState({ value });
    };

render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
        <NoSsr>
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
                    <LinkTab label="Full-Text Search" href="page1" />
                    <LinkTab label="Catagory Search" href="page2" />
                </Tabs>
            </AppBar>
            {value === 0 && 
                <TabContainer component='div'>
                    <Search />
                </TabContainer>
            }

            {value === 1 && 
                <TabContainer component='div'>
                    Page 2
                </TabContainer>
            }
        </div>
        </NoSsr>
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
