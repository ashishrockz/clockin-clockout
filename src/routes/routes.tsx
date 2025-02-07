import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import EmployeeLogin from '../components/login';
import NotFound from '../components/notFound';
import ClockIn from '../components/clockin';
import Header from '../components/Header';
import ClockOut from '../components/clockOut';  
import ClockInClockOut from '../components/ClockInClockOut';

const Routes = () => { 
  return (
    <>
      <Header />
      <RouterRoutes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="login" element={<EmployeeLogin/>} />
        <Route path="clock-in" element={<ClockIn/>} />
        <Route path="clock-out" element={<ClockOut/>} />
        <Route path='ClockInClockOut' element={<ClockInClockOut />}/>
        <Route path='*' element={<NotFound/>} />
      </RouterRoutes>
    </>
  );
};

export default Routes;