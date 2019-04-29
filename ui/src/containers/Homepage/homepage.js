import React, {PureComponent} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Reactmap from '../../components/Reactmap/reactmap';
import Navtabs from '../../components/Navtabs/navtabs';
import secrets from '../../secrets/secrets';
import style from '../../style/style.css';



const styles = {
    mapContainer: {
        display: 'flex',
        position: 'absolute',
        top: '8px',
        marginBottom: '1%',
        marginLeft: '30.5%',
        width: '70%',
        minHeight: '800px',
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
        borderRadius: '20px',
        margin: '20px 110px 20px 0',
    }, 
    cqlText: {
        width: '15%',
        flex: '1',
        padding: '10px',
        margin: '40px 10px 40px 110px',
    }
}

const TOKEN = MapboxAccessToken;
const LONG = -84.386330;
const LAT = 33.753746;
const ZOOM = 12;


class HomePage extends PureComponent {

    render() {
        const { classes } = this.props;

        return (
        <div className='container'>
        <Grid container>
            <Paper className='search-paper'>
                <Navtabs />
            </Paper>

            <Paper className={classes.mapContainer} elevation={1}>
                <Reactmap className={classes.map}
                    token= { TOKEN }
                    longitude= { LONG }
                    latitude= { LAT }
                    zoom= { ZOOM }/>
            </Paper>

            <Grid item xs={12}>
                <Paper className={classes.cqlPaper} elevation={1}>
                    {/* <div className={classes.cqlText}> */}
                        <Typography variant="h5" className={classes.cqlText}>
                            Cassandra CQL Query
                        </Typography>
                    {/* </div> */}
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
