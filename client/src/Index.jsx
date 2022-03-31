import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/index/Login.jsx';
import { Signup } from './components/index/Signup.jsx';

export function Index() {
  function handleSubmit(source, data) {
    event.preventDefault();
    fetch(`/api/${source}`, {
      method: 'POST',
      body: JSON.stringify({ data }),
      // Adding headers to the request
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => {
        if (res.status === 200) window.location.href = '/app';
        else console.log('Unsussesful --> ', res);
      })
      .catch((err) => {
        console.log('Error from hadleSubmit --> ', err);
      });
  }

  return (
    <>
      <h1>Welcolme to Bike Friendly Landlord</h1>
      <div id="loginSignup">
        <Routes>
          <Route path="/" element={<Login handleSubmit={handleSubmit} />} />
          <Route path="signup" element={<Signup handleSubmit={handleSubmit} />} />
        </Routes>
      </div>
    </>
  );
}
