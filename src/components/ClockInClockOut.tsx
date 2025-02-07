import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Timer, AlertCircle, Loader2 } from "lucide-react";
import DateTime from "./datetime";
import { logout } from "../data-providers/login-service";
import { clockIn } from "../data-providers/clockin";
import { clockOut } from "../data-providers/clock-out";
import {
  ClockInErrors,
  DisplayingClockInError,
  ClockOutError,
  DisplayingClockOutError,
} from "../models/error-constants";

const ClockInClockOut = () => {
  const [isClockingIn, setIsClockingIn] = useState(false);
  const [actionComplete, setActionComplete] = useState(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (snackbarOpen) {
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 6000);
    }
  }, [snackbarOpen]);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setSnackbarOpen(true);
  };

  const handleClockIn = async () => {
    if (!user?.userId) {
      handleError(DisplayingClockInError?.SOMETHING_WENT_WRONG);
      return;
    }

    setIsLoading(true);
    try {
      const apiResponse = await clockIn(user.userId);
      if (apiResponse?.success) {
        setActionComplete(true);
        setIsClockingIn(false);
      } else {
        let errorMessage;
        switch (apiResponse?.message) {
          case ClockInErrors?.ERROR_INVALID_EMPLOYEE:
            errorMessage = DisplayingClockInError?.ERROR_INVALID_EMPLOYEE;
            break;
          case ClockInErrors?.ERROR_EMPLOYEE_ALREADY_CLOCKED_IN:
            errorMessage =
              DisplayingClockInError?.ERROR_EMPLOYEE_ALREADY_CLOCKED_IN;
            break;
          case ClockInErrors?.ERROR_CANNOT_CLOCK_IN_EMPLOYEE:
            errorMessage = DisplayingClockInError?.ERROR_CANNOT_CLOCK_IN_EMPLOYEE;
            break;
          default:
            errorMessage = DisplayingClockInError?.SOMETHING_WENT_WRONG;
            break;
        }
        handleError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClockOut = async () => {
    if (!user?.userId) {
      handleError(DisplayingClockOutError?.SOMETHING_WENT_WRONG);
      return;
    }

    setIsLoading(true);
    try {
      const response = await clockOut(user.userId);
      if (response?.success) {
        setActionComplete(true);
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
    } catch (error) {
      handleError(ClockOutError?.SOMETHING_WENT_WRONG);
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToLogin = async () => {
    setIsLoading(true);
    try {
      const response = await logout();
      if (response?.success) {
        navigate("/login");
      } else {
        handleError(ClockOutError?.SOMETHING_WENT_WRONG);
      }
    } catch (error) {
      handleError(ClockOutError?.SOMETHING_WENT_WRONG);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white h-screen p-5">
      <DateTime />

      {actionComplete ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div>
              <p className="text-2xl mb-2">
                {isClockingIn
                  ? "Clocked-in successfully at 02:05 PM."
                  : "Clocked Out at 08:05 PM."}
              </p>
              <p className="text-gray-400">
                {isClockingIn
                  ? `Have a great day ahead, ${user?.firstName} ${user?.lastName}`
                  : `See you next time, ${user?.firstName} ${user?.lastName}`}
              </p>
            </div>
          </div>
          <button
            className="w-full max-w-md bg-[#2C3648] text-white py-3 rounded hover:bg-[#3A4460] transition-colors disabled:opacity-50"
            onClick={redirectToLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </span>
            ) : (
              "Close"
            )}
          </button>
        </div>
      ) : (
        <div className="mt-15 flex flex-col items-center space-y-4">
          <h3 className="font-bold text-2xl mt-3 mb-3">
            {isClockingIn
              ? `Welcome, ${user?.firstName} ${user?.lastName}`
              : `Your shift began at 02:05 PM.`}
          </h3>

          <p className="text-gray-300">
            {isClockingIn
              ? "Please Clock-in to start your shift"
              : `${user?.firstName} ${user?.lastName}, Kindly clock out to end your shift`}
          </p>

          {snackbarOpen && (
            <div className="w-full max-w-md bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-center flex items-center justify-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={isClockingIn ? handleClockIn : handleClockOut}
            className="w-full max-w-md bg-orange-500 py-3 rounded flex items-center justify-center space-x-2 hover:bg-orange-600 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Timer className="w-5 h-5" />
                <span>{isClockingIn ? "Clock-in" : "Clock-out"}</span>
              </>
            )}
          </button>

          <button
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            onClick={redirectToLogin}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ClockInClockOut;