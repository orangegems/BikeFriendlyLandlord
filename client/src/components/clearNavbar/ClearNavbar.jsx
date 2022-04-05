import { Button } from "@mui/material";
import React from "react";
import "./clearNavbar.css";

export default function ClearNavbar({ isLoggedIn, authDisplay, logout, setAuthDisplay }) {
  return (
    <div>
      <div id="clearNavBar">
        <div className="clearNavBarLeft">
          <div id="logo">BFL</div>
        </div>
        <div className="clearNavBarCenter">
          <ul className="clearNavBarListItems">
            <li className="clearNavBarListItem">Home</li>
            <li className="clearNavBarListItem">Search</li>
          </ul>
        </div>
        <div className="clearNavBarRight">
          {!isLoggedIn && (
            <Button
              variant="text"
              style={{color: "tomato"}}
              onClick={() => {
                if (authDisplay === true) setAuthDisplay(false);
                else setAuthDisplay(true);
              }}
            >
              Login/Signup
            </Button>
          )}
        </div>
        {isLoggedIn && (
          <Button variant="text" onClick={() => logout()}>
            Log Out
          </Button>
        )}
      </div>
    </div>
  );
}
