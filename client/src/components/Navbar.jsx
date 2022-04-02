import { Button } from '@mui/material';
import React from 'react'


export function Navbar({isLoggedIn, authDisplay, logout, setAuthDisplay}) {
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
  )
}
