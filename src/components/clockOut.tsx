import React, { useState } from "react";
import { clock_Out } from "../data-providers/clock-out";
import DateTime from "./datetime";
import { useAuth } from "../context/AuthContext";
import { logout } from "../data-providers/login-service";
import { useNavigate } from "react-router-dom";
// import Box from "@mui/material/Box";
// import Snackbar from "@mui/material/Snackbar";
const ClockOut: React.FC = () => {
  const [apiResponse, setApiResponse] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleClose = () => {
    setSnackbarOpen(false);
    setError("");
  };
  const onSubmit = async () => {
    try {
      const response = await clock_Out(user?.userId);
      if (response?.success) {
        setApiResponse(true);
      } else {
        setError(response?.message);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Clock out failed:", error);
    }
  };
  const redirectToLogin = async () => {
    const response = await logout();
    if (response.success) {
      navigate("/login");
    }
  };

  return (
    <div className="bg-gray-900  text-white h-screen p-5">
      <DateTime />
      {apiResponse ? (
        <>
          <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6">
            <div>
              <p className="text-xl mb-2">Clocked out at 08:05 PM</p>
              <p className="text-gray-400">
                See you next time, {user?.firstName} {user?.lastName}
              </p>
            </div>

            <button
              className="w-full max-w-md bg-[#2C3648] text-white py-3 rounded hover:bg-[#3A4460] transition-colors"
              onClick={redirectToLogin}
            >
              Close
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mt-15 flex flex-col items-center">
            <p className="text-lg">Your shift began at 02:05 PM.</p>
            <p className="text-gray-300">
              {user?.firstName} {user?.lastName}, kindly clock out to end your
              shift.
            </p>

            <button
              onClick={onSubmit}
              className="w-full max-w-md bg-transparent border-2 border-orange-500 text-orange-500 py-3 rounded flex items-center justify-center space-x-2 hover:bg-orange-500 hover:text-white transition-colors"
            >
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
              <span>Clock-out</span>
            </button>

            <button className="text-gray-400 hover:text-white transition-colors">
              Cancel
            </button>
            {/* {snackbarOpen && <Box sx={{ width: 300 }}>
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleClose}
                message={error || "An unexpected error occurred."}
              />
            </Box>} */}
          </div>
        </>
      )}
    </div>
  );
};

export default ClockOut;
