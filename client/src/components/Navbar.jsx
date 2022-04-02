import { Button } from '@mui/material';
import React from 'react';

export function Navbar(props) {
  const { isLoggedIn, authDisplay, setAuthDisplay, setIsLoggedIn, setUserData } = props;
  function logout() {
    event.preventDefault();
    fetch(`/auth/logout`, {
      method: 'POST',
      // Adding headers to the request
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          // if successfully logged out, reset login state to false
          setIsLoggedIn(false);
          setAuthDisplay(false);
          setUserData({});
        } else {
          console.log('logout status not 200 -->', res);
        }
      })
      .catch((err) => {
        console.log('Error from logout --> ', err);
      });
  }

  return (
    <div>
      <div id="navBar">
        <div id="logo">BikeFriendlyLandlord</div>
        {!isLoggedIn && (
          <Button
            variant="text"
            onClick={() => {
              if (authDisplay === true) setAuthDisplay(false);
              else setAuthDisplay(true);
            }}>
            Login/Signup
          </Button>
        )}
        {isLoggedIn && (
          <Button variant="text" onClick={() => logout()}>
            Log Out
          </Button>
        )}
      </div>
    </div>
  );
}
