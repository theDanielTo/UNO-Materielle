import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BlurCircularRoundedIcon from '@material-ui/icons/BlurCircularRounded';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#151224',
    color: '#DDE0EF',
    minHeight: '93.6vh',
    maxWidth: '1200px',
    fontSize: '1.5rem'
  },
  rules: {
    padding: '12px'
  },
  ruleRow: {
    display: 'flex',
    marginBottom: '15px'
  },
  header: {
    fontFamily: 'Poppins, sans- serif',
    color: '#DDE0EF'
  },
  infoText: {
    fontFamily: 'Raleway, sans-serif',
    color: '#DDE0EF'
  }
}));

const rules = [
  {
    text: 'Be the first player to play all of your cards to win.',
    style: { color: 'red', margin: '0.9em', fontSize: '35px' }
  },
  {
    text: 'You can play a card with the matching color or number.',
    style: { color: 'yellow', margin: '0.9em', fontSize: '35px' }
  },
  {
    text: 'Reverse Cards reverse the order of the rotation.',
    style: { color: 'lime', margin: '0.9em', fontSize: '35px' }
  },
  {
    text: '+2 and +4 adds that amount to your hand.',
    style: { color: 'aqua', margin: '0.9em', fontSize: '35px' }
  }
];

export default function HowToPlay() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.header}>Rules</h1>
      <hr />
      <div className={classes.rules}>
        {
          rules.map(rule => (
            <div className={classes.ruleRow} key={rule.text}>
              <BlurCircularRoundedIcon style={rule.style} />
              <h3 className={classes.infoText}>{rule.text}</h3>
            </div>
          ))
        }
      </div>
    </div>
  );
}
