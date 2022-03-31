import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

export function Signup(props) {
  const [isTenant, setIsTenant] = useState('true');
  // const [warning, setWarning] = useState(null);
  const [formData, setFormData] = useState({
    isTentant: isTenant,
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    email: '',
    city: ''
  });

  return (
    <>
      <h3>Signup</h3>
      <div>
        <button onClick={() => setIsTenant(true)}>Tenant</button>
        <button onClick={() => setIsTenant(false)}>Landlord</button>
      </div>
      <form onSubmit={() => handleSubmit('signup', formData)}>
        {warning && <small>{warning}</small>}
        <label htmlFor="name">
          First Name:
          <input
            autoComplete="off"
            type="text"
            name="name"
            onChange={(event) =>
              setFormData({ ...formData, firstname: event.target.value })
            }
          />
        </label>
        <label htmlFor="name">
          Last Name:
          <input
            autoComplete="off"
            type="text"
            name="name"
            onChange={(event) =>
              setFormData({ ...formData, lastname: event.target.value })
            }
          />
        </label>
        <label htmlFor="username">
          Username:
          <input
            autoComplete="off"
            type="text"
            name="username"
            onChange={(event) =>
              setFormData({ ...formData, username: event.target.value })
            }
          />
        </label>
        <label htmlFor="name">
          Email:
          <input
            autoComplete="off"
            type="text"
            name="name"
            onChange={(event) =>
              setFormData({ ...formData, email: event.target.value })
            }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            autoComplete="off"
            type="text"
            name="password"
            onChange={(event) =>
              setFormData({ ...formData, password: event.target.value })
            }
          />
        </label>
        {!isTenant && (
          <label htmlFor="name">
            City:
            <input
              autoComplete="off"
              type="text"
              name="name"
              onChange={(event) =>
                setFormData({ ...formData, city: event.target.value })
              }
            />
          </label>
        )}
        {/* <label htmlFor="password">
          Confirm Password:
          <input autoComplete="off" type="text" name="password" />
        </label> */}
        <button type="submit">Signup</button>
      </form>
      <Link to="/">Already have an account? Login.</Link>
    </>
  );
}

// export Signup;
