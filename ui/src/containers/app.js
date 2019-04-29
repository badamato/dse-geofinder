//React/Redux
import {connect} from 'react-redux';
import React, { Component } from 'react'

//MUI
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//components
import HomePage from './Homepage/homepage';
import MenuContainer from './Menu/menu';

const theme = createMuiTheme({
    palette: {
        primary: {
        main: '#1AB5E0',
        },
        secondary: {
        main: '#ca5f14',
        },
    },
    typography: {
        useNextVariants: true,
    },
});

class App extends Component {
    render() {
        theme.palette.primary.main = this.props.app.primaryColor;
    return (
        <MuiThemeProvider theme={theme}>
            <Grid>
                <MenuContainer/>
                <Grid className="basepage">
                {
                    this.props.NavigationReducer.page === 'Home' ?
                    <HomePage/>
                    :
                    null
                }
                </Grid>
            </Grid>
        </MuiThemeProvider>
        );
    }
}


const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps)(App);
