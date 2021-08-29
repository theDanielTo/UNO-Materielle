import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function NewUser() {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');
  const [user, setUser] = useLocalStorage();

  useEffect(() => {
    if (user) setOpen(false);
  }, []);

  const handleNewUserClick = e => {
    const newId = uuidv4();
    setUser({ username: name, id: newId });
    setOpen(false);
  };

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Please Enter a New Username</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="USERNAME:"
          fullWidth
          required
          onChange={e => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary">
          <Link to='/'>
            Cancel
          </Link>
        </Button>
        <Button color="primary" onClick={handleNewUserClick}>
          Play!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
