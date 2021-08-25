import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GradeIcon from '@material-ui/icons/Grade';
import MoodIcon from '@material-ui/icons/Mood';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';

import FormDialog from './name-dialogs';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    background: '#540062',
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    background: '#484040',
    width: drawerWidth
  },
  listItem: {
    color: '#DDE0EF',
    textDecoration: 'none'
  },
  dialog: {
    marginLeft: 3
  },
  toolbar: theme.mixins.toolbar
}));

const navLinks = [
  {
    text: 'How To Play',
    icon: <GradeIcon />,
    href: '/how-to-play'
  },
  {
    text: 'Developers',
    icon: <MoodIcon />,
    href: '/about-us'
  },
  {
    text: 'Find a Game',
    icon: <VideogameAssetIcon />,
    href: '/games'
  }
];

export default function SideNav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Mint Bean Hackathon!
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <Divider light={true} />
          <List>
          <Link to="/">
              <ListItem button>
                <ListItemIcon className={classes.listItem}>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary='Username' className={classes.listItem}/>
              </ListItem>
            </Link>
          </List>
          <Divider light={true} />
          <List>
            {
              navLinks.map(link => (
                <Link to={link.href} key={link.text}>
                  <ListItem button>
                    <ListItemIcon className={classes.listItem}>
                      {link.icon}
                    </ListItemIcon>
                    <ListItemText primary={link.text} className={classes.listItem}/>
                  </ListItem>
                </Link>
              ))
            }
          </List>

          <FormDialog className={classes.dialog}/>
        </Drawer>
    </div>
  );
}
