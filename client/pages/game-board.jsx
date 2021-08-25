import React from 'react';
import Grid from '@material-ui/core/Grid';
// import { makeStyles, Paper } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
// import { height } from '@material-ui/system';

const styles = theme => ({
  root: {
    backgroundColor: '#151224',
    height: '100vh',
    width: 'calc(100% - 300px)',
    paddingTop: '64px',
    float: 'right'
  },
  columnSm: {
    height: '100%'
  },
  midRow: {
    height: '50%'
  },
  midCards: {
    height: '25%'
  },
  paper: {
    height: 140,
    width: 100
  },
  paperRight: {
    transform: 'rotate(-90deg)'
  },
  paperTop: {
    transform: 'rotate(180deg)'
  },
  paperLeft: {
    transform: 'rotate(90deg)'
  }
});

// const hand = () => {

// }

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
        <Grid container spacing={0} className={classes.columnSm}>

          <Grid className={classes.columnSm}
            container item xl={2} spacing={0}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            {[0, 1, 2, 3, 4].map(value => (
              <Grid item key={value} >
                <Paper className={classes.paper + ' ' + classes.paperLeft} draggable>
                  {value}
                </Paper>
              </Grid>
            ))
            }
          </Grid>

          <Grid className={classes.columnSm}
            container item xl={8} spacing={0}
          >
            <Grid className={classes.midCards}
              container item xl={12} spacing={1}
              direction="row-reverse"
              justifyContent="center"
              alignItems="center"
            >
              {[0, 1, 2, 3, 4].map(value => (
                <Grid item key={value} >
                  <Paper className={classes.paper + ' ' + classes.paperTop} draggable>
                    {value}
                  </Paper>
                </Grid>
              ))
              }
            </Grid>

            <Grid className={classes.midRow}
              container item xl={12} spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Paper className={classes.paper}>
                  CARD PLAYED
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.paper}>
                  DECK
                </Paper>
              </Grid>
            </Grid>

            <Grid className={classes.midCards}
              container item xl={12} spacing={1}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {[0, 1, 2, 3, 4].map(value => (
                <Grid item key={value} >
                  <Paper className={classes.paper} draggable>
                    {value}
                  </Paper>
                </Grid>
              ))
              }
            </Grid>
          </Grid>

          <Grid className={classes.columnSm}
            container item xl={2} spacing={0}
            direction="column-reverse"
            justifyContent="center"
            alignItems="center"
          >
            {[0, 1, 2, 3, 4].map(value => (
              <Grid item key={value} >
                <Paper className={classes.paper + ' ' + classes.paperRight} draggable>
                  {value}
                </Paper>
              </Grid>
            ))
            }
          </Grid>

        </Grid>
      </div >
    );
  }
}

export default withStyles(styles, { withTheme: true })(GameBoard);
