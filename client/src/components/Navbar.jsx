import { Button } from "@mui/material";
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Authenticate } from "../pages/Authenticate.jsx";
import { connect } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import PublicIcon from "@mui/icons-material/Public";
import Typography from "@mui/material/Typography";


const mapStateToProps = (state) => ({
  authDisplay: state.display.authDisplay,
});

const Navbar = (props) => {
  const { setAuthDisplay, setUserData, userData, isLoggedIn } = props;

  const [authPosition, setAuthPosition] = useState({
    top: "",
    left: "",
  });

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
          setAuthDisplay(false);
          setUserData({});
        } else {
          console.log("logout status not 200 -->", res);
        }
      })
      .then(() => window.location.replace("/"))
      .catch((err) => {
        console.log("Error from logout --> ", err);
      });
  }

  function toggleAuthDisplay(e) {
    const top = e.pageY + 30;
    const left = e.pageX - 250;
    if (props.authDisplay === true) setAuthDisplay(false);
    else {
      setAuthDisplay(true);
      setAuthPosition({
        top: `${top}px`,
        left: `${left}px`,
      });
    }
  }

  let activeStyle = {
    color: "MediumSlateBlue",
  };

  return (
    <div id="navBar">
      <div className="navBarLeft">
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <Typography id="logo" sx={{"&:hover": { color: "MediumSlateBlue !important" }}}>tenancy.</Typography>
        </NavLink>
      </div>
      <div className="navBarCenter">
        <ul className="navBarListItems">
          <li className="navBarListItem">
            <NavLink
              to="/search"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <SearchIcon fontSize="large" style={{ marginTop: "10px" }} />
            </NavLink>
          </li>
          <li className="navBarListItem">
            <NavLink
              to="/map"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <PublicIcon fontSize="large" style={{ marginTop: "5px" }} />
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navBarRight">
        {!isLoggedIn && (
          <Button
            sx={{
              fontFamily: "Nunito",
              color: "rgb(237, 232, 251)",
              "&:hover": { backgroundColor: "MediumSlateBlue" },
            }}
            variant="text"
            onClick={(e) => {
              toggleAuthDisplay(e);
            }}
          >
            Login/Signup
          </Button>
        )}
        {isLoggedIn && (
          <div>
            {/* <Link to={`/profile/${userData.username}`}>My Account</Link> */}
            <Button
              variant="text"
              sx={{
                fontFamily: "Nunito",
                color: "#666",
                "&:hover": { backgroundColor: "light gray" },
              }}
              onClick={(e) => logout(e)}
            >
              Log Out
            </Button>
          </div>
        )}
        {props.authDisplay && (
          <Authenticate
            userData={userData}
            setAuthDisplay={setAuthDisplay}
            setUserData={setUserData}
            position={authPosition}
          />
        )}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, null)(Navbar);
