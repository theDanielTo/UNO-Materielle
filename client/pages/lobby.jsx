import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';

export default function Lobby() {
  return (
    <>
    <Grid container direction="row" >
      <Grid item>
          <Card>
            <CardContent>
              <Typography color="textSecondary" >
                Game: 1
              </Typography>
              <Typography>
                Players: 1 / 4
              </Typography>
            </CardContent>
            <CardActions>
              <Button>Join</Button>
            </CardActions>
          </Card>
      </Grid>
    </Grid>

    </>
  );
}
