import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Profile } from 'llprofile.jsx';

// * import styles

render(
  <BrowserRouter>
    <Profile />
  </BrowserRouter>,
  document.getElementById('landlordprofile')
);

