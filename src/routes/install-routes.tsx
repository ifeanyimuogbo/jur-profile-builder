import React, {lazy, memo} from 'react';
import {JurRoutes} from '.';

const RoutesProvider = lazy(() =>
  import('./routes').then((module) => ({default: module.RoutesProvider})),
);
export const installRoutes = () => {
  const Routes = memo(() => <RoutesProvider Routes={JurRoutes} />);
  return {
    Routes,
  };
};
