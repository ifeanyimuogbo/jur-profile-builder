import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {EditProfile} from '../pages/edit-profile';
import {HomePage} from '../pages/home/home-page';
import {ViewProfile} from '../pages/view-profile/view-profile-page';
import {paths} from './paths';

export const JurRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path={`${paths.editProfile}`} element={<EditProfile />} />
      <Route path={`${paths.editProfile}/:id`} element={<EditProfile />} />
      <Route path={`${paths.viewProfile}/:id`} element={<ViewProfile />} />
      <Route path={paths.home} element={<HomePage />} />
    </Routes>
  );
};
