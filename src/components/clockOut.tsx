import React, { useState } from "react";
import { clockOut } from "../data-providers/clock-out";
import DateTime from "./datetime";
import { useAuth } from "../context/AuthContext";
import { logout } from "../data-providers/login-service";
import { useNavigate } from "react-router-dom";
import { Timer, AlertCircle } from "lucide-react";
import {
  ClockOutError,
  DisplayingClockOutError,
} from "../models/error-constants";

const ClockOut: React.FC = () => {
  const [clockOutResponse, setClockOutResponse] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setSnackbarOpen(true);
  };

  const handelClockOut = async () => {
    try {
      const response = await clockOut(user?.userId);
      if (response?.success) {
        setClockOutResponse(true);
        setSnackbarOpen(false);
        setError("");
      } else {
        let errorMessage;
        switch (response?.message) {
          case ClockOutError?.ERROR_INVALID_EMPLOYEE:
            errorMessage = DisplayingClockOutError?.ERROR_INVALID_EMPLOYEE;
            break;
          case ClockOutError?.ERROR_EMPLOYEE_NOT_CLOCKED_IN:
            errorMessage =
              DisplayingClockOutError?.ERROR_EMPLOYEE_NOT_CLOCKED_IN;
            break;
          case ClockOutError?.ERROR_CANNOT_CLOCK_OUT_EMPLOYEE:
            errorMessage =
              DisplayingClockOutError?.ERROR_CANNOT_CLOCK_OUT_EMPLOYEE;
            break;
          default:
            errorMessage = DisplayingClockOutError?.SOMETHING_WENT_WRONG;
            break;
        }
        handleError(errorMessage);
      }
    } catch (error: any) {
      console.error("Clock out failed:", error);
      handleError(ClockOutError?.SOMETHING_WENT_WRONG);
    }
  };

  const redirectToLogin = async () => {
    try {
      const response = await logout();
      if (response.success) {
        navigate("/login");
      } else {
        handleError(ClockOutError?.SOMETHING_WENT_WRONG);
      }
    } catch (error) {
      handleError(ClockOutError?.SOMETHING_WENT_WRONG);
    }
  };

  return (
    <div className="bg-gray-900 text-white h-screen p-5">
      <DateTime />
      {clockOutResponse ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div>
              <p className="text-xl mb-2">Clocked out at 08:05 PM</p>
              <p className="text-gray-400">
                See you next time, {user?.firstName} {user?.lastName}
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
          <p className="text-lg">Your shift began at 02:05 PM.</p>
          <p className="text-gray-300">
            {user?.firstName} {user?.lastName}, kindly clock out to end your
            shift.
          </p>

          {snackbarOpen && (
            <div className="w-full max-w-md bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-center flex items-center justify-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handelClockOut}
            className="w-full max-w-md bg-transparent border-2 border-orange-500 text-orange-500 py-3 rounded flex items-center justify-center space-x-2 hover:bg-orange-500 hover:text-white transition-colors"
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
        </div>
      )}
    </div>
  );
};

export default ClockOut;
