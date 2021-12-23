import './App.css';
import React, {Suspense} from 'react';

import {installRoutes} from './routes/install-routes';

const App = (): JSX.Element => {
  const {Routes} = installRoutes();
  return (
    <Suspense fallback={<div />}>
      <Routes />
    </Suspense>
  );
};

export default App;
