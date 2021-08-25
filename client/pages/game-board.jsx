import React from 'react';
import Grid from '@material-ui/core/Grid';
// import { makeStyles, Paper } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
// import { height } from '@material-ui/system';

const styles = theme => ({
  root: {
    position: 'relative',
    top: '10%',
    backgroundColor: '#151224',
    height: '100vh'
  },

  paper: {
    position: 'relative',
    top: '50%',
    height: 140,
    width: 100
  },
  deck: {
    position: 'relative',
    top: '15%'
  },
  userCards: {
    position: 'relative',
    top: '25%'

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

      <div className={classes.root}>
      {/* cpu hand */}
        <Grid container justifyContent="center" spacing={2} className={classes.cpu}>
          {[0, 1, 2, 3, 4].map(value => (
            <Grid item key={value}>
              <Paper className={classes.paper}/>
            </Grid>
          ))
          }
        </Grid>

        {/* Middle with deck and draw */}
        <Grid container spacing={2} justifyContent="center" className={classes.deck}>
          <Grid item>
            <Paper className={classes.paper}>1</Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>2</Paper>
          </Grid>
        </Grid>

        {/* Players card layout  */}
        <Grid container justifyContent="center" spacing={2} className={classes.userCards}>
          {[0, 1, 2, 3, 4].map(value => (
            <Grid item key={value} >
            <Paper className={classes.paper}/>
            </Grid>
          ))
          }
        </Grid>
      </div >
    );
  }
}

export default withStyles(styles, { withTheme: true })(GameBoard);
