import React from 'react'

import { Routes as RouterRoutes, Route, Navigate } from "react-router";
import EmployeeLogin from '../components/login';
import NotFound from '../components/notFound';
import ClockIn from '../components/clockin';

const Routes = () => { 
  return (
    <RouterRoutes>
    <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="login" element={<EmployeeLogin/>} />
      <Route path="clock-in" element={<ClockIn/>} />
      <Route path='**'  element = {<NotFound/>} />
    </RouterRoutes>
  );
};


export default Routes;