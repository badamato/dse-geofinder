import React, {useState} from 'react';
// import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/styles';
// import { ThemeProvider } from '@material-ui/styles';
import get from "lodash/get";
import { FilledInput, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'

import { getGeoName } from '../../actions/actions';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: '5px',
        minWidth: '95%',
    },
    select: {

    },
    MenuItem: {

    }
});


export default function Searchbar() {
    const classes = useStyles()
    // const names = get(this.props, "location.locData.names", []);
    const [values, setValues] = React.useState({
        lat: null,
        lng: null,
        names: ''
    })
    const inputLabel = React.useRef(null);

    return (
        <form className={classes.root} autoComplete='on'>
            <FormControl variant='filled' className={classes.formControl}>
                <InputLabel ref={inputLabel}>Search ...</InputLabel>
                <Select
                    className={classes.select}
                    value={values.suggestions}
                    // onChange={search}
                    input={<FilledInput />}
                >
                    <MenuItem value='' className={classes.menuitem}>
                        <em>None</em>
                    </MenuItem>
                    {/* {names.map((name, index) => (
                        <MenuItem key={index}>{name.value}</MenuItem>
                    ))} */}
                </Select>
            </FormControl>
        </form>
    )
}