import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import { InputAdornment, IconButton } from "@material-ui/core";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import Typography from '@mui/material/Typography';


export default function Login(props) {
  const { handleSubmit, setAuthDisplay, setDisplayLogin } = props;
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
          type="password"
          vi
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <Button variant="contained" type="submit">
          Login
        </Button>
        <div className="linkButton" onClick={()=> setDisplayLogin(false)}>Need an account? Signup</div>
        <button onClick={()=> setAuthDisplay(false)}>Continue without logging in</button>
      </Box>
    </>
  )
}
