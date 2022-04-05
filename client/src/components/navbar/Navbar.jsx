import { Button } from '@mui/material';
import React from 'react'
import './navbar.css';
import { NavLink, Link } from 'react-router-dom';

export function Navbar(props) {
  const {
    isLoggedIn,
    authDisplay,
    setAuthDisplay, 
    setIsLoggedIn,
    setUserData,
    userData
  } = props;

  function logout(event) {
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

  let activeStyle = {
    color: 'tomato',
  };

  return (
      <div id="navBar">
        <div id="logo">BikeFriendlyLandlord</div>
        <nav>
          <ul className="navBarListItems">
            <li className="navBarListItem">
              <NavLink
                to="/"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                Home
              </NavLink>
            </li>
            <li className="navBarListItem">
              <NavLink
                to="/search"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                Search
              </NavLink>
            </li>
          </ul>
        </nav>

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
          <div>
            <Link to={`/profile/${userData.username}`} >My Account</Link>
            <Button variant="text" onClick={(e) => logout(e)}>
              Log Out
            </Button>
          </div>
        )}
    </div>
  );
}
