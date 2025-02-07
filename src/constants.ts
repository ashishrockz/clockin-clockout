export interface UrlConstants {
  authLogin : string;
  attendance : string;
  clockIn: string;
  details:string;
}

export const urlConstants : UrlConstants = {
    authLogin: "auth/login",
    attendance:"attendance",
    clockIn:"clock-in",
    details:"details"
}

export interface UserStatus{
  clockedIn:string;
  clockedOut:string
}

export const userStatus:UserStatus = {
  clockedIn : "clocked_in",
  clockedOut : "clocked_out"
}