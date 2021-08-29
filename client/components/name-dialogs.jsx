import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    marginLeft: '10px'
  }
}));

export default function FormDialog({ setStorage }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [user, setUser] = useLocalStorage();

  const handleChangeName = () => {
    setUser({ id: user.id, username: name });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} className={classes.modal}>
        Change UserName
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Please Enter a New Username</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="USERNAME:"
            fullWidth
            required
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
