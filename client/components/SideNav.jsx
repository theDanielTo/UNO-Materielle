import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import HomeIcon from '@material-ui/icons/Home';
import GradeIcon from '@material-ui/icons/Grade';
import MoodIcon from '@material-ui/icons/Mood';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';

import FormDialog from './name-dialogs';
import { Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    background: '#540062',
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
  toolbar: theme.mixins.toolbar
}));

const navLinks = [
  {
    text: 'Home',
    icon: <HomeIcon />,
    href: '/'
  },
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

export default function SideNav(props) {
  const { window } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider light={true} />
      <List>
        <ListItem alignItems="center">
          <ListItemIcon className={classes.listItem}>
            <Avatar>M</Avatar>
          </ListItemIcon>
          <ListItemText primary="Uno!" className={classes.listItem} />
        </ListItem>
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
                <ListItemText primary={link.text} className={classes.listItem} />
              </ListItem>
            </Link>
          ))
        }
      </List>
      <List>
        <FormDialog />
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle} >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap>
            Mint Bean Hackathon!
          </Typography> */}
        </Toolbar>
        </AppBar>
        <nav aria-label="sidenav">
          <Hidden lgUp implementation="css">
            <Drawer
              container={container}
              className={classes.drawer}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true
              }}
              >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden lgDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
    </div>
  );
}
