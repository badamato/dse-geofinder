import React, {Component} from 'react';
import {connect} from 'react-redux';
import Downshift from 'downshift';

import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
// import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { getGeoName } from '../../actions/actions';


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
        marginTop: '10px',
        padding: '10px',
        height: '720px',
        overflow: 'scroll',
    },
    results: {
        border: '1px solid green',
    }
};

class SearchFullText extends Component {

    state = {
        lat: null,
        lng: null,
        names: [],
    }
    
    //built in formula for getting users current location - at init
    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({lat: position.coords.latitude, lng: position.coords.longitude})
            })
        }
    }
    
    search = (e) => {
        const { lat, lng } = this.state;
        const query = e.target.value;

        if (query.length > 2) {
            this.props.getGeoName(query, lat, lng)
        }
        debugger
    }

    // downshiftOnChange(selectedName) {
    //     alert(`your selection is ${selectedName.name}`)
    // }

    render() {
        const { classes } = this.props;
        const { names } = (this.props.locData || {});
        console.log(names)


        return (
            <div className={classes.root}>
                <Downshift
                    // onChange={downshiftOnChange}
                    // itemToString={item => (item ? item.names : '')} 
                >
                {({
                    selectedItem,
                    getInputProps,
                    getItemProps,
                    highlightedIndex,
                    isOpen,
                    inputValue,
                }) => (
                    <div className={classes.search}>
                        <InputBase
                            {...getInputProps({
                                placeholder: "Type your search here…",
                                onChange: this.search,
                                className: classes.inputInput,
                            })}
                        />
                        {isOpen ? (
                            <div className='downshift-dropdown'>
                                {[names].filter(
                                    item =>
                                    !inputValue || 
                                    item.names
                                    .toLowerCase()
                                    .includes(inputValue.toLowerCase())
                                )
                                .slice(0, 10)
                                .map((item, index) => (
                                    <div
                                        className='dropdown-item'
                                        {...getItemProps({ key: index, index, item })}
                                        style={{
                                            backgroundColor:
                                                highlightedIndex === index ? 'lightgray' : 'white',
                                            fontWeight: 
                                                selectedItem === item ? 'bold' : 'normal'
                                        }}>
                                        {item.names}
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>
                )}
                </Downshift>
                <Divider variant="middle" className={classes.divider} />
                <br/>
                <div className={classes.resultsContainer}>
                    {/* {names.map ((name, id) => {
                        return (
                            <div>
                                <Typography className={classes.results}>
                                    {name.names}
                                </Typography>
                            </div>
                        )
                    })} */}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    locData: state.app.locData,

});

const mapDispatchToProps = (dispatch) => ({
    getGeoName(name, lat, lng) {
        return dispatch(getGeoName(name, lat, lng))
    }
})


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SearchFullText));
