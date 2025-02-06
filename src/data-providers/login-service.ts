import { urlConstants } from "../constants";
import { AuthenticationResponse, LogoutResponse } from "../models/login.constant";
import { LoginAdapter } from "../models/login.model";
import { networkInstance } from "./networkInstances";

export const login = async (pin :  string): Promise<AuthenticationResponse> => {
    try {
      const response = await networkInstance.post(urlConstants.authLogin, {pin : pin});
      const loginAdapter = new LoginAdapter();
      const userData = loginAdapter.adapt(response?.data?.data);
      return { success : true, userData: userData}
    } catch(error : any) {
        return { success : false, message:  error?.error?.errors[0]?.code}
    }
}

export const logout =async (): Promise<LogoutResponse> => {
    try {
        await networkInstance.post('');
        sessionStorage.removeItem('user') 
        return {success : true}
    } catch(error : any) {
        return {success : false, message :  error?.error?.errors[0]?.code}
    }
}