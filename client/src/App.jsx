import React, { useState, useEffect } from 'react';

import { Navbar } from './components/navbar/Navbar.jsx';
import ClearNavbar from './components/clearNavbar/ClearNavbar.jsx';
import Home from './pages/home/Home.jsx';
import MapSearch from './pages/map/MapSearch.jsx';
import Profile from './pages/profile/Profile.jsx';
import Search from './pages/search/Search.jsx';
import { ReviewPage } from './pages/review/ReviewPage.jsx';
import { UserProfile } from './pages/user/UserProfile.jsx';
import { Route, Routes, Link } from 'react-router-dom';
import Footer from "./components/footer/Footer.jsx";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authDisplay, setAuthDisplay] = useState(false);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch('/user/getUser')
      // .then((res) => {
      //   if (res.status === 200) {
      //     return res.json();
      //   } else {
      //     // break the promise chain from updating state
      //     return { then: function () {} };
      //   }
      // })
      .then((res) => {
        // parsing the response will error if the user is not authenticated and no data got returned
        return res.json()
      })
      .then(json => {
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
        <Route path="/landlord/:landlord_id" element={<Profile userData={userData} isLoggedIn={isLoggedIn}/>} />
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
}
