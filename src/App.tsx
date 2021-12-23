import './App.css';
import React, {Suspense} from 'react';

import {Button} from 'antd';
import logo from './logo.svg';
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
