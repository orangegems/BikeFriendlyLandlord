import React, { useState } from "react";
import { Authenticate } from "./pages/authenticate/Authenticate.jsx";
import { Navbar } from "./components/Navbar.jsx";
import Home from "./pages/home/Home.jsx";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authDisplay, setAuthDisplay] = useState(false);

  function logout(event) {
    event.preventDefault();
    fetch(`/auth/logout`, {
      method: "POST",
      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          // if successfully logged out, reset login state to false
          setIsLoggedIn(false);
          setAuthDisplay(false);
        } else {
          console.log("logout status not 200 -->", res);
        }
      })
      .catch((err) => {
        console.log("Error from logout --> ", err);
      });
  }

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} authDisplay={authDisplay} logout={logout} setAuthDisplay={setAuthDisplay}/>
      {/* This is the app.... */}
      {/* {authDisplay && (
        <Authenticate
          setAuthDisplay={setAuthDisplay}
          setIsLoggedIn={setIsLoggedIn}
        />
      )} */}
      <Home />
    </>
  );
}
