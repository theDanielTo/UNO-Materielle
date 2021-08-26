import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    marginLeft: '10px'
  }
}));

export default function FormDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  // const [socket, setSocket] = useState();

  // useEffect(() => {
  //   const newSocket = io('http://localhost:3001');
  //   setSocket(newSocket);

  //   return () => newSocket.close();
  // }, []);

  const handleClickOpen = () => {
    setOpen(true);
    window.localStorage.removeItem('username');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setUsername = () => {
    handleClose();
    window.localStorage.setItem('username', name);
    fetch('/api/users', {
      method: 'POST',
      body: name
    })
      .then(res => res.json())
      .catch(err => console.error('fetch err:', err));
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen} className={classes.modal}>
        Make UserName
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Please Enter your Username</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please use a existing or new name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="USERNAME:"
            type="anme"
            fullWidth
            onChange={e => { setName(e.target.value); }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={setUsername} color="primary">
            Play
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
