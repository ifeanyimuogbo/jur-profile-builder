import React, {ComponentType} from 'react';
import {BrowserRouter} from 'react-router-dom';

export const RoutesProvider = ({Routes}: {Routes: ComponentType}) => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};
