import React, { useState } from "react";
import { Delete } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { login } from "../data-providers/login-service";
import { LoginErrors } from "../models/error-constants";

const EmployeeLogin = () => {


  const { setUser} = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState<string>("");

  const handelSubmit = async () => {
    try {
      const response = await login(pin);
      if(response?.success && response?.userData){
        setUser(response?.userData);
      } else {
        //TODO ERROR HANDLING
        setOpenSnackbar(true);
        if(response?.message && response?.message === LoginErrors.CONST_ERROR_INVALID_PIN || response?.message === LoginErrors.CONST_INVALID_DEVICE ) {
          setErrorMessage('Invalid Pin');
        } else {
          setErrorMessage(LoginErrors.OOPS_SOMETHING_WENR_WRONG);
        }
          
      } 
     } catch(e) {
      setErrorMessage(LoginErrors.OOPS_SOMETHING_WENR_WRONG);
     } finally {
      setLoading(false);
     }
    }


  const handleNumberClick = (number: string) => {
    if (pin.length < 4) {
      setPin((prev) => prev + number);
    }
    console.log(pin);
    
   };

  const handleClear = () => {
    setPin("");
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const renderButton = (content: string | JSX.Element, onClick: () => void) => (
    <button
      onClick={onClick}
      className="w-16 h-16 text-white text-2xl font-semibold "
    >
      {content}
    </button>
  );

  return (
    <div
      className="h-screen bg-gray-900 flex flex-col items-center pt-20 px-4"
    >
      <h2 className="text-2xl text-white mb-8">Employee PIN</h2>

      <div className="w-full max-w-xs">
        <input
          type="password"
          value={pin}
          readOnly
          placeholder="Enter your PIN here"
          className="w-full p-3 mb-8 bg-transparent border-b-2 border-gray-500 text-white text-center text-xl "
        />

        <div className="grid grid-cols-3 gap-4 justify-items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <div key={num}>
              {renderButton(num.toString(), () =>
                handleNumberClick(num.toString())
              )}
            </div>
          ))}
          {renderButton("Clear", handleClear)}
          {renderButton("0", () => handleNumberClick("0"))}
          {renderButton(
            <Delete className="h-6 w-6 mx-auto" />,
            handleBackspace
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
