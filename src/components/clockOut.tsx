import React, { useEffect, useState } from "react";
import { clockOut } from "../data-providers/clock_Out";
import DateTime, { getFormattedTime } from "./datetime";
import { useAuth } from "../context/AuthContext";
import { logout } from "../data-providers/login-service";
import { useNavigate } from "react-router-dom";
import { Timer } from "lucide-react";
import {
  ClockOutError,
  DisplayingClockOutError,
  DisplayingUserDetailsErrors,
  UserDetailsErrors,
} from "../models/error-constants";
// import Button from "@mui/material/Button";
// import Snackbar from "@mui/material/Snackbar";
import { Spinner } from "@heroui/spinner";
import { EmployeeAttendance } from "../models/clockin-models";
interface ClockOutProps {
  getClockInDetails: () => Promise<void>;
  userDetails?: EmployeeAttendance;
}
const ClockOut: React.FC<ClockOutProps> = ({
  getClockInDetails,
  userDetails,
}) => {
  const [clockOutResponse, setClockOutResponse] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(userDetails);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setSnackbarOpen(true);
  };
  useEffect(() => {
    getClockInDetails();
  }, [clockOutResponse]);

  const handleClockOut = async () => {
    setIsLoading(true);
    try {
      if (!user?.userId) {
        setError(DisplayingClockOutError?.SOMETHING_WENT_WRONG);
        setSnackbarOpen(true);
        return;
      }
      if (user?.userId) {
        const response = await clockOut(user.userId);
        if (response?.success) {
          setClockOutResponse(true);
          setSnackbarOpen(false);
          setError("");
        } else {
          let errorMessage;
          switch (response?.message) {
            case ClockOutError.ERROR_INVALID_EMPLOYEE:
              errorMessage = DisplayingClockOutError.ERROR_INVALID_EMPLOYEE;
              break;
            case ClockOutError.ERROR_EMPLOYEE_NOT_CLOCKED_IN:
              errorMessage =
                DisplayingClockOutError.ERROR_EMPLOYEE_NOT_CLOCKED_IN;
              break;
            case ClockOutError.ERROR_CANNOT_CLOCK_OUT_EMPLOYEE:
              errorMessage =
                DisplayingClockOutError.ERROR_CANNOT_CLOCK_OUT_EMPLOYEE;
              break;
            default:
              errorMessage = DisplayingClockOutError.SOMETHING_WENT_WRONG;
              break;
          }
          handleError(errorMessage);
        }
      }
      setIsLoading(false);
    } catch (error: any) {
      console.error("Clock out failed:", error);
      handleError(DisplayingClockOutError.SOMETHING_WENT_WRONG);
    }
  };
  const redirectToLogin = async () => {
    try {
      const response = await logout();
      if (response?.success) {
        navigate("/login");
      } else {
        handleError(DisplayingClockOutError.SOMETHING_WENT_WRONG);
      }
    } catch (error) {
      handleError(DisplayingClockOutError.SOMETHING_WENT_WRONG);
    }
  };

  useEffect(() => {
    if (snackbarOpen) {
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 6000);
    }
  }, [snackbarOpen]);

  const handleClose = () => {
    setSnackbarOpen(false);
    setError("");
  };

  // const action = (
  //   <React.Fragment>
  //     <Button
  //       size="small"
  //       onClick={handleClose}
  //       sx={{
  //         color: "orange",
  //       }}
  //     >
  //       Ok
  //     </Button>
  //   </React.Fragment>
  // );

  if (isLoading) {
    return (
      <div className="bg-gray-900 text-white h-screen p-5 flex-grow flex flex-col items-center justify-center">
        <Spinner color="warning" size='lg' label="Loading..." />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white h-screen p-5">
      <DateTime />
      {clockOutResponse ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div>
              <p className="text-xl mb-2">
                Clocked out at{" "}
                {userDetails?.clockOut
                  ? getFormattedTime(new Date(userDetails.clockOut))
                  : "N/A"}
              </p>
              <p className="text-gray-400">
                See you next time, {userDetails?.employeeFullName}
              </p>
            </div>
          </div>

          <button
            className="w-full max-w-md bg-[#2C3648] text-white py-3 rounded hover:bg-[#3A4460] transition-colors flex items-center justify-center space-x-2"
            onClick={redirectToLogin}
          >
            <span>Close</span>
          </button>
        </div>
      ) : (
        <div className="mt-15 flex flex-col items-center space-y-4">
          <p className="text-lg">
            Your shift began at{" "}
            {userDetails?.clockIn
              ? getFormattedTime(new Date(userDetails.clockIn))
              : "N/A"}
          </p>
          <p className="text-gray-300">
            {userDetails?.employeeFullName} , kindly clock out to end your
            shift.
          </p>
          <button
            onClick={handleClockOut}
            className="w-full max-w-md bg-orange-500 py-3 rounded flex items-center justify-center space-x-2 hover:bg-orange-600 transition-colors"
          >
            <Timer className="w-5 h-5" />
            <span>Clock-out</span>
          </button>

          <button
            className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
            onClick={redirectToLogin}
          >
            <span>Cancel</span>
          </button>
          {/* {snackbarOpen && (
            // <Snackbar
            //   open={snackbarOpen}
            //   autoHideDuration={6000}
            //   onClose={handleClose}
            //   message={error}
            //   action={action}
            //   anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            // />
          )} */}
        </div>
      )}
    </div>
  );
};

export default ClockOut;
