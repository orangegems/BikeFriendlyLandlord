import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Login(props) {
  const { handleSubmit } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <h3>Login</h3>
      <form
        id="login-form"
        onSubmit={() =>
          handleSubmit('login', { username: username, password: password })
        }>
        <label htmlFor="username">
          Username:
          <input
            autoComplete="off"
            type="text"
            name="username"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            autoComplete="off"
            type="text"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </label>
        <button type="submit">Login</button>
      </form>

      <Link to="/signup">Need an account? Signup</Link>
    </>
  );
}
