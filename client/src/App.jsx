import React, { useState } from 'react';
import { Authenticate } from './pages/authenticate/Authenticate.jsx';
import { Navbar } from './components/Navbar.jsx';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authDisplay, setAuthDisplay] = useState(false);

  const [userData, setUserData] = useState({});

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        authDisplay={authDisplay}
        setAuthDisplay={setAuthDisplay}
        setIsLoggedIn={setIsLoggedIn}
        setUserData={setUserData}
      />
      This is the app....
      {authDisplay && (
        <Authenticate
          setAuthDisplay={setAuthDisplay}
          setIsLoggedIn={setIsLoggedIn}
          setUserData={setUserData}
        />
      )}
    </>
  );
}
