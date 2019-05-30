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
    const { InputProps,  ref, ...other } = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
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


class SearchBar extends Component {

    render() {

        let isOpen = false;
        let selectedItem = [];

      return (
        <div>
        <Downshift id="downshift-popper">
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          selectedItem: selectedItem2,
          highlightedIndex,
        }) => (
          <div >
          {renderInput({
            fullWidth: true,
            InputProps: getInputProps({
              startAdornment: selectedItem.map(item => (
                <Chip
                key={item}
                tabIndex={-1}
                label={item}
                onDelete={handleDelete(item)}
                />
              )),
              onChange: (event) => { console.log(event.target.value)} ,
              //onKeyDown: handleKeyDown,
              placeholder: 'Select multiple countries',
            }),
            label: 'Label',
          })}

          <div >
          <Popper open={isOpen}  >
          <Paper square>
          </Paper>
          </Popper>
          </div>
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

const SearchBarContainer= connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)

export default SearchBarContainer;
