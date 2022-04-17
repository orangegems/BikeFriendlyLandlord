import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Signup(props) {
  const { handleSubmit, setAuthDisplay, setDisplayLogin } = props;

  const [formData, setFormData] = useState({
    isLandlord: null,
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
  });

  const formStyle = {
    // marginTop: 8,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    padding: "0"

  };

  const inputButtonStyle = {
    marginBottom: "10px",
  };

  return (
    <div id='signupBox'>
    <Box
      sx={formStyle}
      component="form"
      onSubmit={() => handleSubmit("signup", { ...formData })}
      noValidate
    >
      {formData.isLandlord === null ? (
        <div id="roleOption">
          Are you a
          <Button
            variant="contained"
            onClick={() => {
              const newFormData = JSON.parse(JSON.stringify(formData));
              newFormData.isLandlord = false;
              setFormData(newFormData);
            }}
          >
            Tenant
          </Button>
          or
          <Button
            variant="contained"
            onClick={() => {
              const newFormData = JSON.parse(JSON.stringify(formData));
              newFormData.isLandlord = true;
              setFormData(newFormData);
            }}
          >
            Landlord
          </Button>
          ?
        </div>
      ) : (
        <>
          <h3>Signup</h3>
          <TextField
            sx={inputButtonStyle}
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            onChange={(event) =>
              setFormData({ ...formData, firstname: event.target.value })
            }
          />
          <TextField
            sx={inputButtonStyle}
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            onChange={(event) =>
              setFormData({ ...formData, lastname: event.target.value })
            }
          />
          <TextField
            sx={inputButtonStyle}
            id="outlined-basic"
            label="username"
            variant="outlined"
            onChange={(event) =>
              setFormData({ ...formData, username: event.target.value })
            }
          />
          <TextField
            sx={inputButtonStyle}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(event) =>
              setFormData({ ...formData, email: event.target.value })
            }
          />
          <TextField
            sx={inputButtonStyle}
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            onChange={(event) =>
              setFormData({ ...formData, password: event.target.value })
            }
          />
          <Button variant="contained" type="submit" sx={inputButtonStyle}>
            Signup
          </Button>
          <div className="linkButton" onClick={() => setDisplayLogin(true)}>
            Already have an account? Login.
          </div>
          <button className="exitButton" onClick={() => setAuthDisplay(false)}>
            Continue without logging in
          </button>
        </>
      )}
    </Box>
    </div>
  );
}
