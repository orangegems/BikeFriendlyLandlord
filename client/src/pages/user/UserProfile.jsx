import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export function UserProfile(props) {
  const {userData, setUserData, setIsLoggedIn, setAuthDisplay} = props;
  let navigate = useNavigate();
  
  useEffect(()=> {
    fetch('/auth/check', {
      method: 'POST',
    }) 
    .then((res)=> {
      if (res.status !== 200) {
        setIsLoggedIn(false);
        setAuthDisplay(true);
        navigate("/")
      }
    })
  },[])
  
  // let [searchParams, setSearchParams] = useSearchParams();
  return (
  <div>
    <p>Hello {' '} {userData.full_name}{','}</p>

  </div>
  )
}