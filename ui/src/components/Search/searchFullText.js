import React, {Component} from 'react';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';


const styles = {
    button: {
        margin: '15px',
    },
    input: {
        display: 'none',
    },
    inputInput: {
            paddingTop: '2px',
            paddingRight: '2px',
            paddingBottom: '2px',
            paddingLeft: '30px',
            transition: 'width 2s',
            width: '80%',
                /* [theme.breakpoints.up('sm')]: {
                    width: 120,
                    '&:focus': {
                    width: 200,
                    },
                }, */
    },
    search: {
        display: 'flex',
        borderRadius: '2px',
        backgroundColor: '#e5e5e5e5',
            '&:hover': {
                backgroundColor: '#c0c0c0',
            },
    },
    searchIcon: {
        marginTop: '6px',
        marginLeft: '5%',
        pointerEvents: 'none',
        color: '#999999',
    },
    divider: {
        margin: 0,
    },
    resultsContainer: {
        border: '1px solid red',
        padding: '10px',
        height: '640px',
        overflow: 'scroll',
    },
    results: {

    }

};

class SearchFullText extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.search}>
                    <InputBase
                        placeholder="Search…"
                        //value={ this.props.currentTransaction }
                        //onChange={(e) => this.props.updateCurrentTransaction("currentTransaction", e.target.value) }
                        className={classes.inputInput}/>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                </div>
                <div>
                    <Button variant="contained" color="primary" size="small" className={classes.button}>
                        GO
                    </Button>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id=""
                        multiple
                        type="file"/>
                </div>
                <Divider variant="middle" className={classes.divider} />
                <br/>
                <div className={classes.resultsContainer}>
                    <Typography className={classes.results}>
                        ***Put results here
                        ***Put results here
                        ***Put results here
                    </Typography>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(SearchFullText);
