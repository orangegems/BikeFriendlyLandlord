import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
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

// called with this.props.[currentUser],
// references global redux state
const mapStateToProps = (state) => ({
  userData: state.currentUser.data,
  isLoggedIn: state.currentUser.isLoggedIn,
});

// called with this.props.[setUserData],
// dispatches action upon invokation
const mapDispatchToProps = (dispatch) => ({
  setUserData: (userData) => dispatch(actions.setUserData(userData)),
  setAuthDisplay: (boolean) => dispatch(actions.setAuthDisplay(boolean)),
  setIsLoggedIn: (boolean) => dispatch(actions.setIsLoggedIn(boolean)),
});

const App = (props) => {
  const populateUser = async () => {
    await fetch("/user/getUser")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else return {};
      })
      .then((json) => {
        console.log("fetched user:" + JSON.stringify(json));
        props.setUserData(json);
      })
      .catch((err) => console.log(err));
  };

  useEffect(populateUser, []);

  const loggedIn = () => {
    props.setIsLoggedIn(JSON.stringify(props.userData) !== JSON.stringify({}));
  };

  useEffect(loggedIn, [props.userData]);

  return (
    <>
      <Navbar
        setAuthDisplay={props.setAuthDisplay}
        setUserData={props.setUserData}
        userData={props.userData}
        isLoggedIn={props.isLoggedIn}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/map" element={<MapSearch />} />
        <Route
          path="/profile/:landlordId"
          element={
            <Profile
              key={props.userData}
              isLoggedIn={props.isLoggedIn}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              key={props.userData}
              isLoggedIn={props.isLoggedIn}
            />
          }
        />
        <Route
          path="/review/:landlord_id"
          element={<ReviewPage userData={props.userData} />}
        />
        <Route path="*" element={<p>404 - nothing here</p>} />
      </Routes>
      <Footer />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
