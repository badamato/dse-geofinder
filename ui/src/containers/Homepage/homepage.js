import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Reactmap from '../../components/Map/reactmap'
import Navtabs from '../../components/Navtabs/navtabs';
import secrets from '../../secrets/secrets';
// import style from '../../style/style.css';


const styles = {
    container: {
        padding: '.5%',
        position: 'relative',
        minHeight: '90vh',
        backgroundColor: '#f8f8f8',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right top',
    },
    searchPaper: {
        padding: '50px 10px 0 10px',
        marginBottom: '2%',
        width: '29%',
        minHeight: '925px',
        maxHeight: '925px',
        overflow: 'auto'
    },
    mapPaper: {
        display: 'flex',
        position: 'absolute',
        top: '8px',
        marginBottom: '1%',
        marginLeft: '30.5%',
        width: '70%',
        minHeight: '710px',
        border: '2px solid lightgray'
    },
    cqlPaper: {
        display: 'flex',
        position: 'absolute',
        top: '735px',
        marginLeft: '30.5%',
        width: '70%',
        minHeight: '230px',
        maxHeight: '230px',
        padding: '10px'
    },
    cqlContainer: {
        width: '100%',
        minHeight: '220px',
        maxHeight: '220px',
        margin:  '0 40px 0 10px',
        padding: '10px',
        overflow: 'auto'
    },
    cqlTitle: {
        paddingBottom: '5px',
    },
    cqlSection: {
        display: 'flex',
        margin: '0 auto',
        textAlign: 'left',
        lineHeight: '24px'
    },
    queryText: {
        margin: '5px',
    },
    span: {
        margin: '5px',
        display: "flex", 
        color: "#ca5f14", 
        fontStyle: "italic"
    },
}


class HomePage extends PureComponent {
    
    render() {
        const { classes } = this.props;
        const { query: querySuggest } = (this.props.locDataSuggest || {});
        const { query: querySearch } = (this.props.locDataSearch || {});
        
        return (
        <div className={classes.container}>
        <Grid container>
            <Paper className={classes.searchPaper} elevation={1}>
                <Navtabs />
            </Paper>

            <Paper className={classes.mapPaper} elevation={4}>
                <Reactmap />
            </Paper>

            <Grid item xs={12}>
                <Paper className={classes.cqlPaper} elevation={1}>
                    <div className={classes.cqlContainer}>
                        <Typography variant="h5" className={classes.cqlTitle}>Queries</Typography>
                        <Divider varient='middle' />
                        <Typography variant='subtitle1' className={classes.cqlSection}>
                                <div className={classes.queryText}>SUGGEST CQL:<span className={classes.span}>{querySuggest}</span>
                                </div>
                        </Typography>
                        <Divider varient='middle' />
                        <Typography variant='subtitle1' className={classes.cqlSection}>
                            <div className={classes.queryText}>SEARCH CQL:<span className={classes.span}>{querySearch}</span>
                            </div>
                        </Typography>
                    </div>
                </Paper>
            </Grid>
        </Grid>
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        locDataSuggest: state.location.locDataSuggest,
        locDataSearch: state.location.locDataSearch
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const HomepageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(HomePage))

export default HomepageContainer;
