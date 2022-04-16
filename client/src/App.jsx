import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "./actions/actions.js";

// components
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import MapSearch from "./pages/MapSearch.jsx";
import Profile from "./pages/Profile.jsx";
import Search from "./pages/Search.jsx";
import Footer from "./components/Footer.jsx";
import { ReviewPage } from "./pages/ReviewPage.jsx";
import { UserProfile } from "./pages/UserProfile.jsx";

// called with this.props.[currentUser],
// references global redux state
const mapStateToProps = (state) => ({
  userData: state.currentUser.data,
});

// called with this.props.[setUserData],
// dispatches action upon invokation
const mapDispatchToProps = (dispatch) => ({
  setUserData: (userData) => dispatch(actions.setUserData(userData)),
  setAuthDisplay: () => dispatch(actions.toggleAuthDisplay()),
});

const App = (props) => {
  let isLoggedIn;

  useEffect(() => {
    isLoggedIn = JSON.stringify(props.userData) !== JSON.stringify({});
  }, [props.userData]);

  useEffect(() => {
    fetch("/user/getUser")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        props.setUserData(json);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar
        setAuthDisplay={props.setAuthDisplay}
        setUserData={props.setUserData}
        userData={props.userData}
        isLoggedIn={isLoggedIn}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/map" element={<MapSearch />} />
        <Route
          path="/landlord/:landlord_id"
          element={
            <Profile userData={props.userData} isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path="/review/:landlord_id"
          element={<ReviewPage userData={props.userData} />}
        />
        <Route
          path="/profile/:username"
          element={
            <UserProfile
              userData={props.userData}
              setUserData={props.setUserData}
              setAuthDisplay={props.setAuthDisplay}
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
