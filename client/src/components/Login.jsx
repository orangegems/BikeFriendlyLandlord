import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';

export function Login(props) {
  const { handleSubmit, setAuthDisplay } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        component="form"
        onSubmit={() =>
          handleSubmit('login', { username: username, password: password })
        }
        noValidate>
        <h3>Login</h3>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <Button variant="contained" type="submit">
          Login
        </Button>
        <Link to="/signup">Need an account? Signup</Link>
        <button onClick={()=> setAuthDisplay(false)}>Continue without logging in</button>
      </Box>
    </>
  );
}
