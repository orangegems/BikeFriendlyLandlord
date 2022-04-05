import React, { useState } from "react";
import { Authenticate } from "./pages/authenticate/Authenticate.jsx";
import { Navbar } from "./components/navbar/Navbar.jsx";
import ClearNavbar from "./components/clearNavbar/ClearNavbar.jsx";
import Home from "./pages/home/Home.jsx";
import { Profile } from './pages/profile/Profile.jsx';
import  Search  from './pages/search/Search.jsx';
import { UserProfile } from './pages/user/UserProfile.jsx';
import { Route, Routes, Link } from 'react-router-dom';

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
        userData={userData}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/landlord/:landlord_id" element={<Profile />} />
        <Route path="/review/:landlord_id" /**element={ Jonathans page }*/ /> 
        <Route
          path="/profile/:user_id"
          element={
            <UserProfile userData={userData} setUserData={setUserData} setIsLoggedIn={setIsLoggedIn} setAuthDisplay={setAuthDisplay}/>
          }
        />
        <Route path="*" element={<p>404 - nothing here</p>} />
      </Routes>
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
