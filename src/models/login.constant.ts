import { Login } from "./login.model";

export interface AuthenticationResponse {
    success: boolean;
    userData?: Login;
    message?: string;
  }

  export interface LogoutResponse {
    success: boolean;
    message?: string;
  }