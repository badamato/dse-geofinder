import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/InsertChart';
import HomeIcon from '@material-ui/icons/Home';
import GraphIcon from '@material-ui/icons/ScatterPlot';
import AdminIcon from '@material-ui/icons/MyLocation';
import BrushIcon from '@material-ui/icons/Brush';

import {drawerToggle, changeScreen} from '../actions/NavigationActions'

const drawerWidth = 240;

const styles = theme => ({
    
root: {
    width: '100%',
    display: 'flex',
},
grow: {
    flexGrow: 1,
},
appBar: {
    // zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    }),
},
appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
    }),
},
menuButton: {
    marginLeft: -12,
    marginRight: 20,
},
title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
    display: 'block',
    },
},
hide: {
    display: 'none',
},
drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
},
drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
    }),
},
drawerClose: {
    transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
    width: theme.spacing.unit * 9 + 1,
    },
},
toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
},
content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
},
logo: {
    flex: 1,
    margin: 0,
},
title: {
    flex: 1,
    textAlign: 'right',
    color: 'white',
},
subtitle: {
    marginBottom: '10px',
},
// search: {
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     '&:hover': {
//         backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     marginLeft: 0,
//     width: '100%',
//         [theme.breakpoints.up('sm')]: {
//             marginLeft: theme.spacing.unit,
//             width: 'auto',
//         },
//     },
// searchIcon: {
//     width: theme.spacing.unit * 9,
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     },
// inputRoot: {
//     color: 'inherit',
//     width: '100%',
//     },
// inputInput: {
//     paddingTop: theme.spacing.unit,
//     paddingRight: theme.spacing.unit,
//     paddingBottom: theme.spacing.unit,
//     paddingLeft: theme.spacing.unit * 10,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//         [theme.breakpoints.up('sm')]: {
//             width: 120,
//             '&:focus': {
//             width: 200,
//             },
//         },
//     },
});

class Menu extends React.Component{

componentDidMount(){
    this.props.init()
}

render(){
    const {classes} = this.props;

return(
    <div className={classes.root}>
    <AppBar position="static">
        <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <MenuIcon />
        </IconButton>
        <div style={{height: "60px"}} className={classes.logo}>
                        <img style={{height: '57px', marginLeft: "20px"}} src={require('../../img/logo.png')} />
                    </div>
        <Typography className={classes.title} variant="h4" color="inherit" noWrap>
            {this.props.appName}
        </Typography>
        {/* <div className={classes.grow} />
        <div className={classes.search}>
            <div className={classes.searchIcon}>
            <SearchIcon />
            </div>
            <InputBase
            placeholder="Search…"
            //value={ this.props.currentTransaction }
            //onChange={(e) => this.props.updateCurrentTransaction("currentTransaction", e.target.value) }
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
            />
        </div> */}
        </Toolbar>
    </AppBar>
    
    <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
        [classes.drawerOpen]: this.props.drawerOpen,
        [classes.drawerClose]: !this.props.drawerOpen,
        })}
        classes={{
        paper: classNames({
            [classes.drawerOpen]: this.props.drawerOpen,
            [classes.drawerClose]: !this.props.drawerOpen,
        }),
        }}
        open={this.props.drawerOpen}
    >
        <div className={classes.toolbar}>
        <IconButton onClick={() => { this.props.drawerToggle(!this.props.drawerOpen)}}>
            { !this.props.drawerOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
        </div>
        <Divider />
        <List>
        {['Home', 'Dashboard'].map((text, index) => (
            <ListItem button key={text} onClick={(e) => { this.props.changeScreen(text)}}>
            <ListItemIcon>
                {index === 0 ? <HomeIcon /> : index === 1 ? <DashboardIcon /> : <GraphIcon/>}
            </ListItemIcon>
            <ListItemText primary={text} />
            </ListItem>
        ))}
        </List>
        <Divider />
        <List>
        {['Admin'].map((text, index) => (
            <ListItem button key={text} onClick={(e) => { this.props.changeScreen(text)}}>
            <ListItemIcon>
                {index === 0 ? <AdminIcon /> : <BrushIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
            </ListItem>
        ))}
        </List>
    </Drawer>
    </div>
    );
}

}

const mapStateToProps = (state, ownProps) => {
    return {
        drawerOpen: state.NavigationReducer.drawerOpen,
        page: state.NavigationReducer.page,
        appName: state.app.appName,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        init: () => {
        },
        drawerToggle: (drawerOpen) => {
        dispatch(drawerToggle(drawerOpen))
        },
        updateCurrentTransaction: (key, value) => {
        dispatch(updateControlValue(key, value))
        dispatch(refreshNeighborhood())
        },
        changeScreen: (page) => {
        dispatch(changeScreen(page))
        dispatch(drawerToggle(false))
        }
    }
}


const MenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Menu))
export default MenuContainer