import React from 'react';
import Grid from '@material-ui/core/Grid';
// import { makeStyles, Paper } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
const styles = theme => ({
  paper: {
    height: 140,
    width: 100
  }
});

export class GameBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: []
    };
  }

  render() {
    const { classes } = this.props;

    return (

      <>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Paper className={classes.paper} >1</Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>2</Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>3</Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>4</Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>5</Paper>
          </Grid>
        </Grid>
        {/* Middle with deck and draw */}

        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Paper className={classes.paper}>1</Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>2</Paper>
          </Grid>
        </Grid>

      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(GameBoard);
