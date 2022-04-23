import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Login(props) {
  const {
    handleSubmit,
    setAuthDisplay,
    setDisplayLogin,
    loginError,
    loginErrorMessage,
    userData,
  } = props;

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const formStyle = {
    backgroundColor: "dark gray",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const inputButtonStyle = {
    marginBottom: "10px",
  };

  return (
    <>
      <Box
        sx={formStyle}
        component="form"
        onSubmit={() => {
          handleSubmit("login", {
            username: username,
            password: password,
          });
          navigate('/profile')
        }}
        noValidate
      >
        <h3>Login</h3>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          sx={inputButtonStyle}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          error={loginError}
          helperText={loginErrorMessage}
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          sx={inputButtonStyle}
        />
        <Button variant="contained" type="submit" sx={inputButtonStyle}>
          Login
        </Button>
        <div className="linkButton" onClick={() => setDisplayLogin(false)}>
          Need an account? Signup.
        </div>
      </Box>
    </>
  );
}
