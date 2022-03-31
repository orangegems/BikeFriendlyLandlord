import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Index } from './Index.jsx';

// * import styles

render(
  <BrowserRouter>
    <Index />
  </BrowserRouter>,
  document.getElementById('app')
);