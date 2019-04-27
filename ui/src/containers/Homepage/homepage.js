import React, {PureComponent} from 'react';
import { FormHelperText } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Reactmap from '../../components/Reactmap/reactmap';
import secrets from '../../secrets/secrets'

import style from '../../style/style.css';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    mapContainer: {
        display: 'flex',
        position: 'absolute',
        top: '8px',
        marginBottom: '1%',
        marginLeft: '30.5%',
        width: '70%',
        minHeight: '800px',
    },
    map: {
        width: '100%',
    
    },
    cqlPaper: {
        display: 'flex',
        position: 'absolute',
        top: '820px',
        marginBottom: '2%',
        marginLeft: '30.5%',
        width: '70%',
        minHeight: '150px',
    },
    cqlField: {
        backgroundColor: '#e5e5e5',
        width: '80%',
        margin: '20px 30px 20px 120px',
    }
});

const TOKEN = MapboxAccessToken;
// const TOKEN = 'pk.eyJ1IjoiYmFkYW1hdG8iLCJhIjoiY2p1anZ6YTVkMXBzZTQ0dWpheGF4ODF6dyJ9.KglfXQnMkcHnkKPyr-ZkXw';
const LONG = -84.386330;
const LAT = 33.753746;
const ZOOM = 12;
// const STYLE_ID = ""


class HomePage extends PureComponent {

    render() {
        const { classes } = this.props;

        return (
        <div className='container'>
        <Grid container>
            <Paper className='search-paper'>
                <div style={{marginTop: "6px"}} className='searchIcon'>
                    <SearchIcon />
                </div>
                <div className='search'>
                <InputBase
                    placeholder="Search…"
                    //value={ this.props.currentTransaction }
                    //onChange={(e) => this.props.updateCurrentTransaction("currentTransaction", e.target.value) }
                    className='inputInput'
                />
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
                        type="file"
                    />
                </div>
                <br />
                <Divider variant="middle" />
            </Paper>
                
                <Paper className={classes.mapContainer} elevation={1}>
                <Reactmap className={classes.map}
                    token= { TOKEN }
                    longitude= { LONG }
                    latitude= { LAT }
                    zoom= { ZOOM }
                    // styleID= { STYLE_ID }
                    />
                </Paper>

            <Grid item xs={12}>
                <Paper className={classes.cqlPaper} elevation={1}>
                    <div>
                    <Typography variant="h5" gutterBottom>
                        Cassandra CQL Query
                    </Typography>
                    </div>
                    <div className={classes.cqlField}>

                    </div>
                </Paper>
            </Grid>
        </Grid>
        </div>
        );
    }
}


export default withStyles(styles)(HomePage);
