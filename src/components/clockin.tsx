import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";
import { logout } from "../data-providers/login-service";
import { ClockInErrors, DisplayingClockInError, DisplayingUserDetailsErrors, UserDetailsErrors } from "../models/error-constants";
import React from "react";
import Button from '@mui/material/Button';
import { clockIn, getUserDetailsById } from "../data-providers/clockin";
import { EmployeeAttendance } from "../models/clockin-models";
import { getFormattedTime } from "../global/customDateFormat";
import DateTime from "./datetime";

const ClockIn: React.FC = () => {
    const [clockInResponse, setClockInResponse] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const { user } = useAuth();
    // let userDetails: EmployeeAttendance | undefined;
    const [userDetails, setUserDetails] = useState<EmployeeAttendance | undefined>({"id":"32235da5-7dcc-4dc0-a698-89daed0e7629","clockIn":new Date("2025-02-07T05:28:08.224Z"),"clockOut":undefined,"totalHours":null,"status":"clocked_in","employeeCode":"EMP2","employeeId":"bfd21a74-d75c-4285-bf0d-a4a9479c95d6","employeeFirstName":"Jane","employeeLastName":"Smith","employeeFullName":"Jane Smith","date":new Date("2025-02-07")})

    const getUserDetails = async () =>{
        if((user?.userId)){
            const response = await getUserDetailsById(user?.userId);
            if(response?.success){
                setUserDetails(response.userData);
                // userDetails = response.userData;
            }
            else{
                switch(response.message){
                    case UserDetailsErrors?.ERROR_EMPLOYEE_ATTENDANCE_DETAILS_NOT_FOUND:
                        setError(DisplayingUserDetailsErrors?.ERROR_EMPLOYEE_ATTENDANCE_DETAILS_NOT_FOUND);
                        break;
                    case UserDetailsErrors?.ERROR_INVALID_EMPLOYEE:
                        setError(DisplayingUserDetailsErrors?.ERROR_INVALID_EMPLOYEE);
                        break;
                    default:
                        setError(DisplayingClockInError?.SOMETHING_WENT_WRONG);
                        break;
                }
                setSnackbarOpen(true);
            }
        }
    }

    useEffect(()=>{
        getUserDetails();
    },[clockInResponse])

    const handleClockIn = async () => {
        if (!user?.userId) {
            setError(DisplayingClockInError?.SOMETHING_WENT_WRONG);
            setSnackbarOpen(true);
            return;
        }
    
        const apiResponse = await clockIn(user.userId);
        if (apiResponse?.success) {
            setClockInResponse(true);
        } else {
            switch (apiResponse?.message) {
                case ClockInErrors?.ERROR_INVALID_EMPLOYEE:
                    setError(DisplayingClockInError?.ERROR_INVALID_EMPLOYEE);
                    break;
                case ClockInErrors?.ERROR_EMPLOYEE_ALREADY_CLOCKED_IN:
                    setError(DisplayingClockInError?.ERROR_EMPLOYEE_ALREADY_CLOCKED_IN);
                    break;
                case ClockInErrors?.ERROR_CANNOT_CLOCK_IN_EMPLOYEE:
                    setError(DisplayingClockInError?.ERROR_CANNOT_CLOCK_IN_EMPLOYEE);
                    break;
                default:
                    setError(DisplayingClockInError?.SOMETHING_WENT_WRONG);
                    break;
            }
            setSnackbarOpen(true);
        }
    };

    const redirectToLogin = async () => {
        const response = await logout();
        if (response?.success) {
            navigate("/login")
        }
    }
    // if(userDetails?.clockIn == UserStatus.clockedIn){
    //     return(
    //         <ClockOut/>
    //     )
    // }

    if (clockInResponse) {
        return (
            <div className="bg-gray-900 text-white h-screen p-5">
                <DateTime />
                <div className="mt-15 flex flex-col justify-center items-center">
                <h2 className="font-semibold text-xl mt-3 mb-3">
                    Clocked-in successfully at {userDetails?.clockIn ? getFormattedTime(userDetails.clockIn) : "N/A"}
                </h2>
                    <h5 className="font-semibold text-lg mt-3 mb-3">Have a great day ahead, {userDetails?.employeeFullName}</h5>
                    <button className="border border-white w-70 h-10 rounded-sm mt-3 mb-3" onClick={() => (redirectToLogin())}>Close</button>
                </div>
            </div>
        )
    }

    const handleClose = () => {
        setSnackbarOpen(false);
        setError("");
    };

    const action = (
        <React.Fragment>
            <Button
                size="small"
                onClick={handleClose}
                sx={{
                    color: 'orange',
                }}
            >
                Ok
            </Button>
        </React.Fragment>
    );

    return (
        <div className="bg-gray-900 text-white h-screen p-5">
            <DateTime />
            <div className="mt-15 flex flex-col justify-center items-center">
                <h3 className="font-bold text-3xl mt-3 mb-3">Welcome, {user?.firstName} {user?.lastName}</h3>
                <h4 className="font-medium text-lg mt-3 mb-3">Please Clock-in to start your shift</h4>
                <button
                    onClick={() => handleClockIn()}
                    className="bg-orange-500 w-100 h-10 rounded-sm mt-3 mb-3"
                >
                    <div className="flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-timer"
                        >
                            <line x1="10" x2="14" y1="2" y2="2" />
                            <line x1="12" x2="15" y1="14" y2="11" />
                            <circle cx="12" cy="14" r="8" />
                        </svg>
                        <p className="ml-3">Clock-in</p>
                    </div>
                </button>
                <p>Cancel</p>
                {snackbarOpen && <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={error}
                    action={action}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                />
                }
            </div>
        </div>
    );
};

export default ClockIn;
