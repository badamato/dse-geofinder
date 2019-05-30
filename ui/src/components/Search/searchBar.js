import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
// import InputBase from '@material-ui/core/InputBase';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import { getGeoName } from '../../actions/actions';




function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                root: classes.inputRoot,
                input: classes.inputInput,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestionProps) {
    const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
            >
            {suggestion.label}
        </MenuItem>
    );
}

function getSuggestions(value, { showEmpty = false } = {}) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0 && !showEmpty
        ? []
        : suggestions.filter(suggestion => {
            const keep =
            count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
            count += 1;
            }

            return keep;
        });
}

/////////////////////////combo function - what do I need from this?!

let popperNode;

function DownshiftMultiple(props) {
    const { classes } = props;
    const [inputValue, setInputValue] = React.useState('');
    const [selectedItem, setSelectedItem] = React.useState([]);

    function handleKeyDown(event) {
        if (selectedItem.length && !inputValue.length && event.key === 'Backspace') {
        setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
        }
    }

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    function handleChange(item) {
        let newSelectedItem = [...selectedItem];
        if (newSelectedItem.indexOf(item) === -1) {
        newSelectedItem = [...newSelectedItem, item];
        }
        setInputValue('');
        setSelectedItem(newSelectedItem);
    }

    const handleDelete = item => () => {
        const newSelectedItem = [...selectedItem];
        newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
        setSelectedItem(newSelectedItem);
    };

    return (
        <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={handleChange}
        selectedItem={selectedItem}
        >
        {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue: inputValue2,
            selectedItem: selectedItem2,
            highlightedIndex,
        }) => (
            <div className={classes.container}>
            {renderInput({
                fullWidth: true,
                classes,
                InputProps: getInputProps({
                startAdornment: selectedItem.map(item => (
                    <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={handleDelete(item)}
                    />
                )),
                onChange: handleInputChange,
                onKeyDown: handleKeyDown,
                placeholder: 'Select multiple countries',
                }),
                label: 'Label',
            })}

            {isOpen ? (
                <Paper className={classes.paper} square>
                {getSuggestions(inputValue2).map((suggestion, index) =>
                    renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.label }),
                    highlightedIndex,
                    selectedItem: selectedItem2,
                    }),
                )}
                </Paper>
            ) : null}
            </div>
        )}
        </Downshift>
    );
}
///////////////////////end of combo function



const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing(2),
    },
}));


class SearchBar extends Component {

    // state = {
    //     lat: null,
    //     lng: null,
    // }
    
    // componentDidMount() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             this.setState({lat: position.coords.latitude, lng: position.coords.longitude})
    //         })
    //     }
    // }
    
    // search = (e) => {
    //     const { lat, lng } = this.state;
    //     const query = e.target.value;

    //     if (query.length > 2) {
    //         this.props.getGeoName(query, lat, lng)
    //     }
    // }

    render() {
        const classes = useStyles();
        // const { names } = (this.props.location.locData || {});

        return (
            <div>
                {/* <div className={classes.searchBox}>
                    <InputBase
                        placeholder="Type your search here…"
                        onChange={this.search}
                        className={classes.inputInput}/>
                        <br />
                </div> */}
                <Downshift id="downshift-popper">
                {({
                    getInputProps,
                    getItemProps,
                    getMenuProps,
                    highlightedIndex,
                    inputValue,
                    isOpen,
                    selectedItem,
                }) => (
                    <div className={classes.container}>
                    {renderInput({
                        fullWidth: true,
                        classes,
                        InputProps: getInputProps({
                        placeholder: 'Search...',
                        }),
                        ref: node => {
                        popperNode = node;
                        },
                    })}

                    <Popper open={isOpen} anchorEl={popperNode}>
                        <div {...(isOpen ? getMenuProps({}, { suppressRefError: true }) : {})}>
                        <Paper
                            square
                            style={{ marginTop: 8, width: popperNode ? popperNode.clientWidth : undefined }}
                        >
                            {getSuggestions(inputValue).map((suggestion, index) =>
                            renderSuggestion({
                                suggestion,
                                index,
                                itemProps: getItemProps({ item: suggestion.label }),
                                highlightedIndex,
                                selectedItem,
                            }),
                            )}
                        </Paper>
                        </div>
                    </Popper>
                    </div>
                )}
                </Downshift>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    location: state.location

});

const mapDispatchToProps = (dispatch) => ({
    getGeoName(name, lat, lng) {
        return dispatch(getGeoName(name, lat, lng))
    }
})


export default withStyles(connect(mapStateToProps, mapDispatchToProps)(SearchBar));
