import React, { useState } from 'react';
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

export default function FormDialog({ setUsername }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  // const [socket, setSocket] = useState();

  // useEffect(() => {
  //   const newSocket = io('http://localhost:3001');
  //   setSocket(newSocket);

  //   return () => newSocket.close();
  // }, []);
  const handleChangeName = () => {
    setUsername(name);
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .catch(err => console.error('fetch err:', err));
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} className={classes.modal}>
        Make UserName
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
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
            type="name"
            fullWidth
            onChange={e => { setName(e.target.value); }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChangeName} color="primary">
            Play
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
