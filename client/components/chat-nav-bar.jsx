/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import { Divider, Drawer, Hidden, IconButton, ListItem } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { List } from '@material-ui/icons';
import FormDialog from './name-dialogs';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    background: '#161224',
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

export default function ChatNav(props) {
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
      {/* Insert Socket */}
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
        </Toolbar>
      </AppBar>
      <nav aria-label="sidenav">
        <Hidden lgUp implementation="css">
          <Drawer
            anchor='right'
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
