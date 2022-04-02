import React, { useState } from 'react';
import Login from '../../components/Login.jsx';
import Signup from '../../components/Signup.jsx';

export function Authenticate(props) {
  const { setAuthDisplay, setIsLoggedIn } = props;
  const [displayLogin, setDisplayLogin] = useState(true);

  function handleSubmit(source, data) {
    event.preventDefault();
    fetch(`/auth/${source}`, {
      method: 'POST',
      body: JSON.stringify(data),
      // Adding headers to the request
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
          setAuthDisplay(false);
        } else {
          console.log('status not 200 in handle submit --> ', res);
        }
      })
      .catch((err) => {
        console.log('Error from hadleSubmit --> ', err);
      });
  }

  return (
    <div id="loginSignup">
      {displayLogin && (
        <Login
          handleSubmit={handleSubmit}
          setAuthDisplay={setAuthDisplay}
          setDisplayLogin={setDisplayLogin}
        />
      )}
      {!displayLogin && (
        <Signup
          handleSubmit={handleSubmit}
          setAuthDisplay={setAuthDisplay}
          setDisplayLogin={setDisplayLogin}
        />
      )}       
    </div>
  );
}
