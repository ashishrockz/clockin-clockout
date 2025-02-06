
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { login } from '../data-providers/login-service';
import { LoginErrors } from '../models/error-constants';

const EmployeeLogin: React.FC = () => {

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

  return (
    <div>

    </div>
  )
}

export default EmployeeLogin;