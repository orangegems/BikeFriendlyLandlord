import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';

export function Signup(props) {
  const [isTenant, setIsTenant] = useState('true');
  const [formData, setFormData] = useState({
    isTentant: isTenant,
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    email: '',
  });

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
          handleSubmit('signup', {...formData, /** landlordId */})
        }
        noValidate>
        <h3>Signup</h3>
        <div>
          <Button variant="contained" onClick={() => setIsTenant(true)}>
            Tenant
          </Button>
          <Button variant="contained" onClick={() => setIsTenant(false)}>
            Landlord
          </Button>
        </div>
        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          onChange={(event) =>
            setFormData({ ...formData, firstname: event.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          onChange={(event) =>
            setFormData({ ...formData, lastname: event.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="username"
          variant="outlined"
          onChange={(event) =>
            setFormData({ ...formData, username: event.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onChange={(event) =>
            setFormData({ ...formData, password: event.target.value })
          }
        />
        <Button variant="contained" type="submit">
          Login
        </Button>

        <Link to="/">Already have an account? Login.</Link>
      </Box>
    </>
  );
}
