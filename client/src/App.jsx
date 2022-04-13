import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "./actions/actions.js";

// components
import { Navbar } from "./components/navbar/Navbar.jsx";
import Home from "./pages/home/Home.jsx";
import MapSearch from "./pages/map/MapSearch.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Search from "./pages/search/Search.jsx";
import Footer from "./components/footer/Footer.jsx";
import { ReviewPage } from "./pages/review/ReviewPage.jsx";
import { UserProfile } from "./pages/user/UserProfile.jsx";

// called with this.props.[currentUser],
// references global redux state
const mapStateToProps = (state) => ({
  userData: state.currentUser.data,
});

// called with this.props.[setUserData],
// dispatches action upon invokation
const mapDispatchToProps = (dispatch) => ({
  setUserData: (userData) => dispatch(actions.setUserData(userData)),
  resetUserData: () => dispatch(actions.resetUserData()),
});

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authDisplay, setAuthDisplay] = useState(false);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch("/user/getUser")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setUserData(json);
        setIsLoggedIn(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        authDisplay={authDisplay}
        setAuthDisplay={setAuthDisplay}
        setIsLoggedIn={setIsLoggedIn}
        setUserData={setUserData}
        userData={userData}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/map" element={<MapSearch />} />
        <Route
          path="/landlord/:landlord_id"
          element={<Profile userData={userData} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/review/:landlord_id"
          element={<ReviewPage userData={userData} />}
        />
        <Route
          path="/profile/:username"
          element={
            <UserProfile
              userData={userData}
              setUserData={setUserData}
              setIsLoggedIn={setIsLoggedIn}
              setAuthDisplay={setAuthDisplay}
            />
          }
        />
        <Route path="*" element={<p>404 - nothing here</p>} />
      </Routes>
      <Footer />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
